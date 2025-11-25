import React from 'react';
import { Badge } from '../atoms/Badge';

type StatusType = 'published' | 'draft' | 'archived' | 'pending' | 'rejected';

type Props = {
  status: StatusType;
};

const getStatusText = (status: StatusType) => {
  switch (status) {
    case 'published':
      return '게시됨';
    case 'draft':
      return '임시저장';
    case 'archived':
      return '보관됨';
    case 'pending':
      return '대기중';
    case 'rejected':
      return '거부됨';
    default:
      return '';
  }
};

const getBadgeType = (status: StatusType) => {
  switch (status) {
    case 'published':
      return 'success';
    case 'draft':
      return 'warning';
    case 'archived':
      return 'secondary';
    case 'pending':
      return 'info';
    case 'rejected':
      return 'danger';
    default:
      return 'primary';
  }
};

export const StatusBadge: React.FC<Props> = ({ status }) => {
  return (
    <Badge type={getBadgeType(status)} size='medium'>
      {getStatusText(status)}
    </Badge>
  );
};
