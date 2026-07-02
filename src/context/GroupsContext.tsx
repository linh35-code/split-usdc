import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { CURRENT_USER_ID, Expense, Group, Member } from '../data/types';
import { seedGroups } from '../data/seedGroups';
import { getGroupNetBalance } from '../data/expenseMath';

type NewExpenseInput = {
  title: string;
  totalAmount: number;
  paidByMemberId: string;
  participantIds: string[];
  shares: Record<string, number>;
};

type GroupsContextValue = {
  groups: Group[];
  getGroupById: (groupId: string) => Group | undefined;
  addGroup: (name: string) => Group;
  addMember: (groupId: string, member: Member) => void;
  addExpense: (groupId: string, expense: NewExpenseInput) => void;
  markExpensePaid: (groupId: string, expenseId: string, memberId: string) => void;
  leaveGroup: (groupId: string) => void;
  getTotals: () => { totalYouOwe: number; totalYouAreOwed: number };
};

const GroupsContext = createContext<GroupsContextValue | undefined>(undefined);

export function GroupsProvider({ children }: { children: ReactNode }) {
  const [groups, setGroups] = useState<Group[]>(seedGroups);

  const getGroupById = useCallback(
    (groupId: string) => groups.find((g) => g.id === groupId),
    [groups]
  );

  const addGroup = useCallback((name: string) => {
    const newGroup: Group = {
      id: `group-${Date.now()}`,
      name,
      members: [{ id: CURRENT_USER_ID, name: 'Bạn' }],
      expenses: [],
    };
    setGroups((prev) => [...prev, newGroup]);
    return newGroup;
  }, []);

  const addMember = useCallback((groupId: string, member: Member) => {
    setGroups((prev) =>
      prev.map((g) => {
        if (g.id !== groupId) return g;
        if (g.members.some((m) => m.id === member.id)) return g;
        return { ...g, members: [...g.members, member] };
      })
    );
  }, []);

  const addExpense = useCallback((groupId: string, expense: NewExpenseInput) => {
    const newExpense: Expense = {
      id: `exp-${Date.now()}`,
      paidMemberIds: [],
      ...expense,
    };
    setGroups((prev) =>
      prev.map((g) => (g.id === groupId ? { ...g, expenses: [...g.expenses, newExpense] } : g))
    );
  }, []);

  const markExpensePaid = useCallback((groupId: string, expenseId: string, memberId: string) => {
    setGroups((prev) =>
      prev.map((g) => {
        if (g.id !== groupId) return g;
        return {
          ...g,
          expenses: g.expenses.map((e) =>
            e.id === expenseId && !e.paidMemberIds.includes(memberId)
              ? { ...e, paidMemberIds: [...e.paidMemberIds, memberId] }
              : e
          ),
        };
      })
    );
  }, []);

  const leaveGroup = useCallback((groupId: string) => {
    setGroups((prev) => prev.filter((g) => g.id !== groupId));
  }, []);

  const getTotals = useCallback(() => {
    let totalYouOwe = 0;
    let totalYouAreOwed = 0;
    for (const group of groups) {
      const net = getGroupNetBalance(group);
      if (net > 0) totalYouAreOwed += net;
      if (net < 0) totalYouOwe += -net;
    }
    return { totalYouOwe, totalYouAreOwed };
  }, [groups]);

  return (
    <GroupsContext.Provider
      value={{ groups, getGroupById, addGroup, addMember, addExpense, markExpensePaid, leaveGroup, getTotals }}
    >
      {children}
    </GroupsContext.Provider>
  );
}

export function useGroups() {
  const ctx = useContext(GroupsContext);
  if (!ctx) throw new Error('useGroups must be used within GroupsProvider');
  return ctx;
}
