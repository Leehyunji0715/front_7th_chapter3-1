import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

// const buttonVariants = cva(
//   "cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
//   {
//     variants: {
//       variant: {
//         default: 'bg-primary text-primary-foreground hover:bg-primary/90',
//         destructive:
//           'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
//         outline:
//           'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
//         secondary:
//           'bg-secondary text-secondary-foreground hover:bg-secondary/80',
//         ghost:
//           'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
//         link: 'text-primary underline-offset-4 hover:underline',
//         primary: 'bg-[#1976d2] text-white hover:bg-[#1565c0]',
//         danger: 'bg-[#d32f2f] text-white hover:bg-[#c62828]',
//         success: 'bg-[#388e3c] text-white hover:bg-[#2e7d32]',
//       },
//       size: {
//         default: 'h-9 px-4 py-2 has-[>svg]:px-3',
//         sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
//         lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
//         icon: 'size-9',
//         'icon-sm': 'size-8',
//         'icon-lg': 'size-10',
//         md: 'h-9 px-4 py-2',
//       },
//     },
//     defaultVariants: {
//       variant: 'default',
//       size: 'default',
//     },
//   }
// );

const buttonVariants = cva(
  'inline-block font-sans font-normal leading-6 rounded cursor-pointer border border-solid whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: 'bg-[#1976d2] text-white border-[#1565c0] hover:bg-[#1565c0]',
        secondary: 'bg-[#f5f5f5] text-[#333] border-[#ddd] hover:bg-[#e0e0e0]',
        danger: 'bg-[#d32f2f] text-white border-[#c62828] hover:bg-[#c62828]',
        success: 'bg-[#388e3c] text-white border-[#2e7d32] hover:bg-[#2e7d32]',
      },
      size: {
        sm: 'py-1.5 px-3 text-[13px]',
        md: 'py-2.5 px-5 text-sm',
        lg: 'py-3 px-6 text-[15px]',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  }
);

function Button({
  className,
  variant,
  size,
  fullWidth,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot='button'
      className={cn(buttonVariants({ variant, size, fullWidth, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
