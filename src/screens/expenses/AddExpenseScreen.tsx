import { useState } from 'react';
import { View, Text, TextInput, Pressable, FlatList, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainStackParamList } from '../../navigation/types';
import { useGroups } from '../../context/GroupsContext';
import { CURRENT_USER_ID } from '../../data/types';

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
      <Pressable onPress={() => navigation.goBack()}>
        <Text>← Thêm khoản chi</Text>
      </Pressable>

      <TextInput
        style={styles.input}
        placeholder="Tên khoản chi"
        value={title}
        onChangeText={(text) => {
          setTitle(text);
          if (error) setError(null);
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Số tiền USDC"
        keyboardType="decimal-pad"
        value={amountText}
        onChangeText={(text) => {
          setAmountText(text);
          if (error) setError(null);
        }}
      />

      <Text>Chọn người tham gia</Text>
      <FlatList
        data={group.members}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable style={styles.memberRow} onPress={() => toggleMember(item.id)}>
            <Text>[{selectedIds.includes(item.id) ? 'x' : ' '}] {item.name}</Text>
          </Pressable>
        )}
      />

      {error && <Text>{error}</Text>}

      <Pressable style={styles.continueButton} onPress={handleContinue}>
        <Text>Tiếp tục</Text>
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
  input: {
    minHeight: 44,
    borderWidth: 1,
    paddingHorizontal: 12,
  },
  memberRow: {
    minHeight: 44,
    justifyContent: 'center',
  },
  continueButton: {
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
