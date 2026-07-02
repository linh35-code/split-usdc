import { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainStackParamList } from '../../navigation/types';
import { useGroups } from '../../context/GroupsContext';
import { useAuth } from '../../context/AuthContext';
import { CURRENT_USER_ID } from '../../data/types';
import { colors, spacing, typography } from '../../theme/theme';

type Props = NativeStackScreenProps<MainStackParamList, 'PaymentProcessing'>;

const NETWORK_FAILURE_RATE = 0.2;

export default function PaymentProcessingScreen({ route, navigation }: Props) {
  const { groupId, expenseId, amount } = route.params;
  const { markExpensePaid } = useGroups();
  const { deductBalance } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      const succeeded = Math.random() > NETWORK_FAILURE_RATE;
      if (succeeded) {
        markExpensePaid(groupId, expenseId, CURRENT_USER_ID);
        deductBalance(amount);
        navigation.replace('PaymentResult', { groupId, expenseId, amount, status: 'success' });
      } else {
        navigation.replace('PaymentResult', {
          groupId,
          expenseId,
          amount,
          status: 'failure',
          reason: 'Giao dịch mạng thất bại, vui lòng thử lại',
        });
      }
    }, 1200);
    return () => clearTimeout(timer);
  }, [groupId, expenseId, amount, markExpensePaid, deductBalance, navigation]);

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
