import { View, Text, Pressable, FlatList, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainStackParamList } from '../../navigation/types';
import { useGroups } from '../../context/GroupsContext';
import { getGroupNetBalance } from '../../data/expenseMath';

type Props = NativeStackScreenProps<MainStackParamList, 'GroupsList'>;

export default function GroupsListScreen({ navigation }: Props) {
  const { groups, getTotals } = useGroups();
  const { totalYouOwe, totalYouAreOwed } = getTotals();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.navigate('Account')}>
          <Text>[Avatar]</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('CreateGroup')}>
          <Text>+ Tạo nhóm</Text>
        </Pressable>
      </View>

      <View style={styles.summary}>
        <Text>Tổng bạn cần trả: {totalYouOwe.toFixed(2)} USDC</Text>
        <Text>Tổng bạn được nhận: {totalYouAreOwed.toFixed(2)} USDC</Text>
      </View>

      <FlatList
        style={styles.list}
        data={groups}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const net = getGroupNetBalance(item);
          const label = net === 0 ? 'Đã xong' : net > 0 ? `Được nhận ${net.toFixed(2)} USDC` : `Cần trả ${(-net).toFixed(2)} USDC`;
          return (
            <Pressable
              style={styles.groupRow}
              onPress={() => navigation.navigate('GroupDetail', { groupId: item.id })}
            >
              <Text>{item.name}</Text>
              <Text>{label}</Text>
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
    padding: 16,
    gap: 16,
  },
  header: {
    minHeight: 44,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summary: {
    gap: 4,
  },
  list: {
    flex: 1,
  },
  groupRow: {
    minHeight: 44,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
});
