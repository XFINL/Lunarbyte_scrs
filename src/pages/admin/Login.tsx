import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/store';
import GlassCard from '@/components/GlassCard';
import { Lock } from 'lucide-react';

export default function AdminLogin() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useStore();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  if (isAuthenticated) {
    navigate('/admin/sites', { replace: true });
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      navigate('/admin/sites', { replace: true });
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <GlassCard hover={false} className="p-8 w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-black/5 dark:bg-white/10 flex items-center justify-center mx-auto mb-3">
            <Lock size={22} className="text-gray-600 dark:text-gray-300" />
          </div>
          <h1 className="text-xl font-bold text-black dark:text-white">后台管理</h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">请输入管理员密码</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="密码"
            className="w-full h-10 px-4 rounded-xl bg-white/80 dark:bg-white/10
              border border-black/10 dark:border-white/10
              text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500
              text-sm outline-none focus:border-black/30 dark:focus:border-white/30
              transition-colors"
            autoFocus
          />
          {error && (
            <p className="text-xs text-red-500 text-center">密码错误，请重试</p>
          )}
          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-black dark:bg-white text-white dark:text-black text-sm font-medium
              hover:opacity-80 transition-opacity"
          >
            登录
          </button>
        </form>

        <p className="text-[10px] text-gray-400 dark:text-gray-500 text-center mt-4">
          默认密码: admin123
        </p>
      </GlassCard>
    </div>
  );
}