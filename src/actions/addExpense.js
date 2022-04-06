export const EXPENSES = 'EXPENSES';
export const UPD_EXPENSES = 'UPD_EXPENSES';

export const addExpense = (expenses) => ({ type: EXPENSES, expenses });
export const updateExpenses = (expenses) => ({ type: UPD_EXPENSES, expenses });
