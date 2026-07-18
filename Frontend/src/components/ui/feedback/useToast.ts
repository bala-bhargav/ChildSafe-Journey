'use client';

import { toast } from 'sonner';

type ToastType = 'success' | 'error' | 'info' | 'warning' | 'loading';

interface CustomToastOptions {
  description?: string;
  action?: { label: string; onClick: () => void };
  duration?: number;
}

export const useToast = () => {
  const notify = (type: ToastType, message: string, options?: CustomToastOptions) => {
    return toast[type](message, {
      description: options?.description,
      action: options?.action,
      duration: options?.duration,
    });
  };

  return {
    success: (message: string, options?: CustomToastOptions) => notify('success', message, options),
    error: (message: string, options?: CustomToastOptions) => notify('error', message, options),
    info: (message: string, options?: CustomToastOptions) => notify('info', message, options),
    warning: (message: string, options?: CustomToastOptions) => notify('warning', message, options),
    loading: (message: string, options?: CustomToastOptions) => notify('loading', message, options),
    dismiss: toast.dismiss,
  };
};