import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import { useStore } from '@/store';
import { cn } from '@/lib/utils';

const tabs = [
  { path: '/admin/sites', label: '站点管理' },
  { path: '/admin/categories', label: '分类管理' },
  { path: '/admin/reviews', label: '审核管理' },
];

export default function AdminLayout() {
  const location = useLocation();
  const { isAuthenticated, logout } = useStore();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="space-y-6 pt-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl md:text-2xl font-bold text-black dark:text-white">后台管理</h1>
        <div className="flex items-center gap-3">
          <Link to="/" className="text-xs text-gray-400 hover:text-black dark:hover:text-white transition-colors">
            返回首页
          </Link>
          <button
            onClick={logout}
            className="text-xs text-gray-400 hover:text-red-500 transition-colors"
          >
            退出登录
          </button>
        </div>
      </div>

      <div className="flex gap-1 border-b border-black/10 dark:border-white/10 pb-0">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          return (
            <Link
              key={tab.path}
              to={tab.path}
              className={cn(
                'px-3 md:px-4 py-2.5 rounded-t-xl text-xs md:text-sm font-medium transition-all duration-200 border-b-2',
                isActive
                  ? 'bg-black/5 dark:bg-white/5 text-black dark:text-white border-black dark:border-white'
                  : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white border-transparent'
              )}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>

      <Outlet />
    </div>
  );
}