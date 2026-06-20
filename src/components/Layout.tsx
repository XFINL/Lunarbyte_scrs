import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { useStore } from '@/store';

export default function Layout() {
  const { theme } = useStore();

  return (
    <div className={`${theme} min-h-screen`}>
      <div className="fixed inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-[#0a0a0f] dark:via-[#0d0d1a] dark:to-[#0a0a14] -z-10" />
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/10 dark:bg-cyan-500/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      <Navbar />
      <main className="pt-6 pb-24 md:pt-24 md:pb-12 px-4 md:px-8 max-w-7xl mx-auto">
        <Outlet />
      </main>
    </div>
  );
}