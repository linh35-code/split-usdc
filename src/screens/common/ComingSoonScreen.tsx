import { View, Text, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainStackParamList } from '../../navigation/types';
import BackButton from '../../components/BackButton';
import { colors, spacing, typography } from '../../theme/theme';

type ComingSoonBodyProps = {
  title: string;
  onBack?: () => void;
};

export function ComingSoonBody({ title, onBack }: ComingSoonBodyProps) {
  return (
    <View style={styles.container}>
      {onBack && <BackButton label="Back" onPress={onBack} />}
      <View style={styles.body}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>Sẽ được build ở một feature tiếp theo</Text>
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
    padding: spacing.md,
    backgroundColor: colors.background,
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  title: {
    ...typography.title,
    color: colors.textPrimary,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
  },
});
