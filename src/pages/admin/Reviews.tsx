import { useStore } from '@/store';
import GlassCard from '@/components/GlassCard';
import { Check, X } from 'lucide-react';

export default function AdminReviews() {
  const { getPendingSites, approveSite, rejectSite } = useStore();
  const pending = getPendingSites();

  if (pending.length === 0) {
    return (
      <GlassCard hover={false} className="p-12 text-center">
        <div className="text-3xl mb-3">✅</div>
        <p className="text-gray-500 dark:text-gray-400 text-sm">暂无待审核的站点</p>
      </GlassCard>
    );
  }

  return (
    <div className="space-y-4">
      {pending.map((site) => (
        <GlassCard key={site.id} hover={false} className="p-5">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/20 dark:bg-white/10 p-2 flex items-center justify-center overflow-hidden shrink-0">
              <img src={site.logo} alt="" className="w-6 h-6 object-contain" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{site.name}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">{site.description}</p>
              <div className="flex items-center gap-3 mt-2 text-[10px] text-gray-400">
                <a href={site.url} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 truncate">{site.url}</a>
                <span>📅 {site.createdAt}</span>
              </div>
            </div>
            <div className="flex gap-1 shrink-0">
              <button
                onClick={() => approveSite(site.id)}
                className="p-2 rounded-xl bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-all"
              >
                <Check size={16} />
              </button>
              <button
                onClick={() => rejectSite(site.id)}
                className="p-2 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </GlassCard>
      ))}
    </div>
  );
}