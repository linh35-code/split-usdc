import { View, Text, Pressable, Linking, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Welcome'>;

export default function WelcomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.logoPlaceholder}>
          <Text>[Logo]</Text>
        </View>
        <Text style={styles.title}>Chia tiền nhóm bằng USDC</Text>
        <Text style={styles.subtitle}>Ghi nhận chi phí chung và thanh toán ngay, không cần tự chuyển khoản.</Text>
      </View>

      <View style={styles.bottom}>
        <Pressable style={styles.primaryButton} onPress={() => navigation.navigate('ConnectWallet')}>
          <Text>Kết nối ví</Text>
        </Pressable>
        <Pressable style={styles.linkButton} onPress={() => Linking.openURL('https://docs.arc.io')}>
          <Text>Tìm hiểu về Arc</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 16,
  },
  top: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  logoPlaceholder: {
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
  },
  bottom: {
    gap: 8,
  },
  primaryButton: {
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkButton: {
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
