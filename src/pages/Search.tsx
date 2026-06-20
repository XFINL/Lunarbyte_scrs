import { useStore } from '@/store';
import { categories } from '@/data/mock';
import SearchBar from '@/components/SearchBar';
import SiteCard from '@/components/SiteCard';
import GlassCard from '@/components/GlassCard';
import { cn } from '@/lib/utils';

export default function Search() {
  const { searchQuery, setSelectedCategory, selectedCategory, getFilteredSites } = useStore();
  const results = getFilteredSites();

  return (
    <div className="space-y-8 pt-4">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">搜索站点</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">找到你需要的网站资源</p>
      </div>

      <SearchBar />

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 justify-center">
        <button
          onClick={() => setSelectedCategory(null)}
          className={cn(
            'px-4 py-1.5 rounded-xl text-xs font-medium transition-all duration-200',
            !selectedCategory
              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-400/30'
              : 'bg-white/10 dark:bg-white/5 text-gray-500 dark:text-gray-400 border border-white/20 dark:border-white/10 hover:border-cyan-400/30'
          )}
        >
          全部
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={cn(
              'px-4 py-1.5 rounded-xl text-xs font-medium transition-all duration-200',
              selectedCategory === cat.id
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-400/30'
                : 'bg-white/10 dark:bg-white/5 text-gray-500 dark:text-gray-400 border border-white/20 dark:border-white/10 hover:border-cyan-400/30'
            )}
          >
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>

      {/* Results */}
      <div>
        <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">
          {searchQuery ? `搜索 "${searchQuery}"` : '全部站点'} · 共 {results.length} 个结果
        </p>
        {results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {results.map((site, i) => (
              <SiteCard key={site.id} site={site} index={i} />
            ))}
          </div>
        ) : (
          <GlassCard hover={false} className="p-12 text-center">
            <div className="text-4xl mb-3">🔍</div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">没有找到匹配的站点</p>
            <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">试试其他关键词</p>
          </GlassCard>
        )}
      </div>
    </div>
  );
}