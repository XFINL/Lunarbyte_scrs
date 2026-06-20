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
        'rounded-2xl border border-white/10 dark:border-white/10 border-black/5 bg-white/5 dark:bg-white/5 bg-white/70 backdrop-blur-xl transition-all duration-300',
        hover && 'hover:scale-[1.02] hover:shadow-xl hover:shadow-cyan-500/10 hover:border-cyan-400/30',
        className
      )}
    >
      {children}
    </div>
  );
}