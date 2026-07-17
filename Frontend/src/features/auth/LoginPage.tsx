import { AuthLayout } from '@/components/layout/AuthLayout';
import { LoginForm } from './components/LoginForm';
import { Card, CardContent } from '@/components/ui/Card';
import { APP_NAME, APP_TAGLINE, ROUTES } from '@/constants/app.constants';

export const LoginPage = () => {
  return (
    <AuthLayout>
      <div className="w-full max-w-sm flex flex-col items-center text-center">
        <div className="mb-8">
          <svg width="64" height="64" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
            <rect x="8" y="24" width="64" height="32" rx="8" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2"/>
            <rect x="8" y="24" width="64" height="12" rx="4" fill="currentColor" fillOpacity="0.08"/>
            <path d="M8 36H72" stroke="currentColor" strokeWidth="2"/>
            <circle cx="22" cy="60" r="6" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2"/>
            <circle cx="58" cy="60" r="6" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2"/>
            <circle cx="22" cy="60" r="2" fill="currentColor"/>
            <circle cx="58" cy="60" r="2" fill="currentColor"/>
          </svg>
        </div>
        
        <h2 className="text-3xl font-bold text-foreground mb-2">{APP_NAME}</h2>
        <p className="text-muted-foreground mb-8">{APP_TAGLINE}</p>
        
        <Card className="w-full glass-card">
          <CardContent className="p-6">
            <LoginForm />
            
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{' '}
              <a href={ROUTES.REGISTER} className="text-primary font-medium hover:underline">
                Sign up
              </a>
            </p>
          </CardContent>
        </Card>
        
        <a href="/forgot-password" className="mt-6 text-sm text-primary hover:underline">
          Forgot password?
        </a>
        
        <p className="mt-8 text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
        </p>
      </div>
    </AuthLayout>
  );
};