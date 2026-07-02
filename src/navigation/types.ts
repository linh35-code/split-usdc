export type AuthStackParamList = {
  Welcome: undefined;
  ConnectWallet: undefined;
};

export type MainStackParamList = {
  GroupsList: undefined;
  GroupDetail: { groupId: string };
  GroupSettings: { groupId: string };
  CreateGroup: undefined;
  InviteMember: { groupId: string };
  AddExpense: { groupId: string };
  SplitExpense: { groupId: string; title: string; totalAmount: number; participantIds: string[] };
  Account: undefined;
  ComingSoon: { title: string };
};
