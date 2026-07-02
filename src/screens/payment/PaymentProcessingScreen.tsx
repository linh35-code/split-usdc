import { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainStackParamList } from '../../navigation/types';
import { useGroups } from '../../context/GroupsContext';
import { useAuth } from '../../context/AuthContext';
import { CURRENT_USER_ID } from '../../data/types';
import { API_BASE_URL, DEMO_RECIPIENT_ADDRESS } from '../../config';
import { colors, spacing, typography } from '../../theme/theme';

type Props = NativeStackScreenProps<MainStackParamList, 'PaymentProcessing'>;

export default function PaymentProcessingScreen({ route, navigation }: Props) {
  const { groupId, expenseId, amount } = route.params;
  const { markExpensePaid } = useGroups();
  const { walletId, refreshBalance } = useAuth();

  useEffect(() => {
    let cancelled = false;

    async function run() {
      try {
        const response = await fetch(`${API_BASE_URL}/wallets/${walletId}/transfers`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ destinationAddress: DEMO_RECIPIENT_ADDRESS, amount: String(amount) }),
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();

        // Real settlement takes a few seconds on Arc testnet before balance reflects it.
        await new Promise((resolve) => setTimeout(resolve, 6000));
        await refreshBalance();

        if (cancelled) return;
        markExpensePaid(groupId, expenseId, CURRENT_USER_ID);
        navigation.replace('PaymentResult', { groupId, expenseId, amount, status: 'success', txId: data.id });
      } catch (err) {
        if (cancelled) return;
        navigation.replace('PaymentResult', {
          groupId,
          expenseId,
          amount,
          status: 'failure',
          reason: 'Giao dịch thất bại, vui lòng thử lại',
        });
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [groupId, expenseId, amount, walletId, markExpensePaid, refreshBalance, navigation]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={styles.text}>Đang xử lý giao dịch...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    backgroundColor: colors.background,
  },
  text: {
    ...typography.body,
    color: colors.textSecondary,
  },
});
