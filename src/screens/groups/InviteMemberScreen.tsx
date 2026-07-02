import { useState, useMemo } from 'react';
import { View, Text, Pressable, FlatList, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainStackParamList } from '../../navigation/types';
import { useGroups } from '../../context/GroupsContext';
import { directoryUsers } from '../../data/mockUsers';
import BackButton from '../../components/BackButton';
import TextField from '../../components/TextField';
import Avatar from '../../components/Avatar';
import Button from '../../components/Button';
import { colors, spacing, typography } from '../../theme/theme';

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
      <BackButton label="Mời thành viên" onPress={() => navigation.goBack()} />

      <TextField placeholder="Tìm email/username" value={query} onChangeText={setQuery} />

      <FlatList
        style={styles.list}
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const isMember = group.members.some((m) => m.id === item.id);
          return (
            <View style={styles.resultRow}>
              <View style={styles.resultInfo}>
                <Avatar name={item.name} size={32} />
                <Text style={styles.resultName}>{item.name}</Text>
              </View>
              <Pressable
                style={styles.inviteButton}
                disabled={isMember}
                onPress={() => addMember(group.id, { id: item.id, name: item.name })}
              >
                <Text style={[styles.inviteButtonLabel, isMember && styles.inviteButtonLabelDisabled]}>
                  {isMember ? 'Đã là thành viên' : 'Mời'}
                </Text>
              </Pressable>
            </View>
          );
        }}
      />

      <Button title="Xong, vào nhóm" onPress={() => navigation.replace('GroupDetail', { groupId: group.id })} />
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
  list: {
    flex: 1,
  },
  resultRow: {
    minHeight: 44,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  resultInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  resultName: {
    ...typography.body,
    color: colors.textPrimary,
  },
  inviteButton: {
    minHeight: 36,
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
  },
  inviteButtonLabel: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '600',
  },
  inviteButtonLabelDisabled: {
    color: colors.textSecondary,
  },
});
