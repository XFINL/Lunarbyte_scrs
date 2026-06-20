import { Link } from 'react-router-dom';
import { Search, ArrowRight, Globe, Layers, TrendingUp } from 'lucide-react';
import { useStore } from '@/store';
import SiteCard from '@/components/SiteCard';
import CategoryCard from '@/components/CategoryCard';
import GlassCard from '@/components/GlassCard';
import { cn } from '@/lib/utils';

export default function Home() {
  const { categories, sites } = useStore();
  const recommendedSites = sites.filter((s) => s.isRecommended && s.status === 'approved').slice(0, 12);

  const stats = [
    { label: '收录站点', value: sites.filter(s => s.status === 'approved').length, icon: Globe, color: 'text-cyan-400' },
    { label: '分类数量', value: categories.length, icon: Layers, color: 'text-purple-400' },
    { label: '今日新增', value: sites.filter(s => s.createdAt === '2025-01-15').length, icon: TrendingUp, color: 'text-green-400' },
  ];

  return (
    <div className="space-y-16 pb-8">
      {/* Hero */}
      <section className="text-center pt-8 md:pt-16 pb-4">
        <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 text-xs text-gray-500 dark:text-gray-400">
          ✨ 发现优质网站 · 高效导航
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
          探索互联网的精彩
        </h1>
        <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 mb-8 max-w-lg mx-auto">
          精心收录各类优质网站，帮你发现更好的工具、资源和灵感
        </p>

        <Link
          to="/search"
          className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl
            bg-white/10 dark:bg-white/5 backdrop-blur-xl
            border border-white/20 dark:border-white/10 border-black/10
            text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white
            hover:border-cyan-400/30 hover:shadow-lg hover:shadow-cyan-500/10
            transition-all duration-300 group w-full max-w-md"
        >
          <Search size={18} className="text-gray-400 dark:text-gray-500" />
          <span className="flex-1 text-left text-sm">搜索你想要的网站...</span>
          <kbd className="hidden md:inline text-[10px] px-1.5 py-0.5 rounded bg-white/20 dark:bg-white/10 text-gray-400">
            ⌘K
          </kbd>
        </Link>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <GlassCard key={stat.label} hover={false} className="p-4 text-center">
              <Icon size={20} className={cn('mx-auto mb-1', stat.color)} />
              <div className="text-xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
              <div className="text-[10px] text-gray-400 dark:text-gray-500">{stat.label}</div>
            </GlassCard>
          );
        })}
      </section>

      {/* Hot Categories */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">热门分类</h2>
          <Link
            to="/categories"
            className="flex items-center gap-1 text-sm text-cyan-500 hover:text-cyan-400 transition-colors"
          >
            查看全部 <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.slice(0, 8).map((cat, i) => (
            <CategoryCard key={cat.id} category={cat} index={i} />
          ))}
        </div>
      </section>

      {/* Recommended Sites */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">推荐站点</h2>
          <Link
            to="/search"
            className="flex items-center gap-1 text-sm text-cyan-500 hover:text-cyan-400 transition-colors"
          >
            浏览更多 <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {recommendedSites.map((site, i) => (
            <SiteCard key={site.id} site={site} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}