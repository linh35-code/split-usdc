import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainStackParamList } from '../../navigation/types';
import { useGroups } from '../../context/GroupsContext';
import { useAuth } from '../../context/AuthContext';
import { CURRENT_USER_ID } from '../../data/types';
import BackButton from '../../components/BackButton';
import Button from '../../components/Button';
import { colors, radii, spacing, typography } from '../../theme/theme';

type Props = NativeStackScreenProps<MainStackParamList, 'PaymentConfirm'>;

export default function PaymentConfirmScreen({ route, navigation }: Props) {
  const { getGroupById } = useGroups();
  const { balance } = useAuth();
  const group = getGroupById(route.params.groupId);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const expense = group?.expenses.find((e) => e.id === route.params.expenseId);
  if (!group || !expense) return null;

  const amount = expense.shares[CURRENT_USER_ID] ?? 0;
  const payerName = group.members.find((m) => m.id === expense.paidByMemberId)?.name ?? expense.paidByMemberId;

  const handleConfirm = () => {
    if (submitting) return;
    setSubmitting(true);
    if (balance < amount) {
      setError(`Số dư không đủ. Bạn cần nạp thêm ${(amount - balance).toFixed(2)} USDC.`);
      setSubmitting(false);
      return;
    }
    navigation.replace('PaymentProcessing', { groupId: group.id, expenseId: expense.id, amount });
  };

  return (
    <View style={styles.container}>
      <BackButton label="Xác nhận thanh toán" onPress={() => navigation.goBack()} />

      <View style={styles.amountCard}>
        <Text style={styles.amountLabel}>Số tiền</Text>
        <Text style={styles.amount}>{amount} USDC</Text>
      </View>

      <View style={styles.detailsCard}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Trả cho</Text>
          <Text style={styles.detailValue}>{expense.title}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Người nhận</Text>
          <Text style={styles.detailValue}>{payerName}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Phí gas</Text>
          <Text style={[styles.detailValue, styles.sponsored]}>Được tài trợ</Text>
        </View>
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <View style={styles.actions}>
        <Button title="Xác nhận trả" disabled={submitting} onPress={handleConfirm} />
        <Button title="Huỷ" variant="text" disabled={submitting} onPress={() => navigation.goBack()} />
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
  amountCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    padding: spacing.lg,
    alignItems: 'center',
    gap: spacing.xs,
  },
  amountLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  amount: {
    ...typography.display,
    color: colors.primary,
  },
  detailsCard: {
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.sm,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailLabel: {
    ...typography.body,
    color: colors.textSecondary,
  },
  detailValue: {
    ...typography.body,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  sponsored: {
    color: colors.success,
  },
  errorText: {
    ...typography.caption,
    color: colors.error,
  },
  actions: {
    marginTop: 'auto',
    gap: spacing.sm,
  },
});
