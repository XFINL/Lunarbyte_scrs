import { Link } from 'react-router-dom';
import type { Site } from '@/types';
import { ExternalLink, Eye } from 'lucide-react';
import GlassCard from './GlassCard';
import { cn } from '@/lib/utils';

interface SiteCardProps {
  site: Site;
  index?: number;
}

export default function SiteCard({ site, index = 0 }: SiteCardProps) {
  return (
    <Link to={`/detail/${site.id}`}>
      <GlassCard
        className={cn(
          'p-5 h-full flex flex-col cursor-pointer group',
          'animate-[fadeInUp_0.5s_ease-out_both]'
        )}
        style={{ animationDelay: `${index * 0.05}s` } as React.CSSProperties}
      >
        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 dark:bg-white/10 p-2 flex items-center justify-center shrink-0 overflow-hidden">
            <img
              src={site.logo}
              alt={site.name}
              className="w-6 h-6 object-contain"
              loading="lazy"
              onError={(e) => { (e.target as HTMLImageElement).src = 'https://www.google.com/s2/favicons?domain=example.com&sz=64'; }}
            />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm truncate group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors">
              {site.name}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2 leading-relaxed">
              {site.description}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {site.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 dark:bg-white/10 text-gray-600 dark:text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/10 dark:border-white/5 border-black/5">
          <div className="flex items-center gap-1 text-[10px] text-gray-400 dark:text-gray-500">
            <Eye size={12} />
            <span>{site.visitCount.toLocaleString()}</span>
          </div>
          <ExternalLink size={12} className="text-gray-400 dark:text-gray-500 group-hover:text-cyan-400 transition-colors" />
        </div>
      </GlassCard>
    </Link>
  );
}