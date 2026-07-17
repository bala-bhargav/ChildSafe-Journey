import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLogin } from '../hooks/useLogin';
import { loginSchema } from '../schemas/login.schema';
import { LoginRequest } from '../types';
import { Button } from '@/components/ui/Button';
import { FormField } from '@/components/ui/FormField';
import { Checkbox } from '@/components/ui/Checkbox';
import { Link } from '@/components/ui/Link';

export const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginRequest>({
    resolver: zodResolver(loginSchema),
  });
  
  const mutation = useLogin();

  const onSubmit = (data: LoginRequest) => {
    mutation.mutate(data);
  };

  return (
    <form className="w-full max-w-sm space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <FormField 
          label="Email or User ID" 
          {...register('email')} 
          error={errors.email?.message} 
        />
        
        <FormField 
          label="Password" 
          type="password"
          {...register('password')} 
          error={errors.password?.message} 
        />
      </div>
      
      <div className="flex items-center justify-between">
        <label className="flex items-center space-x-2 text-sm">
          <Checkbox id="remember" {...register('remember')} />
          <span className="text-muted-foreground">Remember me</span>
        </label>
        
        <Link href="/forgot-password" className="text-sm text-primary hover:underline">
          Forgot password?
        </Link>
      </div>
      
      <Button 
        type="submit" 
        className="w-full"
        loading={mutation.isPending}
        shimmer={mutation.isPending}
      >
        Sign in
      </Button>
      
      {mutation.isError && (
        <div className="text-center">
          <p className="text-sm text-red-500">{mutation.error.message}</p>
        </div>
      )}
    </form>
  );
};