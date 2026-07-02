import { View, Text, Pressable, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainStackParamList } from '../../navigation/types';

type ComingSoonBodyProps = {
  title: string;
  onBack?: () => void;
};

export function ComingSoonBody({ title, onBack }: ComingSoonBodyProps) {
  return (
    <View style={styles.container}>
      {onBack && (
        <Pressable onPress={onBack}>
          <Text>← Back</Text>
        </Pressable>
      )}
      <View style={styles.body}>
        <Text>{title}</Text>
        <Text>(Sẽ được build ở một feature tiếp theo)</Text>
      </View>
    </View>
  );
}

type Props = NativeStackScreenProps<MainStackParamList, 'ComingSoon'>;

export default function ComingSoonScreen({ route, navigation }: Props) {
  return <ComingSoonBody title={route.params.title} onBack={() => navigation.goBack()} />;
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
    gap: 8,
  },
});
