import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Checkbox } from '@/components/ui/Checkbox';

const registerSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(['parent', 'driver', 'admin']),
  agreeTerms: z.boolean().refine(val => val === true, 'You must agree to the terms'),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export const RegisterForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: 'parent' },
  });

  const onSubmit = (data: RegisterFormData) => {
    console.log('Register:', data);
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" placeholder="John" error={errors.firstName?.message} {...register('firstName')} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" placeholder="Doe" error={errors.lastName?.message} {...register('lastName')} />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="parent@school.edu" error={errors.email?.message} {...register('email')} />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="role">I am a</Label>
        <select id="role" className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" {...register('role')}>
          <option value="parent">Parent / Guardian</option>
          <option value="driver">Bus Driver</option>
          <option value="admin">School Admin</option>
        </select>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" placeholder="••••••••" error={errors.password?.message} {...register('password')} />
        <p className="text-xs text-muted-foreground">At least 8 characters</p>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input id="confirmPassword" type="password" placeholder="••••••••" error={errors.confirmPassword?.message} {...register('confirmPassword')} />
      </div>

      <div className="space-y-1.5">
        <Label className="flex items-center gap-2 cursor-pointer">
          <Checkbox id="agreeTerms" {...register('agreeTerms')} />
          <span className="text-sm text-muted-foreground">
            I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>
          </span>
        </Label>
        {errors.agreeTerms && <p className="text-sm text-red-500">{errors.agreeTerms.message}</p>}
      </div>

      <Button type="submit" className="w-full" shimmer>
        Create Account
      </Button>
    </form>
  );
};