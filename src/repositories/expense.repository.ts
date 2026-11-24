import { prisma } from "../config/database";
import { DueDateData } from "../types/expense";
import { Prisma } from "../generated/prisma/client";

const include = {
  category: {
    select: {
      id: true,
      name: true,
      colorKey: true,
      iconKey: true,
      budget: true,
    },
  },
};

export const expenseRepository = {
  findManyByUser: (
    userId: string,
    { dueDateFrom, dueDateTo }: Partial<DueDateData> = {},
  ) =>
    prisma.expense.findMany({
      where: {
        userId,
        ...(dueDateFrom &&
          dueDateTo && { dueDate: { gte: dueDateFrom, lt: dueDateTo } }),
      },
      include,
      orderBy: { dueDate: "asc" },
    }),

  findByIdAndUser: (id: string, userId: string) =>
    prisma.expense.findFirst({ where: { id, userId }, include }),

  create: (data: Prisma.ExpenseUncheckedCreateInput) =>
    prisma.expense.create({ data, include }),

  update: (id: string, data: Prisma.ExpenseUncheckedUpdateInput) =>
    prisma.expense.update({ where: { id }, data, include }),

  remove: (id: string) => prisma.expense.delete({ where: { id } }),
};
