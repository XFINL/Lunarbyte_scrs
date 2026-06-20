import type { ReactNode, CSSProperties } from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  style?: CSSProperties;
}

export default function GlassCard({ children, className, hover = true, style }: GlassCardProps) {
  return (
    <div
      style={style}
      className={cn(
        'rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-xl transition-all duration-300',
        hover && 'hover:scale-[1.02] hover:shadow-lg hover:shadow-black/10 dark:hover:shadow-white/5',
        className
      )}
    >
      {children}
    </div>
  );
}