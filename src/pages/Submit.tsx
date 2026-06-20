import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, CheckCircle } from 'lucide-react';
import { useStore } from '@/store';
import GlassCard from '@/components/GlassCard';

export default function Submit() {
  const navigate = useNavigate();
  const { categories, submitSite } = useStore();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    url: '',
    description: '',
    categoryId: '',
    email: '',
  });
  const [isOther, setIsOther] = useState(false);
  const [customCategory, setCustomCategory] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitSite({
      ...form,
      customCategory: isOther ? customCategory : undefined,
    });
    setSubmitted(true);
    setTimeout(() => navigate('/'), 2000);
  };

  if (submitted) {
    return (
      <GlassCard hover={false} className="p-12 text-center max-w-md mx-auto mt-16">
        <CheckCircle size={48} className="mx-auto mb-4 text-gray-400" />
        <h2 className="text-xl font-bold text-black dark:text-white mb-2">提交成功</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">我们会尽快审核你的提交</p>
      </GlassCard>
    );
  }

  return (
    <div className="space-y-8 pt-4 max-w-2xl mx-auto">
      <div className="text-center space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold text-black dark:text-white">提交站点</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">推荐优质网站，与更多人分享</p>
      </div>

      <GlassCard hover={false} className="p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400">网站名称 *</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="ChatGPT"
              className="w-full h-10 px-4 rounded-xl bg-white/80 dark:bg-white/10
                border border-black/10 dark:border-white/10 text-black dark:text-white
                placeholder-gray-400 dark:placeholder-gray-500 text-sm outline-none
                focus:border-black/30 dark:focus:border-white/30 transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400">域名地址 *</label>
            <input
              required
              value={form.url}
              onChange={(e) => setForm({ ...form, url: e.target.value })}
              placeholder="https://example.com"
              className="w-full h-10 px-4 rounded-xl bg-white/80 dark:bg-white/10
                border border-black/10 dark:border-white/10 text-black dark:text-white
                placeholder-gray-400 dark:placeholder-gray-500 text-sm outline-none
                focus:border-black/30 dark:focus:border-white/30 transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400">网站介绍 *</label>
            <textarea
              required
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="简要介绍这个站点的功能和特点..."
              rows={3}
              className="w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-white/10
                border border-black/10 dark:border-white/10 text-black dark:text-white
                placeholder-gray-400 dark:placeholder-gray-500 text-sm outline-none resize-none
                focus:border-black/30 dark:focus:border-white/30 transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400">分类 *</label>
            <select
              required
              value={form.categoryId}
              onChange={(e) => {
                const val = e.target.value;
                setForm({ ...form, categoryId: val });
                setIsOther(val === '__other__');
                if (val !== '__other__') setCustomCategory('');
              }}
              className="w-full h-10 px-4 rounded-xl bg-white/80 dark:bg-white/10
                border border-black/10 dark:border-white/10 text-black dark:text-white text-sm
                outline-none focus:border-black/30 dark:focus:border-white/30 transition-colors appearance-none"
            >
              <option value="" disabled>选择分类</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id} className="bg-white dark:bg-gray-900">{cat.name}</option>
              ))}
              <option value="__other__" className="bg-white dark:bg-gray-900">其他</option>
            </select>
            {isOther && (
              <input
                required
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                placeholder="输入自定义分类名称"
                className="mt-2 w-full h-10 px-4 rounded-xl bg-white/80 dark:bg-white/10
                  border border-black/10 dark:border-white/10 text-black dark:text-white
                  placeholder-gray-400 dark:placeholder-gray-500 text-sm outline-none
                  focus:border-black/30 dark:focus:border-white/30 transition-colors"
              />
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400">联系邮箱 *</label>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="your@email.com"
              className="w-full h-10 px-4 rounded-xl bg-white/80 dark:bg-white/10
                border border-black/10 dark:border-white/10 text-black dark:text-white
                placeholder-gray-400 dark:placeholder-gray-500 text-sm outline-none
                focus:border-black/30 dark:focus:border-white/30 transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl
              bg-black dark:bg-white text-white dark:text-black font-medium text-sm
              hover:opacity-80 transition-all duration-300 active:scale-[0.98]"
          >
            <Send size={16} /> 提交站点
          </button>

          <p className="text-[10px] text-gray-400 dark:text-gray-500 text-center">
            提交后需要管理员审核通过才会展示
          </p>
        </form>
      </GlassCard>
    </div>
  );
}