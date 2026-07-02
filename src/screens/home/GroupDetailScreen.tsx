import { View, Text, Pressable, FlatList, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainStackParamList } from '../../navigation/types';
import { useGroups } from '../../context/GroupsContext';
import { getGroupNetBalance, isExpenseCompleted } from '../../data/expenseMath';

type Props = NativeStackScreenProps<MainStackParamList, 'GroupDetail'>;

export default function GroupDetailScreen({ route, navigation }: Props) {
  const { getGroupById } = useGroups();
  const group = getGroupById(route.params.groupId);
  if (!group) return null;

  const net = getGroupNetBalance(group);
  const netLabel = net === 0 ? 'Đã xong' : net > 0 ? `Bạn được nhận ${net.toFixed(2)} USDC` : `Bạn cần trả ${(-net).toFixed(2)} USDC`;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Text>← {group.name}</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('GroupSettings', { groupId: group.id })}>
          <Text>⚙ Cài đặt</Text>
        </Pressable>
      </View>

      <Text>{group.members.map((m) => m.name).join(', ')}</Text>

      <Text>Số dư của bạn: {netLabel}</Text>

      <FlatList
        style={styles.list}
        data={group.expenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.expenseRow}>
            <Text>{item.title}</Text>
            <Text>{isExpenseCompleted(item) ? 'Hoàn tất' : 'Đang chờ'}</Text>
          </View>
        )}
      />

      <Pressable
        style={styles.addButton}
        onPress={() => navigation.navigate('AddExpense', { groupId: group.id })}
      >
        <Text>+ Thêm khoản chi</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
  header: {
    minHeight: 44,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  list: {
    flex: 1,
  },
  expenseRow: {
    minHeight: 44,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  addButton: {
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
