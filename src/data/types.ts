export const CURRENT_USER_ID = 'me';

export type Member = {
  id: string;
  name: string;
};

export type Expense = {
  id: string;
  title: string;
  totalAmount: number;
  paidByMemberId: string;
  participantIds: string[];
  shares: Record<string, number>;
  paidMemberIds: string[];
  createdAt: number;
};

export type Group = {
  id: string;
  name: string;
  members: Member[];
  expenses: Expense[];
};
