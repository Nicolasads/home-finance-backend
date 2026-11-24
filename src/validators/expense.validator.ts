import { z } from "zod";

const isoDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Use o formato AAAA-MM-DD");

const expenseBody = z.object({
  name: z.string().trim().min(1, "Informe o nome da despesa"),
  description: z.string().trim().max(500).optional().nullable(),
  categoryId: z.string().min(1),
  value: z.number().positive("O valor deve ser maior que zero"),
  dueDate: isoDate,
  paymentDate: isoDate.optional().nullable(),
  status: z.enum(["PAID", "PENDING"]),
  recurrence: z.enum(["ONCE", "WEEKLY", "MONTHLY", "YEARLY"]).default("ONCE"),
});

export const createExpenseSchema = z.object({ body: expenseBody });

export const updateExpenseSchema = z.object({
  params: z.object({ id: z.string().min(1) }),
});

export const expenseIdSchema = z.object({
  params: z.object({ id: z.string().min(1) }),
});

export const listExpenseSchema = z.object({
  query: z.object({
    month: z
      .string()
      .regex(/^\d{4}-\d{2}$/, "Use o formato AAAA-MM")
      .optional(),
  }),
});

export type ExpenseInput = z.infer<typeof expenseBody>;
export type ExpenseSchemaTypes = z.infer<typeof createExpenseSchema>["body"];
export type UpdateExpenseInput = z.infer<typeof updateExpenseSchema>["params"];
export type ExpenseIdSchema = z.infer<typeof updateExpenseSchema>["params"];
export type ListExpenseTypes = z.infer<typeof listExpenseSchema>["query"];
