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
        <p className="text-gray-400">分类未找到</p>
        <Link to="/categories" className="text-cyan-400 text-sm mt-2 inline-block hover:underline">
          返回分类列表
        </Link>
      </GlassCard>
    );
  }

  return (
    <div className="space-y-8 pt-4">
      <div className="flex items-center gap-4">
        <Link
          to="/categories"
          className="p-2 rounded-xl bg-white/10 dark:bg-white/5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        >
          <ArrowLeft size={18} />
        </Link>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{category.icon}</span>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{category.name}</h1>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{category.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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