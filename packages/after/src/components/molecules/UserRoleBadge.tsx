import React from 'react';
import { Badge } from '../atoms/Badge';

type UserRoleType = 'admin' | 'moderator' | 'user' | 'guest';

type Props = {
  userRole: UserRoleType;
};

const getContentText = (userRole: UserRoleType) => {
  switch (userRole) {
    case 'admin':
      return '관리자';
    case 'moderator':
      return '운영자';
    case 'user':
      return '사용자';
    case 'guest':
      return '게스트';
    default:
      return '';
  }
};

const getClassType = (userRole: UserRoleType) => {
  switch (userRole) {
    case 'admin':
      return 'danger';
    case 'moderator':
      return 'warning';
    case 'user':
      return 'primary';
    case 'guest':
      return 'secondary';
    default:
      return 'primary';
  }
};

export const UserRoleBadge: React.FC<Props> = ({ userRole }) => {
  return (
    <Badge type={getClassType(userRole)} size='medium'>
      {getContentText(userRole)}
    </Badge>
  );
};
