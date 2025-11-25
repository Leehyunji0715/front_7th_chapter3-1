import React from 'react';
import { Badge } from '../atoms/Badge';

// 안 쓰이는 컴포넌트

type PriorityType = 'high' | 'medium' | 'low';

type Props = {
  priority: PriorityType;
};

const getContentText = (priority: PriorityType) => {
  switch (priority) {
    case 'high':
      return '높음';
    case 'medium':
      return '보통';
    case 'low':
      return '낮음';
    default:
      return '';
  }
};

const getClassType = (priority: PriorityType) => {
  switch (priority) {
    case 'high':
      return 'danger';
    case 'medium':
      return 'warning';
    case 'low':
      return 'info';
    default:
      return 'primary';
  }
};

export const UserRoleBadge: React.FC<Props> = ({ priority }) => {
  return (
    <Badge type={getClassType(priority)} size='medium'>
      {getContentText(priority)}
    </Badge>
  );
};
