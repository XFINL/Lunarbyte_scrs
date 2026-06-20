import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function CustomSelect({ options, value, onChange, placeholder = '请选择', className }: CustomSelectProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open]);

  const selected = options.find((o) => o.value === value);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          'w-full h-10 px-4 rounded-xl bg-white/80 dark:bg-white/10',
          'border border-black/10 dark:border-white/10',
          'text-sm outline-none transition-colors text-left',
          selected ? 'text-black dark:text-white' : 'text-gray-400 dark:text-gray-500',
          className
        )}
      >
        {selected ? selected.label : placeholder}
      </button>

      {open && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          {/* modal */}
          <div
            className="relative w-full max-w-sm rounded-2xl
              bg-white dark:bg-[#1a1a1a]
              border border-black/10 dark:border-white/10
              shadow-2xl overflow-hidden"
          >
            <div className="px-5 py-3 border-b border-black/10 dark:border-white/10">
              <span className="text-sm font-medium text-black dark:text-white">{placeholder}</span>
            </div>
            <div className="max-h-60 overflow-y-auto">
              {options.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                  className={cn(
                    'w-full px-5 py-3 text-left text-sm transition-colors',
                    opt.value === value
                      ? 'bg-black/10 dark:bg-white/15 text-black dark:text-white font-medium'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5'
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <div className="px-5 py-2.5 border-t border-black/10 dark:border-white/10">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="w-full py-2 rounded-xl text-sm text-gray-500 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}