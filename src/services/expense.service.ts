import { EXPENSE_STATUS } from "../constants/expenseStatus";
import { AppError } from "../errors/AppError";
import { Prisma } from "../generated/prisma/client";
import { categoryRepository } from "../repositories/category.repository";
import { expenseRepository } from "../repositories/expense.repository";
import { DueDateData } from "../types/expense";
import { ExpenseInput } from "../validators/expense.validator";

const monthRange = (monthKey: string): DueDateData => {
  const [year = Number.NaN, month = Number.NaN] = monthKey
    .split("-")
    .map(Number);

  return {
    dueDateFrom: new Date(Date.UTC(year, month - 1, 1)),
    dueDateTo: new Date(Date.UTC(year, month, 1)),
  };
};

const toPrismaData = (data: Partial<ExpenseInput>) => {
  const { dueDate, paymentDate, ...rest } = data;

  return {
    ...rest,
    ...(dueDate !== undefined && { dueDate: new Date(dueDate) }),
    ...(paymentDate !== undefined && {
      paymentDate: paymentDate ? new Date(paymentDate) : null,
    }),
  };
};

const ensureCategoryOwnership = async (categoryId: string, userId: string) => {
  const category = await categoryRepository.findByIdAndUser(categoryId, userId);

  if (!category) throw AppError.notFound("Categoria não encontrada");
};

const ensureExpenseOwnership = async (id: string, userId: string) => {
  const expense = await expenseRepository.findByIdAndUser(id, userId);
  if (!expense) throw AppError.notFound("Despesa não encontrada");

  return expense;
};

export const expenseService = {
  async list(userId: string, { month }: { month?: string }) {
    const range = month ? monthRange(month) : {};

    return expenseRepository.findManyByUser(userId, range);
  },

  async create(userId: string, data: ExpenseInput) {
    await ensureCategoryOwnership(data.categoryId, userId);

    const payload = toPrismaData(data) as Prisma.ExpenseUncheckedCreateInput;
    return expenseRepository.create({
      ...payload,
      userId,
    });
  },

  async update(userId: string, id: string, data: ExpenseInput) {
    await ensureExpenseOwnership(id, userId);

    if (data.categoryId) await ensureCategoryOwnership(data.categoryId, userId);

    const payload = toPrismaData(data) as Prisma.ExpenseUncheckedUpdateInput;

    return expenseRepository.update(id, payload);
  },

  async togglePaid(userId: string, id: string) {
    const expense = await ensureExpenseOwnership(id, userId);

    const isPaid = expense.status === EXPENSE_STATUS.PAID;

    return expenseRepository.update(id, {
      ...expense,
      status: isPaid ? EXPENSE_STATUS.PENDING : EXPENSE_STATUS.PAID,
      paymentDate: isPaid ? null : new Date().toISOString(),
    });
  },

  async remove(userId: string, id: string) {
    await ensureExpenseOwnership(id, userId);
    await expenseRepository.remove(id);
  },
};
