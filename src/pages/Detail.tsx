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
        <p className="text-gray-500 dark:text-gray-400">站点未找到</p>
        <Link to="/" className="text-black dark:text-white text-sm mt-2 inline-block hover:opacity-60">
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
        className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-black dark:hover:text-white transition-colors"
      >
        <ArrowLeft size={16} /> 返回
      </Link>

      <GlassCard hover={false} className="p-6 md:p-8">
        <div className="flex items-start gap-4 md:gap-5 flex-col sm:flex-row">
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-black/5 dark:bg-white/10 p-2.5 md:p-3 flex items-center justify-center shrink-0">
            <img
              src={site.logo}
              alt={site.name}
              className="w-7 h-7 md:w-10 md:h-10 object-contain"
              onError={(e) => { (e.target as HTMLImageElement).src = 'https://www.google.com/s2/favicons?domain=example.com&sz=64'; }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl md:text-2xl font-bold text-black dark:text-white mb-2">{site.name}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{site.description}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-6">
          {site.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 text-[10px] md:text-xs px-2.5 py-1 rounded-full bg-black/5 dark:bg-white/10 text-gray-600 dark:text-gray-300"
            >
              <Tag size={10} /> {tag}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-3 md:gap-4 mt-6 p-3 md:p-4 rounded-2xl bg-black/5 dark:bg-white/5">
          <div className="text-center">
            <Globe size={14} className="mx-auto mb-1 text-gray-400" />
            <div className="text-[10px] text-gray-400">分类</div>
            <div className="text-xs md:text-sm font-medium text-black dark:text-white">{category?.name || '未分类'}</div>
          </div>
          <div className="text-center">
            <Calendar size={14} className="mx-auto mb-1 text-gray-400" />
            <div className="text-[10px] text-gray-400">收录于</div>
            <div className="text-xs md:text-sm font-medium text-black dark:text-white">{site.createdAt}</div>
          </div>
          <div className="text-center">
            <Eye size={14} className="mx-auto mb-1 text-gray-400" />
            <div className="text-[10px] text-gray-400">访问量</div>
            <div className="text-xs md:text-sm font-medium text-black dark:text-white">{site.visitCount.toLocaleString()}</div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <a
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-2xl
              bg-black dark:bg-white text-white dark:text-black font-medium text-sm
              hover:opacity-80 transition-all duration-300 active:scale-[0.98]"
          >
            <ExternalLink size={16} /> 访问网站
          </a>
          <button
            onClick={copyUrl}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl
              bg-black/5 dark:bg-white/10 text-gray-600 dark:text-gray-300 font-medium text-sm
              border border-black/10 dark:border-white/10
              hover:bg-black/10 dark:hover:bg-white/15 transition-all duration-300"
          >
            <Copy size={16} /> 复制链接
          </button>
        </div>
      </GlassCard>
    </div>
  );
}