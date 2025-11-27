import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { Card, CardContent, CardTitle } from '../ui/card';

const statsCardVariants = cva(
  'p-[var(--stats-card-spacing-padding)] border rounded-[var(--stats-card-radius-default)]',
  {
    variants: {
      variant: {
        primary:
          'bg-[var(--stats-card-background-primary)] border-[var(--stats-card-border-primary)] [&_.stats-value]:text-[var(--stats-card-text-primary)]',
        success:
          'bg-[var(--stats-card-background-success)] border-[var(--stats-card-border-success)] [&_.stats-value]:text-[var(--stats-card-text-success)]',
        warning:
          'bg-[var(--stats-card-background-warning)] border-[var(--stats-card-border-warning)] [&_.stats-value]:text-[var(--stats-card-text-warning)]',
        error:
          'bg-[var(--stats-card-background-error)] border-[var(--stats-card-border-error)] [&_.stats-value]:text-[var(--stats-card-text-error)]',
        secondary:
          'bg-[var(--stats-card-background-secondary)] border-[var(--stats-card-border-secondary)] [&_.stats-value]:text-[var(--stats-card-text-secondary)]',
        info: 'bg-[var(--stats-card-background-info)] border-[var(--stats-card-border-info)] [&_.stats-value]:text-[var(--stats-card-text-info)]',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
);

interface StatsCardProps
  extends Omit<React.ComponentProps<typeof Card>, 'variant'>,
    VariantProps<typeof statsCardVariants> {
  label: string;
  value: string | number;
}

function StatsCard({
  className,
  variant,
  label,
  value,
  ...props
}: StatsCardProps) {
  return (
    <Card
      variant='bordered'
      className={cn(
        statsCardVariants({ variant }),
        'rounded-[var(--stats-card-radius-default)]',
        className
      )}
      {...props}
    >
      <CardTitle className='text-sm text-[var(--stats-card-text-label)]'>
        {label}
      </CardTitle>
      <CardContent className='px-0'>
        <div className='stats-value text-2xl leading-tight font-bold'>
          {value}
        </div>
      </CardContent>
    </Card>
  );
}

export { StatsCard };
