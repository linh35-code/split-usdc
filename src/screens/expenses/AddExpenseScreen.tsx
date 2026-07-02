import { useState } from 'react';
import { View, Text, Pressable, FlatList, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainStackParamList } from '../../navigation/types';
import { useGroups } from '../../context/GroupsContext';
import { CURRENT_USER_ID } from '../../data/types';
import BackButton from '../../components/BackButton';
import TextField from '../../components/TextField';
import Avatar from '../../components/Avatar';
import Button from '../../components/Button';
import { colors, radii, spacing, typography } from '../../theme/theme';

type Props = NativeStackScreenProps<MainStackParamList, 'AddExpense'>;

export default function AddExpenseScreen({ route, navigation }: Props) {
  const { getGroupById } = useGroups();
  const group = getGroupById(route.params.groupId);

  const [title, setTitle] = useState('');
  const [amountText, setAmountText] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>(group ? group.members.map((m) => m.id) : []);
  const [error, setError] = useState<string | null>(null);

  if (!group) return null;

  const toggleMember = (memberId: string) => {
    if (memberId === CURRENT_USER_ID) return;
    setSelectedIds((prev) =>
      prev.includes(memberId) ? prev.filter((id) => id !== memberId) : [...prev, memberId]
    );
  };

  const handleContinue = () => {
    if (title.trim().length === 0) {
      setError('Vui lòng nhập tên khoản chi');
      return;
    }
    const amount = Number(amountText.replace(',', '.'));
    if (!Number.isFinite(amount) || amount <= 0) {
      setError('Số tiền không hợp lệ');
      return;
    }
    if (selectedIds.length < 2) {
      setError('Cần ít nhất 1 người khác để chia tiền');
      return;
    }
    navigation.navigate('SplitExpense', {
      groupId: group.id,
      title: title.trim(),
      totalAmount: amount,
      participantIds: selectedIds,
    });
  };

  return (
    <View style={styles.container}>
      <BackButton label="Thêm khoản chi" onPress={() => navigation.goBack()} />

      <TextField
        placeholder="Tên khoản chi"
        value={title}
        onChangeText={(text) => {
          setTitle(text);
          if (error) setError(null);
        }}
      />
      <TextField
        placeholder="Số tiền USDC"
        keyboardType="decimal-pad"
        value={amountText}
        onChangeText={(text) => {
          setAmountText(text);
          if (error) setError(null);
        }}
      />

      <Text style={styles.sectionLabel}>Chọn người tham gia</Text>
      <FlatList
        data={group.members}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const isMe = item.id === CURRENT_USER_ID;
          const selected = selectedIds.includes(item.id);
          return (
            <Pressable style={styles.memberRow} onPress={() => toggleMember(item.id)} disabled={isMe}>
              <View style={[styles.checkbox, selected && styles.checkboxChecked]}>
                {selected && <Text style={styles.checkboxMark}>✓</Text>}
              </View>
              <Avatar name={item.name} size={32} />
              <Text style={styles.memberName}>{item.name}</Text>
            </Pressable>
          );
        }}
      />

      {error && <Text style={styles.errorText}>{error}</Text>}

      <Button title="Tiếp tục" onPress={handleContinue} />
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
  sectionLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  memberRow: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkboxMark: {
    color: colors.textInverse,
    fontSize: 14,
    fontWeight: '700',
  },
  memberName: {
    ...typography.body,
    color: colors.textPrimary,
  },
  errorText: {
    ...typography.caption,
    color: colors.error,
  },
});
