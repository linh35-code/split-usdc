import { Pressable, Text, StyleSheet } from 'react-native';
import { colors, minTouchTarget, typography } from '../theme/theme';

type Props = {
  label: string;
  onPress: () => void;
};

export default function BackButton({ label, onPress }: Props) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Text style={styles.label}>← {label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: minTouchTarget,
    justifyContent: 'center',
  },
  label: {
    ...typography.title,
    color: colors.textPrimary,
  },
});
