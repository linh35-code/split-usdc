import { CURRENT_USER_ID, Expense, Group } from './types';

export function isExpenseCompleted(expense: Expense): boolean {
  const othersCount = expense.participantIds.length - 1;
  return expense.paidMemberIds.length >= othersCount;
}

export function getYourBalanceForExpense(expense: Expense): number {
  if (expense.paidByMemberId === CURRENT_USER_ID) {
    const unpaidOthers = expense.participantIds.filter(
      (id) => id !== CURRENT_USER_ID && !expense.paidMemberIds.includes(id)
    );
    return unpaidOthers.reduce((sum, id) => sum + (expense.shares[id] ?? 0), 0);
  }
  const youOwe =
    expense.participantIds.includes(CURRENT_USER_ID) && !expense.paidMemberIds.includes(CURRENT_USER_ID);
  return youOwe ? -(expense.shares[CURRENT_USER_ID] ?? 0) : 0;
}

export function getGroupNetBalance(group: Group): number {
  return group.expenses.reduce((sum, expense) => sum + getYourBalanceForExpense(expense), 0);
}
