import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import { useStore } from '@/store';
import { categories } from '@/data/mock';
import SiteCard from '@/components/SiteCard';
import GlassCard from '@/components/GlassCard';
import { cn } from '@/lib/utils';

const slides = [
  { title: '发现优质网站', subtitle: '精心收录各类优质网站，帮你找到更好的工具与资源' },
  { title: '效率提升利器', subtitle: '汇集最实用的效率工具，让工作事半功倍' },
  { title: '设计灵感源泉', subtitle: '探索优秀设计资源，激发你的创意灵感' },
];

const MAX_ROWS = 3;
const CARDS_PER_ROW_DESKTOP = 4;
const CARDS_PER_ROW_MOBILE = 2;
const MAX_CARDS = MAX_ROWS * CARDS_PER_ROW_DESKTOP; // 12

export default function Home() {
  const navigate = useNavigate();
  const [slideIndex, setSlideIndex] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const { getSitesByCategory } = useStore();

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((i) => (i + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchValue.trim())}`);
    }
  }, [searchValue, navigate]);

  return (
    <div className="space-y-12 pb-8">
      {/* Slideshow with centered search */}
      <section className="relative -mx-4 md:-mx-8 -mt-6 md:-mt-24 h-[60vh] md:h-[70vh] min-h-[400px] md:min-h-[500px] overflow-hidden">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={cn(
              'absolute inset-0 transition-opacity duration-1000',
              i === slideIndex ? 'opacity-100' : 'opacity-0'
            )}
          >
            {/* Slide background */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 dark:from-[#1a1a1a] dark:via-[#0d0d0d] dark:to-[#000000]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.05)_0%,transparent_70%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.03)_0%,transparent_70%)]" />
            {/* Decorative elements */}
            <div className="absolute top-20 left-10 w-64 h-64 border border-black/5 dark:border-white/5 rounded-full" />
            <div className="absolute bottom-20 right-10 w-96 h-96 border border-black/5 dark:border-white/5 rounded-full" />
          </div>
        ))}

        {/* Content overlay */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
          <div className="text-center mb-8 space-y-4 max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold text-black dark:text-white tracking-tight">
              {slides[slideIndex].title}
            </h1>
            <p className="text-base md:text-lg text-gray-500 dark:text-gray-400">
              {slides[slideIndex].subtitle}
            </p>
          </div>

          {/* Search form */}
          <form onSubmit={handleSearch} className="w-full max-w-xl">
            <div className="relative flex items-center">
              <Search size={18} className="absolute left-4 text-gray-400 dark:text-gray-500 pointer-events-none" />
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="搜索你想要的网站..."
                className="w-full h-12 md:h-14 pl-11 pr-4 rounded-2xl
                  bg-white/80 dark:bg-white/10 backdrop-blur-2xl
                  border border-black/10 dark:border-white/10
                  text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500
                  outline-none transition-all duration-300
                  focus:border-black/30 dark:focus:border-white/30 focus:shadow-lg
                  text-sm md:text-base"
              />
            </div>
          </form>

          {/* Slide indicators */}
          <div className="flex gap-2 mt-8">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlideIndex(i)}
                className={cn(
                  'h-1.5 rounded-full transition-all duration-300',
                  i === slideIndex
                    ? 'w-8 bg-black/60 dark:bg-white/60'
                    : 'w-1.5 bg-black/20 dark:bg-white/20 hover:bg-black/40 dark:hover:bg-white/40'
                )}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Category sections */}
      {categories.map((category) => {
        const categorySites = getSitesByCategory(category.id);
        if (categorySites.length === 0) return null;

        const displaySites = categorySites.slice(0, MAX_CARDS);
        const hasMore = categorySites.length > MAX_CARDS;

        return (
          <section key={category.id}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <h2 className="text-lg md:text-xl font-bold text-black dark:text-white">
                  {category.name}
                </h2>
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  {categorySites.length} 个站点
                </span>
              </div>
              <a
                href={`/category/${category.id}`}
                className="flex items-center gap-1 text-xs md:text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
              >
                查看更多 <ArrowRight size={12} />
              </a>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">{category.description}</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {displaySites.map((site, i) => (
                <SiteCard key={site.id} site={site} index={i} />
              ))}
            </div>

            {hasMore && (
              <div className="mt-5 text-center">
                <a
                  href={`/category/${category.id}`}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl
                    border border-black/10 dark:border-white/10
                    text-sm text-gray-600 dark:text-gray-300
                    hover:bg-black/5 dark:hover:bg-white/5
                    transition-all duration-200"
                >
                  查看更多 <ArrowRight size={14} />
                </a>
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}