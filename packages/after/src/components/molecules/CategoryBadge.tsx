import React from 'react';
import { Badge } from '../atoms/Badge';

// 안 쓰이는 컴포넌트

type CategoryType = 'development' | 'design' | 'accessibility';

type Props = {
  category: CategoryType;
};

const getClassType = (priority: CategoryType) => {
  switch (priority) {
    case 'development':
      return 'primary';
    case 'design':
      return 'info';
    case 'accessibility':
      return 'danger';
    default:
      return 'secondary';
  }
};

export const CategoryBadge: React.FC<Props> = ({ category }) => {
  return (
    <Badge type={getClassType(category)} pill>
      {category}
    </Badge>
  );
};
