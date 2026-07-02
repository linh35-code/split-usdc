import { View, Text, Pressable, FlatList, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainStackParamList } from '../../navigation/types';
import { useGroups } from '../../context/GroupsContext';
import { getGroupNetBalance, getYourBalanceForExpense, isExpenseCompleted } from '../../data/expenseMath';
import { CURRENT_USER_ID } from '../../data/types';

type Props = NativeStackScreenProps<MainStackParamList, 'LeaveGroup'>;

export default function LeaveGroupScreen({ route, navigation }: Props) {
  const { getGroupById, leaveGroup } = useGroups();
  const group = getGroupById(route.params.groupId);
  if (!group) return null;

  const net = getGroupNetBalance(group);
  const youOwe = net < 0;

  const unpaidExpenses = group.expenses.filter(
    (e) =>
      e.paidByMemberId !== CURRENT_USER_ID &&
      e.participantIds.includes(CURRENT_USER_ID) &&
      !e.paidMemberIds.includes(CURRENT_USER_ID)
  );

  const handleLeave = () => {
    if (youOwe) return;
    leaveGroup(group.id);
    navigation.popToTop();
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.goBack()}>
        <Text>← Rời nhóm</Text>
      </Pressable>

      {youOwe ? (
        <>
          <Text>Bạn còn nợ {(-net).toFixed(2)} USDC trong nhóm này. Cần trả hết trước khi rời nhóm.</Text>
          <FlatList
            data={unpaidExpenses}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.expenseRow}>
                <Text>{item.title}</Text>
                <Text>{Math.abs(getYourBalanceForExpense(item)).toFixed(2)} USDC</Text>
                <Pressable
                  onPress={() =>
                    navigation.navigate('PaymentConfirm', { groupId: group.id, expenseId: item.id })
                  }
                >
                  <Text>Trả</Text>
                </Pressable>
              </View>
            )}
          />
        </>
      ) : (
        <Text>Bạn không còn nợ trong nhóm này.</Text>
      )}

      <Pressable style={styles.leaveButton} disabled={youOwe} onPress={handleLeave}>
        <Text>Rời nhóm</Text>
      </Pressable>
      <Pressable style={styles.cancelButton} onPress={() => navigation.goBack()}>
        <Text>Huỷ</Text>
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
  expenseRow: {
    minHeight: 44,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leaveButton: {
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
