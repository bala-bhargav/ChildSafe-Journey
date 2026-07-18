import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cn } from '@/lib/utils';

const AlertDialog = DialogPrimitive.Root;
const AlertDialogTrigger = DialogPrimitive.Trigger;
const AlertDialogContent = DialogPrimitive.Content;
const AlertDialogTitle = DialogPrimitive.Title;
const AlertDialogDescription = DialogPrimitive.Description;

// Note: AlertDialog doesn't have Header/Footer built-in, we'll create simple wrapper divs
interface AlertDialogHeaderProps {
  className?: string;
  children: React.ReactNode;
}

const AlertDialogHeader = ({ className, children, ...props }: AlertDialogHeaderProps) => (
  <div className={cn('flex flex-col space-y-2 pb-4', className)} {...props}>
    {children}
  </div>
);

interface AlertDialogFooterProps {
  className?: string;
  children: React.ReactNode;
}

const AlertDialogFooter = ({ className, children, ...props }: AlertDialogFooterProps) => (
  <div className={cn('flex flex-col sm:flex-row sm:justify-end sm:space-x-2 pt-4', className)} {...props}>
    {children}
  </div>
);

interface AlertDialogActionProps {
  className?: string;
  children: React.ReactNode;
}

const AlertDialogAction = ({ className, children, ...props }: AlertDialogActionProps) => (
  <button className={cn('inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0', className)} {...props}>
    {children}
  </button>
);

interface AlertDialogCancelProps {
  className?: string;
  children: React.ReactNode;
}

const AlertDialogCancel = ({ className, children, ...props }: AlertDialogCancelProps) => (
  <button className={cn('inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0', className)} {...props}>
    {children}
  </button>
);

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
};