import { View, Text, Pressable, ActivityIndicator, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../../navigation/types';
import { useAuth, WALLET_OPTIONS } from '../../context/AuthContext';
import BackButton from '../../components/BackButton';
import { colors, radii, spacing, typography } from '../../theme/theme';

type Props = NativeStackScreenProps<AuthStackParamList, 'ConnectWallet'>;

export default function ConnectWalletScreen({ navigation }: Props) {
  const { connectWallet, isConnecting } = useAuth();

  return (
    <View style={styles.container}>
      <BackButton label="Back" onPress={() => navigation.goBack()} />

      <Text style={styles.title}>Kết nối ví</Text>

      <View style={styles.list}>
        {WALLET_OPTIONS.map((wallet) => (
          <Pressable
            key={wallet.id}
            style={styles.walletRow}
            disabled={isConnecting}
            onPress={() => connectWallet(wallet.id)}
          >
            <Text style={styles.walletName}>{wallet.name}</Text>
            {isConnecting && <ActivityIndicator color={colors.primary} />}
          </Pressable>
        ))}
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
  title: {
    ...typography.heading,
    color: colors.textPrimary,
  },
  list: {
    gap: spacing.sm,
  },
  walletRow: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  walletName: {
    ...typography.body,
    color: colors.textPrimary,
  },
});
