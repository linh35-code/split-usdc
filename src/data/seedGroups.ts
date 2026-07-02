import { Group } from './types';

const HOUR = 60 * 60 * 1000;
const now = Date.now();

export const seedGroups: Group[] = [
  {
    id: 'group-1',
    name: 'Chuyến đi Đà Lạt',
    members: [
      { id: 'me', name: 'Bạn' },
      { id: 'an', name: 'An' },
      { id: 'binh', name: 'Bình' },
      { id: 'chi', name: 'Chi' },
    ],
    expenses: [
      {
        id: 'exp-1',
        title: 'Thuê villa',
        totalAmount: 120,
        paidByMemberId: 'me',
        participantIds: ['me', 'an', 'binh', 'chi'],
        shares: { me: 30, an: 30, binh: 30, chi: 30 },
        paidMemberIds: ['an'],
        createdAt: now - 72 * HOUR,
      },
      {
        id: 'exp-2',
        title: 'Ăn tối',
        totalAmount: 45,
        paidByMemberId: 'an',
        participantIds: ['me', 'an', 'binh', 'chi'],
        shares: { me: 11.25, an: 11.25, binh: 11.25, chi: 11.25 },
        paidMemberIds: ['me', 'binh', 'chi'],
        createdAt: now - 48 * HOUR,
      },
      {
        id: 'exp-4',
        title: 'Vé tham quan',
        totalAmount: 200,
        paidByMemberId: 'chi',
        participantIds: ['me', 'an', 'binh', 'chi'],
        shares: { me: 50, an: 50, binh: 50, chi: 50 },
        paidMemberIds: [],
        createdAt: now - 24 * HOUR,
      },
    ],
  },
  {
    id: 'group-2',
    name: 'Nhóm dự án Web3',
    members: [
      { id: 'me', name: 'Bạn' },
      { id: 'dung', name: 'Dũng' },
      { id: 'trang', name: 'Trang' },
    ],
    expenses: [
      {
        id: 'exp-3',
        title: 'Server tháng 7',
        totalAmount: 30,
        paidByMemberId: 'dung',
        participantIds: ['me', 'dung', 'trang'],
        shares: { me: 10, dung: 10, trang: 10 },
        paidMemberIds: [],
        createdAt: now - 12 * HOUR,
      },
    ],
  },
];
