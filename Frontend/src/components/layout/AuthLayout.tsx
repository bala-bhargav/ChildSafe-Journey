import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { APP_NAME } from '@/constants/app.constants';

interface AuthLayoutProps {
  children: ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      {/* Branded Panel */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-indigo-600 via-sky-500 to-emerald-500 items-center justify-center p-12 relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 opacity-20"
          animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
          transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
        />
        <motion.div 
          className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-pulse"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        />
        <motion.div 
          className="absolute top-3/4 right-1/4 w-3 h-3 bg-white rounded-full animate-pulse"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        />
        <motion.div 
          className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-white rounded-full animate-pulse"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        />
        
        <motion.div 
          className="text-white text-center z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="mb-6"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="8" y="24" width="64" height="32" rx="8" fill="white" fillOpacity="0.2" stroke="white" strokeWidth="2"/>
              <rect x="8" y="24" width="64" height="12" rx="4" fill="white" fillOpacity="0.1"/>
              <path d="M8 36H72" stroke="white" strokeWidth="2"/>
              <circle cx="22" cy="60" r="6" fill="white" fillOpacity="0.3" stroke="white" strokeWidth="2"/>
              <circle cx="58" cy="60" r="6" fill="white" fillOpacity="0.3" stroke="white" strokeWidth="2"/>
              <circle cx="22" cy="60" r="2" fill="white"/>
              <circle cx="58" cy="60" r="2" fill="white"/>
              <rect x="14" y="30" width="12" height="8" rx="2" fill="white" fillOpacity="0.3" stroke="white" strokeWidth="1"/>
              <rect x="30" y="30" width="12" height="8" rx="2" fill="white" fillOpacity="0.3" stroke="white" strokeWidth="1"/>
              <rect x="46" y="30" width="12" height="8" rx="2" fill="white" fillOpacity="0.3" stroke="white" strokeWidth="1"/>
              <path d="M64 28L72 20H56L64 28Z" fill="white" fillOpacity="0.4"/>
            </svg>
          </motion.div>
          
          <motion.h1 
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {APP_NAME}
          </motion.h1>
          
          <motion.p 
            className="text-lg opacity-90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Secure Student Transportation Management
          </motion.p>
        </motion.div>
      </div>
      
      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        {children}
      </div>
    </div>
  );
};