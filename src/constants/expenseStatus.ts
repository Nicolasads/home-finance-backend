export const EXPENSE_STATUS = {
  PAID: "PAID",
  PENDING: "PENDING",
} as const;

export type ExpenseStatus =
  (typeof EXPENSE_STATUS)[keyof typeof EXPENSE_STATUS];
