import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function HomePlaceholderScreen() {
  const { walletAddress, disconnectWallet } = useAuth();

  return (
    <View style={styles.container}>
      <Text>Đã kết nối ví: {walletAddress}</Text>
      <Text>(Màn hình Home thật sẽ được build ở Feature tiếp theo)</Text>
      <Pressable style={styles.button} onPress={disconnectWallet}>
        <Text>Ngắt kết nối (để test lại luồng đăng nhập)</Text>
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
    padding: 16,
  },
  button: {
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
