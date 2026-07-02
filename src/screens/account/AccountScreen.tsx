import { View, Text, Pressable, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainStackParamList } from '../../navigation/types';
import { useAuth } from '../../context/AuthContext';

type Props = NativeStackScreenProps<MainStackParamList, 'Account'>;

export default function AccountScreen({ navigation }: Props) {
  const { walletAddress, disconnectWallet } = useAuth();

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.goBack()}>
        <Text>← Back</Text>
      </Pressable>
      <View style={styles.body}>
        <Text>Ví: {walletAddress}</Text>
        <Pressable style={styles.button} onPress={disconnectWallet}>
          <Text>Ngắt kết nối</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  button: {
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
});
