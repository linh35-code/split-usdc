import { View, Text, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainStackParamList } from '../../navigation/types';
import { useAuth } from '../../context/AuthContext';
import BackButton from '../../components/BackButton';
import Avatar from '../../components/Avatar';
import Button from '../../components/Button';
import { colors, spacing, typography } from '../../theme/theme';

type Props = NativeStackScreenProps<MainStackParamList, 'Account'>;

export default function AccountScreen({ navigation }: Props) {
  const { walletAddress, balance, disconnectWallet } = useAuth();

  return (
    <View style={styles.container}>
      <BackButton label="Back" onPress={() => navigation.goBack()} />
      <View style={styles.body}>
        <Avatar name="Bạn" size={64} />
        <Text style={styles.walletAddress}>{walletAddress}</Text>
        <Text style={styles.balance}>{balance.toFixed(2)} USDC</Text>
        <Button title="Ngắt kết nối" variant="secondary" onPress={disconnectWallet} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.md,
    backgroundColor: colors.background,
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
  },
  walletAddress: {
    ...typography.body,
    color: colors.textSecondary,
  },
  balance: {
    ...typography.display,
    color: colors.textPrimary,
  },
});
