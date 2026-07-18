'use client';

import { Toaster as SonnerToaster, type ToasterProps } from 'sonner';

export const Toaster = ({ ...props }: ToasterProps) => (
  <SonnerToaster
    position="top-right"
    theme="system"
    toastOptions={{
      style: {
        background: 'var(--background)',
        border: '1px solid var(--border)',
        color: 'var(--foreground)',
      },
    }}
    {...props}
  />
);