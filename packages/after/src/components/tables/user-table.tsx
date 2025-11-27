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
import { Badge } from '../ui/badge';

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
            <TableHead key={col.key} style={{ width: col.width || 'auto' }}>
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
            <TableCell>
              <Badge variant={getRoleVariant(user.role)}>
                {getRoleText(user.role)}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge variant={getStatusVariant(user.status)}>
                {getStatusText(user.status)}
              </Badge>
            </TableCell>
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

const getRoleVariant = (category: 'admin' | 'moderator' | 'user') => {
  switch (category) {
    case 'admin':
      return 'danger';
    case 'moderator':
      return 'warning';
    case 'user':
      return 'primary';
    default:
      return null;
  }
};

const getRoleText = (category: 'admin' | 'moderator' | 'user') => {
  switch (category) {
    case 'admin':
      return '관리자';
    case 'moderator':
      return '운영자';
    case 'user':
      return '사용지';
  }
};

const getStatusVariant = (status: 'active' | 'inactive' | 'suspended') => {
  switch (status) {
    case 'active':
      return 'success';
    case 'inactive':
      return 'warning';
    case 'suspended':
      return 'danger';
  }
};

const getStatusText = (status: 'active' | 'inactive' | 'suspended') => {
  switch (status) {
    case 'active':
      return '게시됨';
    case 'inactive':
      return '임시저장';
    case 'suspended':
      return '거부됨';
    default:
      return '';
  }
};
