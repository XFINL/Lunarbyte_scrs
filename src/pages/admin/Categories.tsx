import { useState } from 'react';
import { useStore } from '@/store';
import GlassCard from '@/components/GlassCard';
import { Trash2, Plus } from 'lucide-react';

export default function AdminCategories() {
  const { categories, addCategory, deleteCategory } = useStore();
  const [newName, setNewName] = useState('');
  const [newIcon, setNewIcon] = useState('');

  const handleAdd = () => {
    if (!newName || !newIcon) return;
    addCategory({
      id: String(Date.now()),
      name: newName,
      icon: newIcon,
      description: '',
      siteCount: 0,
      color: '#6366f1',
    });
    setNewName('');
    setNewIcon('');
  };

  return (
    <div className="space-y-6">
      <GlassCard hover={false} className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">新增分类</h2>
        <div className="flex gap-3">
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="分类名称"
            className="flex-1 h-10 px-4 rounded-xl bg-white/10 dark:bg-white/5 backdrop-blur-xl
              border border-white/20 dark:border-white/10 text-gray-900 dark:text-white
              placeholder-gray-400 dark:placeholder-gray-500 text-sm outline-none
              focus:border-cyan-400/50 transition-colors"
          />
          <input
            value={newIcon}
            onChange={(e) => setNewIcon(e.target.value)}
            placeholder="图标 (emoji)"
            className="w-20 h-10 px-4 rounded-xl bg-white/10 dark:bg-white/5 backdrop-blur-xl
              border border-white/20 dark:border-white/10 text-gray-900 dark:text-white
              placeholder-gray-400 dark:placeholder-gray-500 text-sm outline-none
              focus:border-cyan-400/50 transition-colors text-center"
          />
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
          >
            <Plus size={16} /> 添加
          </button>
        </div>
      </GlassCard>

      <GlassCard hover={false} className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">全部分类</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="flex items-center justify-between p-3 rounded-xl bg-white/10 dark:bg-white/5 group"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{cat.icon}</span>
                <div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">{cat.name}</div>
                  <div className="text-[10px] text-gray-400">{cat.siteCount} 个站点</div>
                </div>
              </div>
              <button
                onClick={() => deleteCategory(cat.id)}
                className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-all"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}