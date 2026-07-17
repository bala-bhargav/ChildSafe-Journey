import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLogin } from '../hooks/useLogin';
import { loginSchema } from '../schemas/login.schema';
import { LoginRequest } from '../types';
import { Loader2 } from 'lucide-react';

export const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginRequest>({
    resolver: zodResolver(loginSchema),
  });
  
  const mutation = useLogin();

  const onSubmit = (data: LoginRequest) => {
    mutation.mutate(data);
  };

  return (
    <form className="login-card__form" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email" className="label-field">Email or User ID</label>
        <input
          id="email"
          type="text"
          autoComplete="email"
          placeholder="name@school.edu"
          className={`input-field${errors.email ? ' input-field-error' : ''}`}
          {...register('email')}
        />
        {errors.email && (
          <p className="error-message" role="alert">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="label-field">Password</label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          placeholder="Enter your password"
          className={`input-field${errors.password ? ' input-field-error' : ''}`}
          {...register('password')}
        />
        {errors.password && (
          <p className="error-message" role="alert">{errors.password.message}</p>
        )}
      </div>

      <div className="login-card__form-row">
        <label className="login-card__remember">
          <input type="checkbox" {...register('remember')} />
          <span>Remember me</span>
        </label>
        <a href="/forgot-password" className="link-text">Forgot password?</a>
      </div>

      <button
        type="submit"
        className="btn-primary"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? (
          <>
            <Loader2 className="btn-primary__spinner" />
            Signing in...
          </>
        ) : (
          'Sign in'
        )}
      </button>

      {mutation.isError && (
        <p className="error-message login-card__error" role="alert">
          {mutation.error.message}
        </p>
      )}
    </form>
  );
};