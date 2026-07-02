import { View, Text, Pressable, ActivityIndicator, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../../navigation/types';
import { useAuth, WALLET_OPTIONS } from '../../context/AuthContext';

type Props = NativeStackScreenProps<AuthStackParamList, 'ConnectWallet'>;

export default function ConnectWalletScreen({ navigation }: Props) {
  const { connectWallet, isConnecting } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Text>← Back</Text>
        </Pressable>
      </View>

      <Text style={styles.title}>Kết nối ví</Text>

      <View style={styles.list}>
        {WALLET_OPTIONS.map((wallet) => (
          <Pressable
            key={wallet.id}
            style={styles.walletRow}
            disabled={isConnecting}
            onPress={() => connectWallet(wallet.id)}
          >
            <Text>{wallet.name}</Text>
            {isConnecting && <ActivityIndicator />}
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
  header: {
    minHeight: 44,
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
  },
  list: {
    gap: 8,
  },
  walletRow: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
});
