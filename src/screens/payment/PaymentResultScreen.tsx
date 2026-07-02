import { View, Text, Pressable, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<MainStackParamList, 'PaymentResult'>;

export default function PaymentResultScreen({ route, navigation }: Props) {
  const { groupId, expenseId, amount, status, reason } = route.params;

  if (status === 'success') {
    return (
      <View style={styles.container}>
        <Text>Thanh toán thành công!</Text>
        <Text>{amount} USDC</Text>
        <Text>Mã giao dịch: 0xMOCKTX{expenseId}</Text>
        <Pressable style={styles.button} onPress={() => navigation.pop()}>
          <Text>Xong</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Thanh toán thất bại</Text>
      <Text>{reason}</Text>
      <Pressable
        style={styles.button}
        onPress={() => navigation.replace('PaymentConfirm', { groupId, expenseId })}
      >
        <Text>Thử lại</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => navigation.pop()}>
        <Text>Huỷ</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  button: {
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
