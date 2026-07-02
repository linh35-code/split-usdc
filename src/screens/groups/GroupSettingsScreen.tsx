import { View, Text, Pressable, FlatList, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainStackParamList } from '../../navigation/types';
import { useGroups } from '../../context/GroupsContext';

type Props = NativeStackScreenProps<MainStackParamList, 'GroupSettings'>;

export default function GroupSettingsScreen({ route, navigation }: Props) {
  const { getGroupById } = useGroups();
  const group = getGroupById(route.params.groupId);
  if (!group) return null;

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.goBack()}>
        <Text>← {group.name}</Text>
      </Pressable>

      <FlatList
        data={group.members}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.memberRow}>
            <Text>{item.name}</Text>
          </View>
        )}
      />

      <Pressable
        style={styles.inviteButton}
        onPress={() => navigation.navigate('InviteMember', { groupId: group.id })}
      >
        <Text>+ Mời thành viên</Text>
      </Pressable>

      <Pressable
        style={styles.leaveButton}
        onPress={() => navigation.navigate('LeaveGroup', { groupId: group.id })}
      >
        <Text>Rời nhóm</Text>
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
  memberRow: {
    minHeight: 44,
    justifyContent: 'center',
  },
  inviteButton: {
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leaveButton: {
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
