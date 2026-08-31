import React from 'react';
import { Plus } from 'lucide-react';
import { useDashboardStore } from '../../store/useDashboardStore';

export default function Header() {
  const { setActiveTab, resetForm } = useDashboardStore();

  return (
    <header className="h-20 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-end px-8 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => {
            resetForm();
            setActiveTab('agents');
          }}
          aria-label="Yangi restoran qo'shish"
          className="p-2 bg-black dark:bg-white text-white dark:text-black rounded-full hover:scale-110 transition-transform shadow-lg"
        >
          <Plus className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
