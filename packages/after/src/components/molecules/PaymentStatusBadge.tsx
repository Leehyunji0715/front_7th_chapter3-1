import React from 'react';
import { Badge } from '../atoms/Badge';

// 안 쓰이는 컴포넌트

type PaymentStatusType = 'paid' | 'pending' | 'failed' | 'refunded';

type Props = {
  status: PaymentStatusType;
};

const getContentText = (status: PaymentStatusType) => {
  switch (status) {
    case 'paid':
      return '결제완료';
    case 'pending':
      return '결제대기';
    case 'failed':
      return '결제실패';
    case 'refunded':
      return '환불됨';
    default:
      return '';
  }
};

const getClassType = (status: PaymentStatusType) => {
  switch (status) {
    case 'paid':
      return 'success';
    case 'pending':
      return 'warning';
    case 'failed':
      return 'danger';
    case 'refunded':
      return 'secondary';
    default:
      return 'primary';
  }
};

export const PaymentStatusBadge: React.FC<Props> = ({ status }) => {
  return <Badge type={getClassType(status)}>{getContentText(status)}</Badge>;
};
