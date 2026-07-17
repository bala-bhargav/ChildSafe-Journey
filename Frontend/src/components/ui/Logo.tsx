import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export const Logo = ({ size = 48, className }: { size?: number; className?: string }) => (
  <motion.div
    className={cn('text-primary', className)}
    initial={{ y: 0 }}
    animate={{ y: [0, -5, 0] }}
    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
  >
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M19 16H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2Z"/>
      <path d="M3 11h18"/>
      <circle cx="7" cy="13" r="1"/>
      <circle cx="17" cy="13" r="1"/>
    </svg>
  </motion.div>
);
