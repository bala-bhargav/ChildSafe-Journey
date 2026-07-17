import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import { forwardRef } from 'react';

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, error, id, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <Label htmlFor={id}>{label}</Label>
        <Input ref={ref} id={id} error={error} {...props} />
      </div>
    );
  }
);
FormField.displayName = 'FormField';
