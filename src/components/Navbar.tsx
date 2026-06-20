import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Grid3X3, PlusSquare, Settings, Moon, Sun } from 'lucide-react';
import { useStore } from '@/store';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/', label: '首页', icon: Home },
  { path: '/search', label: '搜索', icon: Search },
  { path: '/categories', label: '分类', icon: Grid3X3 },
  { path: '/submit', label: '提交', icon: PlusSquare },
  { path: '/admin', label: '管理', icon: Settings },
];

export default function Navbar() {
  const location = useLocation();
  const { theme, toggleTheme } = useStore();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Desktop navbar - floating on top */}
      <nav
        className={cn(
          'hidden md:flex fixed top-0 left-1/2 -translate-x-1/2 z-50 mt-4',
          'rounded-2xl px-2 py-1.5',
          'bg-white/10 dark:bg-white/5 backdrop-blur-2xl',
          'border border-white/20 dark:border-white/10 border-black/10',
          'shadow-2xl shadow-black/10',
          'transition-all duration-300',
          scrolled && 'mt-2 shadow-lg shadow-cyan-500/5'
        )}
      >
        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = item.path === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(item.path);
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-white/20 dark:bg-white/15 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/10 dark:hover:bg-white/10'
                )}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
          <button
            onClick={toggleTheme}
            className="ml-2 p-2 rounded-xl text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/10 dark:hover:bg-white/10 transition-all duration-200"
            aria-label="切换主题"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile navbar - fixed at bottom */}
      <nav
        className={cn(
          'md:hidden fixed bottom-0 left-0 right-0 z-50',
          'px-3 py-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))]',
          'bg-white/10 dark:bg-white/5 backdrop-blur-2xl',
          'border-t border-white/20 dark:border-white/10 border-black/10'
        )}
      >
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const isActive = item.path === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(item.path);
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200 min-w-[56px]',
                  isActive
                    ? 'text-gray-900 dark:text-white'
                    : 'text-gray-400 dark:text-gray-500'
                )}
              >
                <div className={cn(
                  'p-1.5 rounded-lg transition-all duration-200',
                  isActive && 'bg-white/20 dark:bg-white/15'
                )}>
                  <Icon size={20} />
                </div>
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
          <button
            onClick={toggleTheme}
            className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl text-gray-400 dark:text-gray-500 min-w-[56px]"
            aria-label="切换主题"
          >
            <div className="p-1.5 rounded-lg">
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </div>
            <span className="text-[10px] font-medium">主题</span>
          </button>
        </div>
      </nav>
    </>
  );
}