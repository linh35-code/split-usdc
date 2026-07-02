import { Member } from './types';

export type DirectoryUser = Member & { email: string };

export const directoryUsers: DirectoryUser[] = [
  { id: 'an', name: 'An', email: 'an@example.com' },
  { id: 'binh', name: 'Bình', email: 'binh@example.com' },
  { id: 'chi', name: 'Chi', email: 'chi@example.com' },
  { id: 'dung', name: 'Dũng', email: 'dung@example.com' },
  { id: 'trang', name: 'Trang', email: 'trang@example.com' },
  { id: 'hoa', name: 'Hoa', email: 'hoa@example.com' },
  { id: 'khoa', name: 'Khoa', email: 'khoa@example.com' },
];
