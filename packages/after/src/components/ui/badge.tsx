import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center border px-[var(--badge-padding-x)] py-[var(--badge-padding-y)] justify-center font-[var(--badge-font-weight)] font-sans leading-none whitespace-nowrap',
  {
    variants: {
      variant: {
        secondary:
          'bg-[var(--badge-background-default)] !text-[var(--badge-text-default)] border-[var(--badge-border-default)]',
        primary:
          'bg-[var(--badge-background-primary)] !text-[var(--badge-text-primary)] border-[var(--badge-border-primary)]',
        success:
          'bg-[var(--badge-background-success)] !text-[var(--badge-text-success)] border-[var(--badge-border-success)]',
        warning:
          'bg-[var(--badge-background-warning)] !text-[var(--badge-text-warning)] border-[var(--badge-border-warning)]',
        danger:
          'bg-[var(--badge-background-error)] !text-[var(--badge-text-error)] border-[var(--badge-border-error)]',
        info: 'bg-[var(--badge-background-info)] !text-[var(--badge-text-info)] border-[var(--badge-border-info)]',
      },
      size: {
        small: 'px-1 text-[0.625rem] h-4', // 10px font, 16px height, 4px padding
        medium: 'px-[var(--badge-padding-x)] text-[var(--badge-font-size)] h-5', // CSS token font size
        large: 'px-2.5 text-[0.8125rem] h-6', // 13px font, 24px height, 10px padding
      },
      pill: {
        true: 'rounded-[10px]',
        false: 'rounded-[var(--badge-radius-default)]',
      },
    },
    defaultVariants: {
      variant: 'secondary',
      size: 'medium',
      pill: false,
    },
  }
);

function Badge({
  className,
  variant,
  size,
  pill,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span';

  return (
    <Comp
      data-slot='badge'
      className={cn(badgeVariants({ variant, size, pill }), className ?? '')}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
