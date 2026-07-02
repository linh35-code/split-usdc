import { View, Text, Pressable, FlatList, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainStackParamList } from '../../navigation/types';
import { useGroups } from '../../context/GroupsContext';
import { getGroupNetBalance, getYourBalanceForExpense } from '../../data/expenseMath';
import { CURRENT_USER_ID } from '../../data/types';
import BackButton from '../../components/BackButton';
import Button from '../../components/Button';
import { colors, radii, spacing, typography } from '../../theme/theme';

type Props = NativeStackScreenProps<MainStackParamList, 'LeaveGroup'>;

export default function LeaveGroupScreen({ route, navigation }: Props) {
  const { getGroupById, leaveGroup } = useGroups();
  const group = getGroupById(route.params.groupId);
  if (!group) return null;

  const net = getGroupNetBalance(group);
  const youOwe = net < 0;

  const unpaidExpenses = group.expenses.filter(
    (e) =>
      e.paidByMemberId !== CURRENT_USER_ID &&
      e.participantIds.includes(CURRENT_USER_ID) &&
      !e.paidMemberIds.includes(CURRENT_USER_ID)
  );

  const handleLeave = () => {
    if (youOwe) return;
    leaveGroup(group.id);
    navigation.popToTop();
  };

  return (
    <View style={styles.container}>
      <BackButton label="Rời nhóm" onPress={() => navigation.goBack()} />

      {youOwe ? (
        <>
          <View style={styles.warningBanner}>
            <Text style={styles.warningText}>
              Bạn còn nợ {(-net).toFixed(2)} USDC trong nhóm này. Cần trả hết trước khi rời nhóm.
            </Text>
          </View>
          <FlatList
            data={unpaidExpenses}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.expenseRow}>
                <Text style={styles.expenseTitle}>{item.title}</Text>
                <Text style={styles.expenseAmount}>{Math.abs(getYourBalanceForExpense(item)).toFixed(2)} USDC</Text>
                <Pressable
                  style={styles.payButton}
                  onPress={() =>
                    navigation.navigate('PaymentConfirm', { groupId: group.id, expenseId: item.id })
                  }
                >
                  <Text style={styles.payButtonLabel}>Trả</Text>
                </Pressable>
              </View>
            )}
          />
        </>
      ) : (
        <View style={styles.okBanner}>
          <Text style={styles.okText}>Bạn không còn nợ trong nhóm này.</Text>
        </View>
      )}

      <View style={styles.actions}>
        <Button title="Rời nhóm" disabled={youOwe} onPress={handleLeave} />
        <Button title="Huỷ" variant="text" onPress={() => navigation.goBack()} />
      </View>
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
  warningBanner: {
    backgroundColor: '#FEF2F2',
    borderRadius: radii.md,
    padding: spacing.md,
  },
  warningText: {
    ...typography.body,
    color: colors.error,
  },
  okBanner: {
    backgroundColor: '#F0FDF4',
    borderRadius: radii.md,
    padding: spacing.md,
  },
  okText: {
    ...typography.body,
    color: colors.success,
  },
  expenseRow: {
    minHeight: 44,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  expenseTitle: {
    ...typography.body,
    color: colors.textPrimary,
  },
  expenseAmount: {
    ...typography.body,
    color: colors.error,
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
  actions: {
    gap: spacing.sm,
  },
});
