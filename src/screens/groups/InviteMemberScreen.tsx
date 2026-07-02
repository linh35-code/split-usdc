import { useState, useMemo } from 'react';
import { View, Text, TextInput, Pressable, FlatList, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainStackParamList } from '../../navigation/types';
import { useGroups } from '../../context/GroupsContext';
import { directoryUsers } from '../../data/mockUsers';

type Props = NativeStackScreenProps<MainStackParamList, 'InviteMember'>;

export default function InviteMemberScreen({ route, navigation }: Props) {
  const { getGroupById, addMember } = useGroups();
  const group = getGroupById(route.params.groupId);
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length === 0) return [];
    return directoryUsers.filter(
      (u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    );
  }, [query]);

  if (!group) return null;

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.goBack()}>
        <Text>← Mời thành viên</Text>
      </Pressable>

      <TextInput
        style={styles.input}
        placeholder="Tìm email/username"
        value={query}
        onChangeText={setQuery}
      />

      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const isMember = group.members.some((m) => m.id === item.id);
          return (
            <View style={styles.resultRow}>
              <Text>{item.name}</Text>
              <Pressable
                style={styles.inviteButton}
                disabled={isMember}
                onPress={() => addMember(group.id, { id: item.id, name: item.name })}
              >
                <Text>{isMember ? 'Đã là thành viên' : 'Mời'}</Text>
              </Pressable>
            </View>
          );
        }}
      />

      <Pressable
        style={styles.doneButton}
        onPress={() => navigation.replace('GroupDetail', { groupId: group.id })}
      >
        <Text>Xong, vào nhóm</Text>
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
  resultRow: {
    minHeight: 44,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  inviteButton: {
    minHeight: 44,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  doneButton: {
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
