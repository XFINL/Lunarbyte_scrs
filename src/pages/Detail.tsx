import { useParams, Link } from 'react-router-dom';
import { ExternalLink, Copy, ArrowLeft, Globe, Calendar, Eye, Tag } from 'lucide-react';
import { useStore } from '@/store';
import { categories } from '@/data/mock';
import GlassCard from '@/components/GlassCard';

export default function Detail() {
  const { id } = useParams<{ id: string }>();
  const { getSiteById } = useStore();
  const site = getSiteById(id || '');

  if (!site) {
    return (
      <GlassCard hover={false} className="p-12 text-center mt-8">
        <p className="text-gray-400">站点未找到</p>
        <Link to="/" className="text-cyan-400 text-sm mt-2 inline-block hover:underline">
          返回首页
        </Link>
      </GlassCard>
    );
  }

  const category = categories.find((c) => c.id === site.categoryId);

  const copyUrl = () => {
    navigator.clipboard.writeText(site.url);
  };

  return (
    <div className="space-y-6 pt-4 max-w-3xl mx-auto">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
      >
        <ArrowLeft size={16} /> 返回
      </Link>

      <GlassCard hover={false} className="p-8">
        <div className="flex items-start gap-5 flex-col sm:flex-row">
          <div className="w-16 h-16 rounded-2xl bg-white/20 dark:bg-white/10 p-3 flex items-center justify-center shrink-0">
            <img
              src={site.logo}
              alt={site.name}
              className="w-10 h-10 object-contain"
              onError={(e) => { (e.target as HTMLImageElement).src = 'https://www.google.com/s2/favicons?domain=example.com&sz=64'; }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{site.name}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{site.description}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-6">
          {site.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-white/20 dark:bg-white/10 text-gray-600 dark:text-gray-300"
            >
              <Tag size={10} /> {tag}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6 p-4 rounded-2xl bg-white/10 dark:bg-white/5">
          <div className="text-center">
            <Globe size={16} className="mx-auto mb-1 text-cyan-400" />
            <div className="text-xs text-gray-400">分类</div>
            <div className="text-sm font-medium text-gray-900 dark:text-white">{category?.name || '未分类'}</div>
          </div>
          <div className="text-center">
            <Calendar size={16} className="mx-auto mb-1 text-purple-400" />
            <div className="text-xs text-gray-400">收录于</div>
            <div className="text-sm font-medium text-gray-900 dark:text-white">{site.createdAt}</div>
          </div>
          <div className="text-center">
            <Eye size={16} className="mx-auto mb-1 text-green-400" />
            <div className="text-xs text-gray-400">访问量</div>
            <div className="text-sm font-medium text-gray-900 dark:text-white">{site.visitCount.toLocaleString()}</div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <a
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-2xl
              bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium text-sm
              hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300
              active:scale-[0.98]"
          >
            <ExternalLink size={16} /> 访问网站
          </a>
          <button
            onClick={copyUrl}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl
              bg-white/10 dark:bg-white/5 text-gray-600 dark:text-gray-300 font-medium text-sm
              border border-white/20 dark:border-white/10
              hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300"
          >
            <Copy size={16} /> 复制链接
          </button>
        </div>
      </GlassCard>
    </div>
  );
}