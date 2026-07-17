import { motion } from 'framer-motion';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { LoginForm } from './components/LoginForm';
import { APP_NAME, APP_TAGLINE } from '@/constants/app.constants';

export const LoginPage = () => {
  return (
    <AuthLayout>
      <motion.div
        className="login-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="login-card__header">
          <motion.div
            className="login-card__logo"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.4 }}
          >
            <svg width="56" height="56" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="8" y="20" width="64" height="36" rx="8" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="2.5"/>
              <rect x="8" y="20" width="64" height="14" rx="4" fill="currentColor" fillOpacity="0.08"/>
              <path d="M8 34H72" stroke="currentColor" strokeWidth="2"/>
              <circle cx="22" cy="60" r="7" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="2.5"/>
              <circle cx="58" cy="60" r="7" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="2.5"/>
              <circle cx="22" cy="60" r="2.5" fill="currentColor"/>
              <circle cx="58" cy="60" r="2.5" fill="currentColor"/>
              <rect x="14" y="26" width="13" height="9" rx="2" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5"/>
              <rect x="33.5" y="26" width="13" height="9" rx="2" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5"/>
              <rect x="53" y="26" width="13" height="9" rx="2" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M64 16L74 6H54L64 16Z" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
            </svg>
          </motion.div>

          <motion.h2
            className="login-card__title"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.4 }}
          >
            {APP_NAME}
          </motion.h2>

          <motion.p
            className="login-card__subtitle"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.4 }}
          >
            {APP_TAGLINE}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.4 }}
        >
          <LoginForm />
        </motion.div>

        <motion.p
          className="login-card__footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65, duration: 0.4 }}
        >
          &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
        </motion.p>
      </motion.div>
    </AuthLayout>
  );
};