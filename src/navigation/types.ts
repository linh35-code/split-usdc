export type AuthStackParamList = {
  Welcome: undefined;
  ConnectWallet: undefined;
};

export type MainStackParamList = {
  GroupsList: undefined;
  GroupDetail: { groupId: string };
  GroupSettings: { groupId: string };
  LeaveGroup: { groupId: string };
  CreateGroup: undefined;
  InviteMember: { groupId: string };
  AddExpense: { groupId: string };
  SplitExpense: { groupId: string; title: string; totalAmount: number; participantIds: string[] };
  PaymentConfirm: { groupId: string; expenseId: string };
  PaymentProcessing: { groupId: string; expenseId: string; amount: number };
  PaymentResult: { groupId: string; expenseId: string; amount: number; status: 'success' | 'failure'; reason?: string };
  Account: undefined;
  ComingSoon: { title: string };
};
