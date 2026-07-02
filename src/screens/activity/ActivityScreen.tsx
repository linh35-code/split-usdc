import { useMemo } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useGroups } from '../../context/GroupsContext';
import { isExpenseCompleted } from '../../data/expenseMath';
import { colors, radii, spacing, typography } from '../../theme/theme';

function formatRelativeTime(timestamp: number) {
  const diffMs = Date.now() - timestamp;
  const hours = Math.floor(diffMs / (60 * 60 * 1000));
  if (hours < 1) return 'Vừa xong';
  if (hours < 24) return `${hours} giờ trước`;
  const days = Math.floor(hours / 24);
  return `${days} ngày trước`;
}

export default function ActivityScreen() {
  const { groups } = useGroups();

  const feed = useMemo(() => {
    const items = groups.flatMap((group) =>
      group.expenses.map((expense) => ({
        expense,
        groupName: group.name,
        payerName: group.members.find((m) => m.id === expense.paidByMemberId)?.name ?? expense.paidByMemberId,
      }))
    );
    return items.sort((a, b) => b.expense.createdAt - a.expense.createdAt);
  }, [groups]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hoạt động</Text>

      <FlatList
        data={feed}
        keyExtractor={(item) => item.expense.id}
        ListEmptyComponent={<Text style={styles.emptyText}>Chưa có hoạt động nào</Text>}
        renderItem={({ item }) => {
          const completed = isExpenseCompleted(item.expense);
          return (
            <View style={styles.row}>
              <View style={styles.rowInfo}>
                <Text style={styles.expenseTitle}>{item.expense.title}</Text>
                <Text style={styles.meta}>
                  {item.payerName} trả trước · {item.groupName}
                </Text>
              </View>
              <View style={styles.rowRight}>
                <Text style={styles.amount}>{item.expense.totalAmount} USDC</Text>
                <Text style={styles.time}>{formatRelativeTime(item.expense.createdAt)}</Text>
                <View style={[styles.statusBadge, completed ? styles.statusDone : styles.statusPending]}>
                  <Text style={[styles.statusText, completed ? styles.statusTextDone : styles.statusTextPending]}>
                    {completed ? 'Hoàn tất' : 'Đang chờ'}
                  </Text>
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.md,
    gap: spacing.md,
    backgroundColor: colors.background,
  },
  title: {
    ...typography.heading,
    color: colors.textPrimary,
  },
  emptyText: {
    ...typography.body,
    color: colors.textSecondary,
  },
  row: {
    minHeight: 56,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  rowInfo: {
    gap: spacing.xs,
    flexShrink: 1,
  },
  expenseTitle: {
    ...typography.body,
    color: colors.textPrimary,
  },
  meta: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  rowRight: {
    alignItems: 'flex-end',
    gap: spacing.xs,
  },
  amount: {
    ...typography.body,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  time: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  statusBadge: {
    borderRadius: radii.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
  },
  statusDone: {
    backgroundColor: '#F0FDF4',
  },
  statusPending: {
    backgroundColor: '#FFF7ED',
  },
  statusText: {
    ...typography.caption,
    fontWeight: '600',
  },
  statusTextDone: {
    color: colors.success,
  },
  statusTextPending: {
    color: '#D97706',
  },
});
