import { useMemo, useState } from 'react';
import { View, Text, TextInput, Pressable, FlatList, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainStackParamList } from '../../navigation/types';
import { useGroups } from '../../context/GroupsContext';
import { CURRENT_USER_ID } from '../../data/types';
import { computeEqualShares, round2 } from '../../data/splitMath';
import BackButton from '../../components/BackButton';
import Button from '../../components/Button';
import { colors, radii, spacing, typography } from '../../theme/theme';

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
      <BackButton label="Chia tiền" onPress={() => navigation.goBack()} />

      <Text style={styles.totalText}>Tổng: {totalAmount} USDC</Text>

      <View style={styles.toggleRow}>
        <Pressable style={styles.toggleOption} onPress={() => setMode('equal')}>
          <View style={[styles.radio, mode === 'equal' && styles.radioSelected]} />
          <Text style={styles.toggleLabel}>Chia đều</Text>
        </Pressable>
        <Pressable style={styles.toggleOption} onPress={() => setMode('custom')}>
          <View style={[styles.radio, mode === 'custom' && styles.radioSelected]} />
          <Text style={styles.toggleLabel}>Tuỳ chỉnh</Text>
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
              <Text style={styles.memberName}>{nameOf(id)}</Text>
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
                <Text style={styles.amountText}>{value} USDC</Text>
              )}
            </View>
          );
        }}
      />

      {error && <Text style={styles.errorText}>{error}</Text>}

      <Button title="Xác nhận tạo khoản chi" onPress={handleConfirm} />
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
  totalText: {
    ...typography.title,
    color: colors.textPrimary,
  },
  toggleRow: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  toggleOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: colors.border,
  },
  radioSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  toggleLabel: {
    ...typography.body,
    color: colors.textPrimary,
  },
  memberRow: {
    minHeight: 44,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  memberName: {
    ...typography.body,
    color: colors.textPrimary,
  },
  amountText: {
    ...typography.body,
    color: colors.textPrimary,
  },
  amountInput: {
    minHeight: 40,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.sm,
    paddingHorizontal: spacing.sm,
    minWidth: 100,
    textAlign: 'right',
    ...typography.body,
    color: colors.textPrimary,
  },
  errorText: {
    ...typography.caption,
    color: colors.error,
  },
});
