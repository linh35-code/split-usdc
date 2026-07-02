import { View, Text, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainStackParamList } from '../../navigation/types';
import Button from '../../components/Button';
import { colors, spacing, typography } from '../../theme/theme';

type Props = NativeStackScreenProps<MainStackParamList, 'PaymentResult'>;

export default function PaymentResultScreen({ route, navigation }: Props) {
  const { groupId, expenseId, amount, status, reason } = route.params;

  if (status === 'success') {
    return (
      <View style={styles.container}>
        <View style={[styles.iconCircle, styles.successCircle]}>
          <Text style={styles.iconText}>✓</Text>
        </View>
        <Text style={styles.heading}>Thanh toán thành công!</Text>
        <Text style={styles.amount}>{amount} USDC</Text>
        <Text style={styles.txHash}>Mã giao dịch: 0xMOCKTX{expenseId}</Text>
        <View style={styles.actions}>
          <Button title="Xong" onPress={() => navigation.pop()} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={[styles.iconCircle, styles.errorCircle]}>
        <Text style={styles.iconText}>✕</Text>
      </View>
      <Text style={styles.heading}>Thanh toán thất bại</Text>
      <Text style={styles.reason}>{reason}</Text>
      <View style={styles.actions}>
        <Button title="Thử lại" onPress={() => navigation.replace('PaymentConfirm', { groupId, expenseId })} />
        <Button title="Huỷ" variant="text" onPress={() => navigation.pop()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.background,
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successCircle: {
    backgroundColor: '#F0FDF4',
  },
  errorCircle: {
    backgroundColor: '#FEF2F2',
  },
  iconText: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  heading: {
    ...typography.heading,
    color: colors.textPrimary,
  },
  amount: {
    ...typography.display,
    color: colors.success,
  },
  txHash: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  reason: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  actions: {
    width: '100%',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
});
