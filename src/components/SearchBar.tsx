import { Search, X } from 'lucide-react';
import { useStore } from '@/store';

export default function SearchBar() {
  const { searchQuery, setSearchQuery } = useStore();

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative flex items-center">
        <Search
          size={18}
          className="absolute left-4 text-gray-400 dark:text-gray-500 pointer-events-none"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="搜索站点名称、描述或标签..."
          className="w-full h-12 pl-11 pr-10 rounded-2xl
            bg-white/10 dark:bg-white/5 backdrop-blur-xl
            border border-white/20 dark:border-white/10 border-black/10
            text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500
            outline-none transition-all duration-300
            focus:border-cyan-400/50 focus:shadow-lg focus:shadow-cyan-500/10
            text-sm"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-4 p-0.5 rounded-full text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
}