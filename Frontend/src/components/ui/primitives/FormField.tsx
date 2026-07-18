import { cn } from '@/lib/utils';
import { Label } from './Label';
import { Input } from './Input';

export interface FormFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id'> {
  label: string;
  error?: string;
  hint?: string;
  id: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
}

export const FormField = ({
  label,
  error,
  hint,
  id,
  className,
  type = 'text',
  ...props
}: FormFieldProps) => (
  <div className={cn('space-y-1.5', className)}>
    <Label htmlFor={id} className="text-sm font-medium text-foreground">
      {label}
    </Label>
    <Input
      id={id}
      type={type}
      className={cn('w-full', error && 'border-destructive focus-visible:ring-destructive')}
      aria-invalid={error ? 'true' : 'false'}
      aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
      {...props}
    />
    {error && (
      <p id={`${id}-error`} className="text-sm text-destructive" role="alert">
        {error}
      </p>
    )}
    {hint && !error && (
      <p id={`${id}-hint`} className="text-sm text-muted-foreground">
        {hint}
      </p>
    )}
  </div>
);