import { View, Text, Pressable, FlatList, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainStackParamList } from '../../navigation/types';
import { useGroups } from '../../context/GroupsContext';
import { getGroupNetBalance, isExpenseCompleted } from '../../data/expenseMath';
import { CURRENT_USER_ID } from '../../data/types';
import BackButton from '../../components/BackButton';
import Avatar from '../../components/Avatar';
import Button from '../../components/Button';
import { colors, radii, spacing, typography } from '../../theme/theme';

type Props = NativeStackScreenProps<MainStackParamList, 'GroupDetail'>;

export default function GroupDetailScreen({ route, navigation }: Props) {
  const { getGroupById } = useGroups();
  const group = getGroupById(route.params.groupId);
  if (!group) return null;

  const net = getGroupNetBalance(group);
  const netLabel = net === 0 ? 'Đã xong' : net > 0 ? `Bạn được nhận ${net.toFixed(2)} USDC` : `Bạn cần trả ${(-net).toFixed(2)} USDC`;
  const netColor = net === 0 ? colors.textSecondary : net > 0 ? colors.success : colors.error;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton label={group.name} onPress={() => navigation.goBack()} />
        <Pressable onPress={() => navigation.navigate('GroupSettings', { groupId: group.id })}>
          <Text style={styles.settingsLabel}>⚙ Cài đặt</Text>
        </Pressable>
      </View>

      <View style={styles.membersRow}>
        {group.members.map((m) => (
          <Avatar key={m.id} name={m.name} size={32} />
        ))}
      </View>

      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Số dư của bạn</Text>
        <Text style={[styles.balanceAmount, { color: netColor }]}>{netLabel}</Text>
      </View>

      <FlatList
        style={styles.list}
        data={group.expenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const completed = isExpenseCompleted(item);
          const youOwe =
            item.paidByMemberId !== CURRENT_USER_ID &&
            item.participantIds.includes(CURRENT_USER_ID) &&
            !item.paidMemberIds.includes(CURRENT_USER_ID);
          return (
            <View style={styles.expenseRow}>
              <View style={styles.expenseInfo}>
                <Text style={styles.expenseTitle}>{item.title}</Text>
                <View style={[styles.statusBadge, completed ? styles.statusDone : styles.statusPending]}>
                  <Text style={[styles.statusText, completed ? styles.statusTextDone : styles.statusTextPending]}>
                    {completed ? 'Hoàn tất' : 'Đang chờ'}
                  </Text>
                </View>
              </View>
              {youOwe && (
                <Pressable
                  style={styles.payButton}
                  onPress={() => navigation.navigate('PaymentConfirm', { groupId: group.id, expenseId: item.id })}
                >
                  <Text style={styles.payButtonLabel}>Trả</Text>
                </Pressable>
              )}
            </View>
          );
        }}
      />

      <Button title="+ Thêm khoản chi" onPress={() => navigation.navigate('AddExpense', { groupId: group.id })} />
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingsLabel: {
    ...typography.body,
    color: colors.primary,
    fontWeight: '600',
  },
  membersRow: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  balanceCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    padding: spacing.md,
    gap: spacing.xs,
  },
  balanceLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  balanceAmount: {
    ...typography.title,
  },
  list: {
    flex: 1,
  },
  expenseRow: {
    minHeight: 44,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  expenseInfo: {
    gap: spacing.xs,
  },
  expenseTitle: {
    ...typography.body,
    color: colors.textPrimary,
  },
  statusBadge: {
    alignSelf: 'flex-start',
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
  payButton: {
    minHeight: 36,
    paddingHorizontal: spacing.md,
    borderRadius: radii.sm,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  payButtonLabel: {
    ...typography.caption,
    color: colors.textInverse,
    fontWeight: '600',
  },
});
