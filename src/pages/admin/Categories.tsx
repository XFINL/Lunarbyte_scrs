import { useState } from 'react';
import { useStore } from '@/store';
import GlassCard from '@/components/GlassCard';
import { Trash2, Plus } from 'lucide-react';

export default function AdminCategories() {
  const { categories, addCategory, deleteCategory } = useStore();
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const handleAdd = () => {
    if (!newName) return;
    addCategory({
      id: String(Date.now()),
      name: newName,
      icon: '',
      description: newDesc,
      siteCount: 0,
      color: '#000000',
    });
    setNewName('');
    setNewDesc('');
  };

  return (
    <div className="space-y-6">
      <GlassCard hover={false} className="p-4 md:p-6">
        <h2 className="text-base md:text-lg font-semibold text-black dark:text-white mb-4">新增分类</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="分类名称"
            className="flex-1 h-10 px-4 rounded-xl bg-white/80 dark:bg-white/10
              border border-black/10 dark:border-white/10 text-black dark:text-white
              placeholder-gray-400 dark:placeholder-gray-500 text-sm outline-none
              focus:border-black/30 dark:focus:border-white/30 transition-colors"
          />
          <input
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            placeholder="分类描述"
            className="flex-1 h-10 px-4 rounded-xl bg-white/80 dark:bg-white/10
              border border-black/10 dark:border-white/10 text-black dark:text-white
              placeholder-gray-400 dark:placeholder-gray-500 text-sm outline-none
              focus:border-black/30 dark:focus:border-white/30 transition-colors"
          />
          <button
            onClick={handleAdd}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-black dark:bg-white text-white dark:text-black text-sm font-medium hover:opacity-80 transition-opacity"
          >
            <Plus size={16} /> 添加
          </button>
        </div>
      </GlassCard>

      <GlassCard hover={false} className="p-4 md:p-6">
        <h2 className="text-base md:text-lg font-semibold text-black dark:text-white mb-4">全部分类</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="flex items-center justify-between p-3 rounded-xl bg-black/5 dark:bg-white/5 group"
            >
              <div>
                <div className="text-sm font-medium text-black dark:text-white">{cat.name}</div>
                <div className="text-[10px] text-gray-400">{cat.siteCount} 个站点</div>
              </div>
              <button
                onClick={() => deleteCategory(cat.id)}
                className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-red-500/10 text-gray-400 hover:text-red-500 transition-all"
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