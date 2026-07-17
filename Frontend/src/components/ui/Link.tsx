import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, ...props }, ref) => (
    <a
      ref={ref}
      className={cn(
        'text-primary hover:text-primary/80 transition-colors underline-offset-4 hover:underline',
        className
      )}
      {...props}
    />
  )
);
Link.displayName = 'Link';