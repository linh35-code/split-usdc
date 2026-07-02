import { View, Text, Pressable, FlatList, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainStackParamList } from '../../navigation/types';
import { useGroups } from '../../context/GroupsContext';
import { getGroupNetBalance } from '../../data/expenseMath';
import Avatar from '../../components/Avatar';
import { colors, radii, spacing, typography } from '../../theme/theme';

type Props = NativeStackScreenProps<MainStackParamList, 'GroupsList'>;

export default function GroupsListScreen({ navigation }: Props) {
  const { groups, getTotals } = useGroups();
  const { totalYouOwe, totalYouAreOwed } = getTotals();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.navigate('Account')}>
          <Avatar name="Bạn" />
        </Pressable>
        <Pressable onPress={() => navigation.navigate('CreateGroup')}>
          <Text style={styles.createGroupLabel}>+ Tạo nhóm</Text>
        </Pressable>
      </View>

      <View style={styles.summaryRow}>
        <View style={[styles.summaryCard, styles.oweCard]}>
          <Text style={styles.summaryLabel}>Bạn cần trả</Text>
          <Text style={[styles.summaryAmount, styles.oweAmount]}>{totalYouOwe.toFixed(2)} USDC</Text>
        </View>
        <View style={[styles.summaryCard, styles.owedCard]}>
          <Text style={styles.summaryLabel}>Bạn được nhận</Text>
          <Text style={[styles.summaryAmount, styles.owedAmount]}>{totalYouAreOwed.toFixed(2)} USDC</Text>
        </View>
      </View>

      <FlatList
        style={styles.list}
        data={groups}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const net = getGroupNetBalance(item);
          const label = net === 0 ? 'Đã xong' : net > 0 ? `Được nhận ${net.toFixed(2)} USDC` : `Cần trả ${(-net).toFixed(2)} USDC`;
          const labelColor = net === 0 ? colors.textSecondary : net > 0 ? colors.success : colors.error;
          return (
            <Pressable
              style={styles.groupRow}
              onPress={() => navigation.navigate('GroupDetail', { groupId: item.id })}
            >
              <Text style={styles.groupName}>{item.name}</Text>
              <Text style={[styles.groupBalance, { color: labelColor }]}>{label}</Text>
            </Pressable>
          );
        }}
      />
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
  header: {
    minHeight: 44,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  createGroupLabel: {
    ...typography.body,
    color: colors.primary,
    fontWeight: '600',
  },
  summaryRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  summaryCard: {
    flex: 1,
    borderRadius: radii.md,
    padding: spacing.md,
    gap: spacing.xs,
  },
  oweCard: {
    backgroundColor: '#FEF2F2',
  },
  owedCard: {
    backgroundColor: '#F0FDF4',
  },
  summaryLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  summaryAmount: {
    ...typography.title,
  },
  oweAmount: {
    color: colors.error,
  },
  owedAmount: {
    color: colors.success,
  },
  list: {
    flex: 1,
  },
  groupRow: {
    minHeight: 44,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  groupName: {
    ...typography.body,
    color: colors.textPrimary,
  },
  groupBalance: {
    ...typography.caption,
    fontWeight: '600',
  },
});
