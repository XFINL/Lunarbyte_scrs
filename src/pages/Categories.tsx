import { useStore } from '@/store';
import CategoryCard from '@/components/CategoryCard';

export default function Categories() {
  const { categories } = useStore();

  return (
    <div className="space-y-8 pt-4">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">全部分类</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">按分类浏览收录的优质网站</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((cat, i) => (
          <CategoryCard key={cat.id} category={cat} index={i} />
        ))}
      </div>
    </div>
  );
}