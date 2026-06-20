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
            bg-white/80 dark:bg-white/10 backdrop-blur-xl
            border border-black/10 dark:border-white/10
            text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500
            outline-none transition-all duration-300
            focus:border-black/30 dark:focus:border-white/30 focus:shadow-lg
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