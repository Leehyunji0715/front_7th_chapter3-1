import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import type { User } from '@/services/userService';

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

const columns = [
  { key: 'id', header: 'ID', width: '60px' },
  { key: 'username', header: '사용자명', width: '150px' },
  { key: 'email', header: '이메일' },
  { key: 'role', header: '역할', width: '120px' },
  { key: 'status', header: '상태', width: '120px' },
  { key: 'createdAt', header: '생성일', width: '120px' },
  { key: 'lastLogin', header: '마지막 로그인', width: '140px' },
  { key: 'actions', header: '관리', width: '200px' },
];

export const UserTable: React.FC<UserTableProps> = ({
  users,
  onEdit,
  onDelete,
}) => {
  return (
    <Table className='table-container table overflow-auto border border-gray-300'>
      <TableHeader>
        <TableRow>
          {columns.map(col => (
            <TableHead
              key={col.key}
              style={{ width: col.width || 'auto' }}
            >
              {col.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map(user => (
          <TableRow key={user.id}>
            <TableCell>{user.id}</TableCell>
            <TableCell>{user.username}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>{user.status}</TableCell>
            <TableCell>{user.createdAt}</TableCell>
            <TableCell>{user.lastLogin ?? ''}</TableCell>
            <TableCell>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Button
                  size='sm'
                  variant='primary'
                  onClick={() => onEdit(user)}
                >
                  수정
                </Button>
                <Button
                  size='sm'
                  variant='danger'
                  onClick={() => onDelete(user.id)}
                >
                  삭제
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};