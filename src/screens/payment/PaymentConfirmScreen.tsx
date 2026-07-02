import { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainStackParamList } from '../../navigation/types';
import { useGroups } from '../../context/GroupsContext';
import { useAuth } from '../../context/AuthContext';
import { CURRENT_USER_ID } from '../../data/types';

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
      <Pressable onPress={() => navigation.goBack()}>
        <Text>← Xác nhận thanh toán</Text>
      </Pressable>

      <Text>Trả cho: {expense.title}</Text>
      <Text>Số tiền: {amount} USDC</Text>
      <Text>Người nhận: {payerName}</Text>
      <Text>Phí gas: Được tài trợ</Text>

      {error && <Text>{error}</Text>}

      <Pressable style={styles.confirmButton} disabled={submitting} onPress={handleConfirm}>
        <Text>Xác nhận trả</Text>
      </Pressable>
      <Pressable style={styles.cancelButton} disabled={submitting} onPress={() => navigation.goBack()}>
        <Text>Huỷ</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
  confirmButton: {
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
