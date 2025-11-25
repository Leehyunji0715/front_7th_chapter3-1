import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

// const badgeVariants = cva(
//   'inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden',
//   {
//     variants: {
//       variant: {
//         default: 'border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90',
//         secondary:
//           'border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90',
//         destructive:
//           'border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
//         outline: 'text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
//       },
//     },
//     defaultVariants: {
//       variant: 'default',
//     },
//   }
// );

const badgeVariants = cva(
  'inline-flex items-center justify-center font-bold font-sans leading-none whitespace-nowrap',
  {
    variants: {
      variant: {
        primary: 'bg-[#1976d2] text-white',
        secondary: 'bg-[#757575] text-white',
        success: 'bg-[#388e3c] text-white',
        danger: 'bg-[#d32f2f] text-white',
        warning: 'bg-[#f57c00] text-white',
        info: 'bg-[#0288d1] text-white',
      },
      size: {
        small: 'px-1 text-[0.625rem] h-4', // 10px font, 16px height, 4px padding
        medium: 'px-2 text-xs h-5', // 12px font, 20px height, 8px padding
        large: 'px-2.5 text-[0.8125rem] h-6', // 13px font, 24px height, 10px padding
      },
      pill: {
        true: 'rounded-[10px]',
        false: 'rounded-[3px]',
      },
    },
    defaultVariants: {
      variant: 'primary',
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
