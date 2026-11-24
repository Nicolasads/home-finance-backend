import { prisma } from "../src/config/database";
import { DEFAULT_CATEGORIES } from "../src/constants/defaultCategories";
import { hashPassword } from "../src/utils/password";

const main = async (): Promise<void> => {
  const user = await prisma.user.upsert({
    where: { email: "demo@email.com" },
    update: {},
    create: {
      name: "Usuário Demo",
      email: "demo@email.com",
      passwordHash: await hashPassword("Pass123@"),
    },
  });

  for (const category of DEFAULT_CATEGORIES) {
    const existing = await prisma.category.findFirst({
      where: { userId: null, name: category.name },
    });

    if (!existing) {
      await prisma.category.create({
        data: { ...category, userId: null, isDefault: true },
      });
    }
  }

  console.log("Seed concluído");
};

main()
  .catch((error: unknown) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
