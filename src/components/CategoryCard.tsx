import { Link } from 'react-router-dom';
import type { Category } from '@/types';
import GlassCard from './GlassCard';
import { cn } from '@/lib/utils';

interface CategoryCardProps {
  category: Category;
  index?: number;
}

export default function CategoryCard({ category, index = 0 }: CategoryCardProps) {
  return (
    <Link to={`/category/${category.id}`}>
      <GlassCard
        className={cn(
          'p-6 flex flex-col items-center text-center cursor-pointer group',
          'animate-[fadeInUp_0.5s_ease-out_both]'
        )}
        style={{ animationDelay: `${index * 0.05}s` } as React.CSSProperties}
      >
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-3 transition-transform group-hover:scale-110"
          style={{ backgroundColor: `${category.color}20` }}
        >
          {category.icon}
        </div>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-cyan-400 transition-colors">
          {category.name}
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 line-clamp-1">
          {category.description}
        </p>
        <span className="text-[10px] px-3 py-1 rounded-full bg-white/20 dark:bg-white/10 text-gray-500 dark:text-gray-400">
          {category.siteCount} 个站点
        </span>
      </GlassCard>
    </Link>
  );
}