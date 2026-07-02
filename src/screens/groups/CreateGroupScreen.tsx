import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainStackParamList } from '../../navigation/types';
import { useGroups } from '../../context/GroupsContext';

type Props = NativeStackScreenProps<MainStackParamList, 'CreateGroup'>;

export default function CreateGroupScreen({ navigation }: Props) {
  const { addGroup } = useGroups();
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    if (name.trim().length === 0) {
      setError('Vui lòng nhập tên nhóm');
      return;
    }
    const newGroup = addGroup(name.trim());
    navigation.replace('InviteMember', { groupId: newGroup.id });
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.goBack()}>
        <Text>← Tạo nhóm mới</Text>
      </Pressable>

      <TextInput
        style={styles.input}
        placeholder="Tên nhóm"
        value={name}
        onChangeText={(text) => {
          setName(text);
          if (error) setError(null);
        }}
      />
      {error && <Text>{error}</Text>}

      <View style={styles.avatarPlaceholder}>
        <Text>[Ảnh đại diện nhóm]</Text>
      </View>

      <Pressable style={styles.submitButton} onPress={handleSubmit}>
        <Text>Tạo & Mời thành viên</Text>
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
  avatarPlaceholder: {
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButton: {
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
