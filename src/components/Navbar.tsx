import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useStore } from '@/store';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const location = useLocation();
  const { theme, toggleTheme, searchFocused } = useStore();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Desktop - truly floating bar with high rounded corners */}
      <nav
        className={cn(
          'hidden md:block fixed top-0 left-1/2 -translate-x-1/2 z-50 mt-6',
          'transition-all duration-300',
          searchFocused && 'opacity-0 -translate-y-6 pointer-events-none'
        )}
      >
        <div
          className={cn(
            'flex items-center gap-1 px-3 py-2',
            'rounded-[28px]',
            'bg-white/5 backdrop-blur-2xl',
            'border border-white/10',
            'shadow-[0_8px_32px_rgba(0,0,0,0.08)]',
            'transition-all duration-300',
            scrolled && 'shadow-[0_8px_40px_rgba(0,0,0,0.12)]'
          )}
        >
          <Link
            to="/"
            className={cn(
              'px-5 py-2 rounded-2xl text-sm font-medium transition-all duration-200',
              location.pathname === '/'
                ? 'bg-black/10 dark:bg-white/15 text-black dark:text-white'
                : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10'
            )}
          >
            首页
          </Link>
          <Link
            to="/submit"
            className={cn(
              'px-5 py-2 rounded-2xl text-sm font-medium transition-all duration-200',
              location.pathname === '/submit'
                ? 'bg-black/10 dark:bg-white/15 text-black dark:text-white'
                : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10'
            )}
          >
            提交
          </Link>
          <div className="mx-2 w-px h-5 bg-black/10 dark:bg-white/10" />
          <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded-2xl text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-200"
          >
            {theme === 'dark' ? '明亮' : '暗色'}
          </button>
        </div>
      </nav>

      {/* Mobile - floating above bottom edge with rounded corners */}
      <nav
        className={cn(
          'md:hidden fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-3',
          'transition-all duration-300',
          searchFocused && 'translate-y-full opacity-0'
        )}
      >
        <div
          className={cn(
            'flex items-center justify-around px-4 py-2',
            'rounded-[28px] mx-3 w-full max-w-sm',
            'bg-white/5 backdrop-blur-2xl',
            'border border-white/10',
            'shadow-[0_-4px_24px_rgba(0,0,0,0.06)]'
          )}
        >
          <Link
            to="/"
            className={cn(
              'flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-2xl transition-all duration-200 min-w-[60px]',
              location.pathname === '/' ? 'text-black dark:text-white' : 'text-gray-400 dark:text-gray-500'
            )}
          >
            <div className={cn('p-1.5 rounded-xl', location.pathname === '/' && 'bg-black/10 dark:bg-white/15')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            </div>
            <span className="text-[10px] font-medium">首页</span>
          </Link>
          <Link
            to="/submit"
            className={cn(
              'flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-2xl transition-all duration-200 min-w-[60px]',
              location.pathname === '/submit' ? 'text-black dark:text-white' : 'text-gray-400 dark:text-gray-500'
            )}
          >
            <div className={cn('p-1.5 rounded-xl', location.pathname === '/submit' && 'bg-black/10 dark:bg-white/15')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
            </div>
            <span className="text-[10px] font-medium">提交</span>
          </Link>
          <button
            onClick={toggleTheme}
            className="flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-2xl min-w-[60px] text-gray-400 dark:text-gray-500"
          >
            <div className="p-1.5 rounded-xl">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
            </div>
            <span className="text-[10px] font-medium">{theme === 'dark' ? '明亮' : '暗色'}</span>
          </button>
        </div>
      </nav>
    </>
  );
}