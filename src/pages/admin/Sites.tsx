import { useStore } from '@/store';
import GlassCard from '@/components/GlassCard';
import { Check, X, Trash2 } from 'lucide-react';

export default function AdminSites() {
  const { sites, approveSite, rejectSite, deleteSite } = useStore();

  return (
    <GlassCard hover={false} className="p-6 overflow-hidden">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">所有站点</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 dark:border-white/5">
              <th className="text-left py-3 px-2 text-gray-500 dark:text-gray-400 font-medium text-xs">名称</th>
              <th className="text-left py-3 px-2 text-gray-500 dark:text-gray-400 font-medium text-xs">分类</th>
              <th className="text-left py-3 px-2 text-gray-500 dark:text-gray-400 font-medium text-xs">状态</th>
              <th className="text-left py-3 px-2 text-gray-500 dark:text-gray-400 font-medium text-xs">访问量</th>
              <th className="text-right py-3 px-2 text-gray-500 dark:text-gray-400 font-medium text-xs">操作</th>
            </tr>
          </thead>
          <tbody>
            {sites.map((site) => (
              <tr key={site.id} className="border-b border-white/5 dark:border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-3 px-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-white/20 dark:bg-white/10 p-1 flex items-center justify-center overflow-hidden">
                      <img src={site.logo} alt="" className="w-4 h-4 object-contain" />
                    </div>
                    <span className="text-gray-900 dark:text-white text-xs font-medium">{site.name}</span>
                  </div>
                </td>
                <td className="py-3 px-2 text-gray-500 dark:text-gray-400 text-xs">{site.categoryId}</td>
                <td className="py-3 px-2">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                    site.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                    site.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {site.status === 'approved' ? '已通过' : site.status === 'pending' ? '待审核' : '已拒绝'}
                  </span>
                </td>
                <td className="py-3 px-2 text-gray-500 dark:text-gray-400 text-xs">{site.visitCount}</td>
                <td className="py-3 px-2 text-right">
                  <div className="flex items-center justify-end gap-1">
                    {site.status !== 'approved' && (
                      <button onClick={() => approveSite(site.id)} className="p-1.5 rounded-lg hover:bg-green-500/20 text-gray-400 hover:text-green-400 transition-colors">
                        <Check size={14} />
                      </button>
                    )}
                    {site.status !== 'rejected' && (
                      <button onClick={() => rejectSite(site.id)} className="p-1.5 rounded-lg hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors">
                        <X size={14} />
                      </button>
                    )}
                    <button onClick={() => deleteSite(site.id)} className="p-1.5 rounded-lg hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
}