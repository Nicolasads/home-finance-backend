import { prisma } from "../config/database";
import { Prisma } from "../generated/prisma/client";
import { RegisterInput } from "../validators/auth.validator";

export const userRepository = {
  findByEmail: (email: string) => prisma.user.findUnique({ where: { email } }),

  findById: (id: string) =>
    prisma.user.findUnique({
      where: { id },
      select: { id: true, name: true, email: true },
    }),

  create: (data: Prisma.UserUncheckedCreateInput) =>
    prisma.user.create({
      data,
      select: { id: true, name: true, email: true },
    }),
};
