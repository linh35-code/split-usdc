import { useMemo, useState } from 'react';
import { View, Text, TextInput, Pressable, FlatList, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainStackParamList } from '../../navigation/types';
import { useGroups } from '../../context/GroupsContext';
import { CURRENT_USER_ID } from '../../data/types';
import { computeEqualShares, round2 } from '../../data/splitMath';

type Props = NativeStackScreenProps<MainStackParamList, 'SplitExpense'>;

export default function SplitExpenseScreen({ route, navigation }: Props) {
  const { getGroupById, addExpense } = useGroups();
  const { groupId, title, totalAmount, participantIds } = route.params;
  const group = getGroupById(groupId);

  const [mode, setMode] = useState<'equal' | 'custom'>('equal');
  const equalShares = useMemo(
    () => computeEqualShares(totalAmount, participantIds, CURRENT_USER_ID),
    [totalAmount, participantIds]
  );
  const otherIds = participantIds.filter((id) => id !== CURRENT_USER_ID);
  const [customText, setCustomText] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    for (const id of otherIds) initial[id] = String(equalShares[id]);
    return initial;
  });
  const [error, setError] = useState<string | null>(null);

  if (!group) return null;

  const nameOf = (memberId: string) => group.members.find((m) => m.id === memberId)?.name ?? memberId;

  const customOthersSum = otherIds.reduce((sum, id) => sum + (Number(customText[id]) || 0), 0);
  const customPayerShare = round2(totalAmount - customOthersSum);

  const handleConfirm = () => {
    if (mode === 'equal') {
      addExpense(groupId, {
        title,
        totalAmount,
        paidByMemberId: CURRENT_USER_ID,
        participantIds,
        shares: equalShares,
      });
      navigation.pop(2);
      return;
    }

    for (const id of otherIds) {
      const value = Number(customText[id]);
      if (!Number.isFinite(value) || value < 0) {
        setError(`Số tiền của ${nameOf(id)} không hợp lệ`);
        return;
      }
    }
    if (customPayerShare < 0) {
      setError('Tổng các phần vượt quá tổng tiền');
      return;
    }
    const shares: Record<string, number> = { [CURRENT_USER_ID]: customPayerShare };
    for (const id of otherIds) shares[id] = Number(customText[id]);
    addExpense(groupId, {
      title,
      totalAmount,
      paidByMemberId: CURRENT_USER_ID,
      participantIds,
      shares,
    });
    navigation.pop(2);
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.goBack()}>
        <Text>← Chia tiền</Text>
      </Pressable>

      <Text>Tổng: {totalAmount} USDC</Text>

      <View style={styles.toggleRow}>
        <Pressable onPress={() => setMode('equal')}>
          <Text>{mode === 'equal' ? '● ' : '○ '}Chia đều</Text>
        </Pressable>
        <Pressable onPress={() => setMode('custom')}>
          <Text>{mode === 'custom' ? '● ' : '○ '}Tuỳ chỉnh</Text>
        </Pressable>
      </View>

      <FlatList
        data={participantIds}
        keyExtractor={(id) => id}
        renderItem={({ item: id }) => {
          const isPayer = id === CURRENT_USER_ID;
          const value = mode === 'equal' ? equalShares[id] : isPayer ? customPayerShare : undefined;
          return (
            <View style={styles.memberRow}>
              <Text>{nameOf(id)}</Text>
              {mode === 'custom' && !isPayer ? (
                <TextInput
                  style={styles.amountInput}
                  keyboardType="decimal-pad"
                  value={customText[id]}
                  onChangeText={(text) => {
                    setCustomText((prev) => ({ ...prev, [id]: text }));
                    if (error) setError(null);
                  }}
                />
              ) : (
                <Text>{value} USDC</Text>
              )}
            </View>
          );
        }}
      />

      {error && <Text>{error}</Text>}

      <Pressable style={styles.confirmButton} onPress={handleConfirm}>
        <Text>Xác nhận tạo khoản chi</Text>
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
  toggleRow: {
    flexDirection: 'row',
    gap: 16,
  },
  memberRow: {
    minHeight: 44,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amountInput: {
    minHeight: 44,
    borderWidth: 1,
    paddingHorizontal: 12,
    minWidth: 100,
    textAlign: 'right',
  },
  confirmButton: {
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
