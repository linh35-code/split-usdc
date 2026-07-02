import { View, Text, Linking, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../../navigation/types';
import Button from '../../components/Button';
import { colors, spacing, typography } from '../../theme/theme';

type Props = NativeStackScreenProps<AuthStackParamList, 'Welcome'>;

export default function WelcomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.logoPlaceholder}>
          <Text style={styles.logoText}>$</Text>
        </View>
        <Text style={styles.title}>Chia tiền nhóm bằng USDC</Text>
        <Text style={styles.subtitle}>Ghi nhận chi phí chung và thanh toán ngay, không cần tự chuyển khoản.</Text>
      </View>

      <View style={styles.bottom}>
        <Button title="Kết nối ví" onPress={() => navigation.navigate('ConnectWallet')} />
        <Button title="Tìm hiểu về Arc" variant="text" onPress={() => Linking.openURL('https://docs.arc.io')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: spacing.md,
    backgroundColor: colors.background,
  },
  top: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.md,
  },
  logoPlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    ...typography.heading,
    color: colors.textInverse,
  },
  title: {
    ...typography.heading,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  bottom: {
    gap: spacing.sm,
  },
});
