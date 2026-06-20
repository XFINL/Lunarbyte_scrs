import { Outlet, Link, useLocation } from 'react-router-dom';
import { Globe, Grid3X3, ClipboardCheck, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

const tabs = [
  { path: '/admin/sites', label: '站点管理', icon: Globe },
  { path: '/admin/categories', label: '分类管理', icon: Grid3X3 },
  { path: '/admin/reviews', label: '审核管理', icon: ClipboardCheck },
];

export default function AdminLayout() {
  const location = useLocation();

  return (
    <div className="space-y-6 pt-4">
      <div className="flex items-center justify-between">
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 mb-2 transition-colors"
          >
            <ArrowLeft size={12} /> 返回首页
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">后台管理</h1>
        </div>
      </div>

      <div className="flex gap-2 border-b border-white/10 dark:border-white/5 pb-0">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          const Icon = tab.icon;
          return (
            <Link
              key={tab.path}
              to={tab.path}
              className={cn(
                'flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-white/10 dark:bg-white/5 text-cyan-400 border-b-2 border-cyan-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              )}
            >
              <Icon size={16} />
              {tab.label}
            </Link>
          );
        })}
      </div>

      <Outlet />
    </div>
  );
}