import { QueryProvider } from './QueryProvider';
import { AuthProvider } from '@/context/AuthContext';
import { Toaster } from '@/components/ui/feedback/Toast';
import { useToast } from '@/components/ui/feedback/useToast';
import { ReactNode } from 'react';

export { QueryProvider };
export { AuthProvider };
export { Toaster };
export { useToast };

export const AppProvidersInner = ({ children }: { children: ReactNode }) => (
  <QueryProvider>
    <AuthProvider>
      {children}
      <Toaster />
    </AuthProvider>
  </QueryProvider>
);