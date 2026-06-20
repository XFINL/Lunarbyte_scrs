import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { useStore } from '@/store';

export default function Layout() {
  const { theme } = useStore();

  return (
    <div className={`${theme === 'dark' ? 'dark' : ''} min-h-screen`}>
      <div className="fixed inset-0 bg-white dark:bg-[#0a0a0a] -z-10" />
      <Navbar />
      <main className="pt-6 pb-24 md:pt-24 md:pb-12 px-4 md:px-8 max-w-7xl mx-auto">
        <Outlet />
      </main>
    </div>
  );
}