import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainStackParamList } from '../../navigation/types';
import { useGroups } from '../../context/GroupsContext';
import BackButton from '../../components/BackButton';
import TextField from '../../components/TextField';
import Button from '../../components/Button';
import { colors, radii, spacing, typography } from '../../theme/theme';

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
      <BackButton label="Tạo nhóm mới" onPress={() => navigation.goBack()} />

      <TextField
        placeholder="Tên nhóm"
        value={name}
        error={error}
        onChangeText={(text) => {
          setName(text);
          if (error) setError(null);
        }}
      />

      <View style={styles.avatarPlaceholder}>
        <Text style={styles.avatarPlaceholderText}>Ảnh đại diện nhóm</Text>
      </View>

      <Button title="Tạo & Mời thành viên" onPress={handleSubmit} />
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
  avatarPlaceholder: {
    height: 64,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarPlaceholderText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
});
