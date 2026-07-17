import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Checkbox } from '@/components/ui/Checkbox';
import { motion, AnimatePresence } from 'framer-motion';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  remember: z.boolean().optional(),
});

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

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

type AuthMode = 'login' | 'register';

export const AuthForm = () => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: { role: 'parent' },
  });

  const handleSubmit = (data: LoginFormData | RegisterFormData) => {
    setIsSubmitting(true);
    console.log(`${mode} submit:`, data);
    setTimeout(() => setIsSubmitting(false), 1500);
  };

  const toggleMode = () => {
    setMode(m => m === 'login' ? 'register' : 'login');
    loginForm.reset();
    registerForm.reset();
  };

  return (
    <div className="space-y-5">
      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <h3 className="text-xl font-semibold mb-6 text-center">
            {mode === 'login' ? 'Welcome back' : 'Create your account'}
          </h3>
          
          {mode === 'login' ? (
            <form onSubmit={loginForm.handleSubmit(handleSubmit)} className="space-y-5">
              <div className="space-y-1.5">
                <Label htmlFor="email">Email or User ID</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@school.edu"
                  error={loginForm.formState.errors.email?.message}
                  {...loginForm.register('email')}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  error={loginForm.formState.errors.password?.message}
                  {...loginForm.register('password')}
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <Checkbox id="remember" {...loginForm.register('remember')} />
                  <span className="text-muted-foreground">Remember me</span>
                </label>
                <a href="/forgot-password" className="text-sm text-primary hover:underline transition-colors">
                  Forgot password?
                </a>
              </div>

              <Button type="submit" className="w-full" loading={isSubmitting} shimmer={isSubmitting}>
                Sign in
              </Button>
            </form>
          ) : (
            <form onSubmit={registerForm.handleSubmit(handleSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    error={registerForm.formState.errors.firstName?.message}
                    {...registerForm.register('firstName')}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    error={registerForm.formState.errors.lastName?.message}
                    {...registerForm.register('lastName')}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="parent@school.edu"
                  error={registerForm.formState.errors.email?.message}
                  {...registerForm.register('email')}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="role">I am a</Label>
                <select
                  id="role"
                  className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  {...registerForm.register('role')}
                >
                  <option value="parent">Parent / Guardian</option>
                  <option value="driver">Bus Driver</option>
                  <option value="admin">School Admin</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  error={registerForm.formState.errors.password?.message}
                  {...registerForm.register('password')}
                />
                <p className="text-xs text-muted-foreground">At least 8 characters</p>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  error={registerForm.formState.errors.confirmPassword?.message}
                  {...registerForm.register('confirmPassword')}
                />
              </div>

              <div className="space-y-1.5">
                <Label className="flex items-start gap-2 cursor-pointer">
                  <Checkbox id="agreeTerms" {...registerForm.register('agreeTerms')} />
                  <span className="text-sm text-muted-foreground mt-0.5">
                    I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                  </span>
                </Label>
                {registerForm.formState.errors.agreeTerms && (
                  <p className="text-sm text-red-500">{registerForm.formState.errors.agreeTerms.message}</p>
                )}
              </div>

              <Button type="submit" className="w-full" loading={isSubmitting} shimmer={isSubmitting}>
                Create Account
              </Button>
            </form>
          )}
        </motion.div>
      </AnimatePresence>

      <motion.p
        className="text-center text-sm text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {mode === 'login' ? (
          <>
            Don&apos;t have an account?{' '}
            <button
              type="button"
              onClick={toggleMode}
              className="text-primary font-medium hover:underline transition-colors"
            >
              Sign up
            </button>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <button
              type="button"
              onClick={toggleMode}
              className="text-primary font-medium hover:underline transition-colors"
            >
              Sign in
            </button>
          </>
        )}
      </motion.p>
    </div>
  );
};