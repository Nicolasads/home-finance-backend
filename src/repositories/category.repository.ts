import { prisma } from "../config/database.js";

export const categoryRepository = {
  findAvailableForUser: (userId: string) =>
    prisma.category.findMany({
      where: { OR: [{ userId: null }, { userId }] },
      orderBy: [{ isDefault: "desc" }, { createdAt: "asc" }],
    }),

  findByIdAndUser: (id: string, userId: string) =>
    prisma.category.findFirst({
      where: { id, OR: [{ userId: null }, { userId }] },
    }),
};
