import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useStore } from '@/store';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const location = useLocation();
  const { theme, toggleTheme, language, toggleLanguage, searchFocused } = useStore();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Desktop navbar */}
      <nav
        className={cn(
          'hidden md:flex fixed top-0 left-1/2 -translate-x-1/2 z-50 mt-4',
          'rounded-2xl px-2 py-1.5',
          'bg-white/10 dark:bg-white/5 backdrop-blur-2xl',
          'border border-black/10 dark:border-white/10',
          'shadow-2xl shadow-black/10',
          'transition-all duration-300',
          scrolled && 'mt-2',
          searchFocused && 'opacity-0 -translate-y-4 pointer-events-none'
        )}
      >
        <div className="flex items-center gap-1">
          <Link
            to="/"
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200',
              location.pathname === '/'
                ? 'bg-black/10 dark:bg-white/15 text-black dark:text-white'
                : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10'
            )}
          >
            {language === 'zh' ? '首页' : 'Home'}
          </Link>
          <Link
            to="/submit"
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200',
              location.pathname === '/submit'
                ? 'bg-black/10 dark:bg-white/15 text-black dark:text-white'
                : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10'
            )}
          >
            {language === 'zh' ? '提交' : 'Submit'}
          </Link>
          <div className="mx-1 w-px h-5 bg-black/10 dark:bg-white/10" />
          <button
            onClick={toggleLanguage}
            className="px-2 py-1.5 rounded-xl text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-200"
            aria-label="切换语言"
          >
            {language === 'zh' ? 'EN' : '中'}
          </button>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-200"
            aria-label="切换主题"
          >
            {theme === 'dark' ? (language === 'zh' ? '明亮' : 'Light') : (language === 'zh' ? '暗色' : 'Dark')}
          </button>
        </div>
      </nav>

      {/* Mobile navbar - fixed at bottom */}
      <nav
        className={cn(
          'md:hidden fixed bottom-0 left-0 right-0 z-50',
          'px-3 py-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))]',
          'bg-white/10 dark:bg-white/5 backdrop-blur-2xl',
          'border-t border-black/10 dark:border-white/10',
          'transition-all duration-300',
          searchFocused && 'translate-y-full opacity-0'
        )}
      >
        <div className="flex items-center justify-around">
          <Link
            to="/"
            className={cn(
              'flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200 min-w-[56px]',
              location.pathname === '/' ? 'text-black dark:text-white' : 'text-gray-400 dark:text-gray-500'
            )}
          >
            <div className={cn('p-1.5 rounded-lg', location.pathname === '/' && 'bg-black/10 dark:bg-white/15')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            </div>
            <span className="text-[10px] font-medium">{language === 'zh' ? '首页' : 'Home'}</span>
          </Link>
          <Link
            to="/submit"
            className={cn(
              'flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200 min-w-[56px]',
              location.pathname === '/submit' ? 'text-black dark:text-white' : 'text-gray-400 dark:text-gray-500'
            )}
          >
            <div className={cn('p-1.5 rounded-lg', location.pathname === '/submit' && 'bg-black/10 dark:bg-white/15')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
            </div>
            <span className="text-[10px] font-medium">{language === 'zh' ? '提交' : 'Submit'}</span>
          </Link>
          <button
            onClick={toggleLanguage}
            className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl text-gray-400 dark:text-gray-500 min-w-[56px]"
          >
            <div className="p-1.5 rounded-lg">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
            </div>
            <span className="text-[10px] font-medium">{language === 'zh' ? 'EN' : '中'}</span>
          </button>
          <button
            onClick={toggleTheme}
            className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl text-gray-400 dark:text-gray-500 min-w-[56px]"
          >
            <div className="p-1.5 rounded-lg">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
            </div>
            <span className="text-[10px] font-medium">{theme === 'dark' ? 'Light' : 'Dark'}</span>
          </button>
        </div>
      </nav>
    </>
  );
}