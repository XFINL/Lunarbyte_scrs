import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useStore } from '@/store';
import { categories } from '@/data/mock';
import SiteCard from '@/components/SiteCard';
import GlassCard from '@/components/GlassCard';

export default function CategoryDetail() {
  const { id } = useParams<{ id: string }>();
  const { getSitesByCategory } = useStore();
  const category = categories.find((c) => c.id === id);
  const sites = getSitesByCategory(id || '');

  if (!category) {
    return (
      <GlassCard hover={false} className="p-12 text-center mt-8">
        <p className="text-gray-500 dark:text-gray-400">分类未找到</p>
        <Link to="/" className="text-black dark:text-white text-sm mt-2 inline-block hover:opacity-60">
          返回首页
        </Link>
      </GlassCard>
    );
  }

  return (
    <div className="space-y-8 pt-4">
      <div className="flex items-center gap-4">
        <Link
          to="/"
          className="p-2 rounded-xl bg-black/5 dark:bg-white/10 text-gray-400 hover:text-black dark:hover:text-white transition-colors"
        >
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-black dark:text-white">{category.name}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{category.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {sites.map((site, i) => (
          <SiteCard key={site.id} site={site} index={i} />
        ))}
      </div>

      {sites.length === 0 && (
        <GlassCard hover={false} className="p-12 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">该分类暂无站点</p>
        </GlassCard>
      )}
    </div>
  );
}