import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const alertVariants = cva(
  'relative w-full rounded-lg border px-4 py-3 text-sm [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground',
  {
    variants: {
      variant: {
        info: 'bg-[#e3f2fd] border-[#90caf9] text-[#0d47a1]',
        success: 'bg-[#e8f5e9] border-[#81c784] text-[#1b5e20]',
        warning: 'bg-[#fff3e0] border-[#ffb74d] text-[#e65100]',
        error: 'bg-[#ffebee] border-[#e57373] text-[#b71c1c]',
        default: 'bg-[#f5f5f5] border-[#bdbdbd] text-[#424242]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

interface AlertProps
  extends React.ComponentProps<'div'>,
    VariantProps<typeof alertVariants> {
  onClose?: () => void;
}

function Alert({
  className,
  variant,
  onClose,
  children,
  ...props
}: AlertProps) {
  return (
    <div
      data-slot='alert'
      role='alert'
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      {children}
      {onClose && (
        <button
          onClick={onClose}
          className='absolute top-2 right-2 p-1 text-current transition-opacity hover:opacity-70'
          aria-label='닫기'
        >
          <span className='text-lg leading-none'>×</span>
        </button>
      )}
    </div>
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='alert-title'
      className={cn(
        'col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight',
        className
      )}
      {...props}
    />
  );
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='alert-description'
      className={cn(
        'text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed',
        className
      )}
      {...props}
    />
  );
}

export { Alert, AlertTitle, AlertDescription };
