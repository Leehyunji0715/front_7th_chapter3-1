import React from 'react';

interface BadgeProps {
  children?: React.ReactNode;
  type?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  size?: 'small' | 'medium' | 'large';
  pill?: boolean;
  paymentStatus?: 'paid' | 'pending' | 'failed' | 'refunded';
  showIcon?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  type = 'primary',
  size = 'medium',
  pill = false,
  showIcon = false,
}) => {
  void showIcon; // <-- 안 쓰는듯?
  const classes = ['badge', `badge-${type}`, `badge-${size}`, pill && 'badge-pill']
    .filter(Boolean)
    .join(' ');

  return <span className={classes}>{children}</span>;
};
