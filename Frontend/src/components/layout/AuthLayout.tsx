import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { APP_NAME } from '@/constants/app.constants';

interface AuthLayoutProps {
  children: ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="auth-layout">
      <div className="auth-layout__branded-panel auth-gradient">
        <div className="floating-dot floating-dot-1" />
        <div className="floating-dot floating-dot-2" />
        <div className="floating-dot floating-dot-3" />
        <div className="floating-dot floating-dot-4" />
        
        <motion.div 
          className="auth-layout__branded-content"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div 
            className="bus-illustration"
            initial={{ y: 0 }}
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
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
            className="auth-layout__branded-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {APP_NAME}
          </motion.h1>
          
          <motion.p 
            className="auth-layout__branded-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Secure Student Transportation Management
          </motion.p>

          <motion.div 
            className="auth-layout__feature-list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <div className="auth-layout__feature-item">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="white" strokeWidth="1.5" fillOpacity="0.3"/>
                <path d="M5 8L7 10L11 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Real-time GPS Tracking</span>
            </div>
            <div className="auth-layout__feature-item">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="white" strokeWidth="1.5" fillOpacity="0.3"/>
                <path d="M5 8L7 10L11 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Attendance Management</span>
            </div>
            <div className="auth-layout__feature-item">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="white" strokeWidth="1.5" fillOpacity="0.3"/>
                <path d="M5 8L7 10L11 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Instant Notifications</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="auth-layout__content-panel">
        <div className="auth-layout__mobile-header">
          <motion.div 
            className="bus-illustration"
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
          >
            <svg width="44" height="44" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="8" y="24" width="64" height="32" rx="8" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="2"/>
              <rect x="8" y="24" width="64" height="12" rx="4" fill="currentColor" fillOpacity="0.1"/>
              <path d="M8 36H72" stroke="currentColor" strokeWidth="2"/>
              <circle cx="22" cy="60" r="6" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="2"/>
              <circle cx="58" cy="60" r="6" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="2"/>
              <circle cx="22" cy="60" r="2" fill="currentColor"/>
              <circle cx="58" cy="60" r="2" fill="currentColor"/>
            </svg>
          </motion.div>
        </div>
        {children}
      </div>
    </div>
  );
};