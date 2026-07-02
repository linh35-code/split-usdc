import { View, Text, Pressable, FlatList, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainStackParamList } from '../../navigation/types';
import { useGroups } from '../../context/GroupsContext';
import BackButton from '../../components/BackButton';
import Avatar from '../../components/Avatar';
import Button from '../../components/Button';
import { colors, spacing, typography } from '../../theme/theme';

type Props = NativeStackScreenProps<MainStackParamList, 'GroupSettings'>;

export default function GroupSettingsScreen({ route, navigation }: Props) {
  const { getGroupById } = useGroups();
  const group = getGroupById(route.params.groupId);
  if (!group) return null;

  return (
    <View style={styles.container}>
      <BackButton label={group.name} onPress={() => navigation.goBack()} />

      <FlatList
        style={styles.list}
        data={group.members}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.memberRow}>
            <Avatar name={item.name} size={32} />
            <Text style={styles.memberName}>{item.name}</Text>
          </View>
        )}
      />

      <Button
        title="+ Mời thành viên"
        variant="secondary"
        onPress={() => navigation.navigate('InviteMember', { groupId: group.id })}
      />

      <Pressable style={styles.leaveButton} onPress={() => navigation.navigate('LeaveGroup', { groupId: group.id })}>
        <Text style={styles.leaveLabel}>Rời nhóm</Text>
      </Pressable>
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
  memberRow: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  memberName: {
    ...typography.body,
    color: colors.textPrimary,
  },
  leaveButton: {
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leaveLabel: {
    ...typography.body,
    color: colors.error,
    fontWeight: '600',
  },
});
