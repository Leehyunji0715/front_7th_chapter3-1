import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { Card, CardContent, CardTitle } from '../ui/card';

const statsCardVariants = cva('p-3 px-3', {
  variants: {
    variant: {
      primary: 'bg-[#e3f2fd] border-[#90caf9] [&_.stats-value]:text-[#1976d2]',
      success: 'bg-[#e8f5e9] border-[#81c784] [&_.stats-value]:text-[#388e3c]',
      warning: 'bg-[#fff3e0] border-[#ffb74d] [&_.stats-value]:text-[#f57c00]',
      error: 'bg-[#ffebee] border-[#e57373] [&_.stats-value]:text-[#d32f2f]',
      secondary:
        'bg-[#f5f5f5] border-[#bdbdbd] [&_.stats-value]:text-[#424242]',
      info: 'bg-[#e1f5fe] border-[#4fc3f7] [&_.stats-value]:text-[#0288d1]',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

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
      className={cn(statsCardVariants({ variant }), 'rounded-[3px]', className)}
      {...props}
    >
      <CardTitle className='text-sm text-[#666]'>{label}</CardTitle>
      <CardContent className='px-0'>
        <div className='stats-value text-2xl leading-tight font-bold'>
          {value}
        </div>
      </CardContent>
    </Card>
  );
}

export { StatsCard };
