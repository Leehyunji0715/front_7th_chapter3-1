import React from 'react';
import { Badge } from '../atoms/Badge';

type StatusType = 'active' | 'inactive' | '';

type Props = {
  status: StatusType;
};

const getStatusText = (status: StatusType) => {
  switch (status) {
    case 'active':
      return '게시됨';
    case 'inactive':
      return '임시저장';
    default:
      return '거부됨';
  }
};

const getBadgeType = (status: StatusType) => {
  switch (status) {
    case 'active':
      return 'success';
    case 'inactive':
      return 'warning';
    default:
      return 'danger';
  }
};

export const UserStatusBadge: React.FC<Props> = ({ status }) => {
  return (
    <Badge type={getBadgeType(status)} size='medium'>
      {getStatusText(status)}
    </Badge>
  );
};
