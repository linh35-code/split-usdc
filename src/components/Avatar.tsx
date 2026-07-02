import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/theme';

type Props = {
  name: string;
  size?: number;
};

export default function Avatar({ name, size = 40 }: Props) {
  const initial = name.trim().charAt(0).toUpperCase() || '?';
  return (
    <View style={[styles.circle, { width: size, height: size, borderRadius: size / 2 }]}>
      <Text style={[styles.initial, { fontSize: size * 0.4 }]}>{initial}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initial: {
    color: colors.textInverse,
    fontWeight: '700',
  },
});
