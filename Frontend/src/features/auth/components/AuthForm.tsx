'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { LogIn, UserPlus, Eye, EyeOff, Mail, Lock, Phone, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/primitives/Button';
import { Input } from '@/components/ui/primitives/Input';
import { Label } from '@/components/ui/primitives/Label';
import { Checkbox } from '@/components/ui/primitives/Checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/primitives/Select';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/feedback/useToast';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  remember: z.boolean().optional(),
});

const registerSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  role: z.enum(['parent_student', 'driver', 'admin']),
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits'),
  agreeTerms: z.boolean().refine(val => val === true, 'You must agree to the terms'),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

type AuthMode = 'login' | 'register';

const ROLE_OPTIONS = [
  { value: 'parent_student', label: 'Parent / Guardian' },
  { value: 'driver', label: 'Bus Driver' },
  { value: 'admin', label: 'School Admin' },
];

const ICON_SIZE = 18;

export const AuthForm = () => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [showPassword, setShowPassword] = useState(false);
  const { login, register, isLoading } = useAuth();
  const { success, error } = useToast();

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: { remember: false },
  });

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
    defaultValues: { role: 'parent_student' },
  });

  const handleLogin = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password);
      success('Welcome back!', { description: 'You have been logged in successfully.' });
    } catch (err: any) {
      error('Login failed', { description: err.response?.data?.message || 'Invalid credentials' });
    }
  };

  const handleRegister = async (data: RegisterFormData) => {
    try {
      await register({
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        password: data.password,
        role: data.role,
        phoneNumber: data.phoneNumber,
      });
      success('Account created!', { description: 'Welcome to ChildSafe Journey.' });
    } catch (err: any) {
      error('Registration failed', { description: err.response?.data?.message || 'Please try again' });
    }
  };

  const toggleMode = () => {
    setMode(m => m === 'login' ? 'register' : 'login');
    loginForm.reset();
    registerForm.reset();
    setShowPassword(false);
  };

  return (
    <form onSubmit={mode === 'login' ? loginForm.handleSubmit(handleLogin) : registerForm.handleSubmit(handleRegister)}>
      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          <motion.h3
            className="text-xl font-semibold text-center mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {mode === 'login' ? 'Welcome back' : 'Create your account'}
          </motion.h3>

          {mode === 'login' ? (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={ICON_SIZE} />
                  <Input
                    id="email"
                    type="email"
                    placeholder="parent@school.edu"
                    className="pl-10"
                    error={loginForm.formState.errors.email?.message}
                    {...loginForm.register('email')}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <a href="/forgot-password" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={ICON_SIZE} />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                    error={loginForm.formState.errors.password?.message}
                    {...loginForm.register('password')}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={ICON_SIZE} /> : <Eye size={ICON_SIZE} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <Checkbox id="remember" {...loginForm.register('remember')} />
                  <span className="text-muted-foreground">Remember me</span>
                </label>
              </div>

              <Button
                type="submit"
                className="w-full"
                loading={isLoading}
                size="lg"
              >
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
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
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={ICON_SIZE} />
                  <Input
                    id="email"
                    type="email"
                    placeholder="parent@school.edu"
                    className="pl-10"
                    error={registerForm.formState.errors.email?.message}
                    {...registerForm.register('email')}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={ICON_SIZE} />
                  <Input
                    id="phoneNumber"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    className="pl-10"
                    error={registerForm.formState.errors.phoneNumber?.message}
                    {...registerForm.register('phoneNumber')}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="role">I am a</Label>
                <Controller
                  name="role"
                  control={registerForm.control}
                  rules={{ required: 'Please select a role' }}
                  render={({ field }) => (
                    <Select {...field} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        {ROLE_OPTIONS.map(role => (
                          <SelectItem key={role.value} value={role.value}>
                            {role.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {registerForm.formState.errors.role && (
                  <p className="text-sm text-destructive">{registerForm.formState.errors.role.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <span className="text-xs text-muted-foreground">At least 8 characters</span>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={ICON_SIZE} />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                    error={registerForm.formState.errors.password?.message}
                    {...registerForm.register('password')}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={ICON_SIZE} /> : <Eye size={ICON_SIZE} />}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={ICON_SIZE} />
                  <Input
                    id="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="pl-10"
                    error={registerForm.formState.errors.confirmPassword?.message}
                    {...registerForm.register('confirmPassword')}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="flex items-start gap-2 cursor-pointer">
                  <Checkbox id="agreeTerms" {...registerForm.register('agreeTerms')} />
                  <span className="text-sm text-muted-foreground mt-0.5">
                    I agree to the{' '}
                    <a href="#" className="text-primary hover:underline">Terms of Service</a>{' '}
                    and{' '}
                    <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                  </span>
                </label>
                {registerForm.formState.errors.agreeTerms && (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    <AlertCircle size={14} />
                    {registerForm.formState.errors.agreeTerms.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full"
                loading={isLoading}
                size="lg"
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Create Account
              </Button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <motion.p
        className="text-center text-sm text-muted-foreground mt-6"
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
              className="text-primary font-medium hover:underline"
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
              className="text-primary font-medium hover:underline"
            >
              Sign in
            </button>
          </>
        )}
      </motion.p>
    </form>
  );
};