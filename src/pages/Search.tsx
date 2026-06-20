import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useStore } from '@/store';
import { categories } from '@/data/mock';
import SiteCard from '@/components/SiteCard';
import GlassCard from '@/components/GlassCard';
import SearchBar from '@/components/SearchBar';
import { cn } from '@/lib/utils';

export default function Search() {
  const [searchParams] = useSearchParams();
  const { searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, getFilteredSites } = useStore();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) {
      setSearchQuery(q);
    }
    setLoaded(true);
  }, [searchParams, setSearchQuery]);

  const results = getFilteredSites();

  return (
    <div className="space-y-8 pt-4">
      <div className="text-center space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold text-black dark:text-white">搜索站点</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">找到你需要的网站资源</p>
      </div>

      <SearchBar />

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 justify-center">
        <button
          onClick={() => setSelectedCategory(null)}
          className={cn(
            'px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 border',
            !selectedCategory
              ? 'bg-black/10 dark:bg-white/15 text-black dark:text-white border-black/20 dark:border-white/20'
              : 'bg-transparent text-gray-500 dark:text-gray-400 border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30'
          )}
        >
          全部
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={cn(
              'px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 border',
              selectedCategory === cat.id
                ? 'bg-black/10 dark:bg-white/15 text-black dark:text-white border-black/20 dark:border-white/20'
                : 'bg-transparent text-gray-500 dark:text-gray-400 border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30'
            )}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Results */}
      <div>
        {loaded && (
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">
            {searchQuery ? `搜索"${searchQuery}"` : '全部站点'} - 共 {results.length} 个结果
          </p>
        )}
        {results.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {results.map((site, i) => (
              <SiteCard key={site.id} site={site} index={i} />
            ))}
          </div>
        ) : (
          <GlassCard hover={false} className="p-12 text-center">
            <p className="text-gray-500 dark:text-gray-400 text-sm">没有找到匹配的站点</p>
            <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">试试其他关键词</p>
          </GlassCard>
        )}
      </div>
    </div>
  );
}