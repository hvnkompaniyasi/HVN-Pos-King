import React from 'react';
import { motion } from 'motion/react';
import { Store, AlertCircle, Zap, Crown, Rocket } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Restaurant } from '../../types';

interface StatsGridProps {
  restaurants: Restaurant[];
}

export default function StatsGrid({ restaurants }: StatsGridProps) {
  const totalRestaurants = restaurants.length;
  
  const approachingDeadlines = restaurants.filter(r => {
    if (!r.paid_until) return false;
    const target = new Date(r.paid_until);
    const today = new Date();
    const diffDays = Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= 7;
  }).length;

  const planCounts = restaurants.reduce((acc, r) => {
    const plan = r.plan_type?.toLowerCase() || 'lite';
    acc[plan] = (acc[plan] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const stats = [
    { label: 'Restoranlar soni', value: totalRestaurants.toString(), change: 'Jami', icon: Store, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
    { label: 'To\'lov muddati yaqinlar', value: approachingDeadlines.toString(), change: '7 kun ichida', icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/20' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {stats.map((stat, i) => (
        <motion.div 
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="agent-card p-6 group"
        >
          <div className="flex justify-between items-start mb-4">
            <div className={cn("p-2 rounded-lg transition-colors", stat.bg, stat.color)}>
              <stat.icon className="w-5 h-5" />
            </div>
            <span className={cn(
              "text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter",
              "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
            )}>
              {stat.change}
            </span>
          </div>
          <p className="text-xs font-mono text-agent-muted dark:text-dark-muted uppercase tracking-widest mb-1">{stat.label}</p>
          <h3 className="text-2xl font-bold tracking-tight dark:text-white">{stat.value}</h3>
        </motion.div>
      ))}

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="agent-card p-6 lg:col-span-2 flex flex-col justify-between"
      >
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 bg-amber-50 dark:bg-amber-900/20 text-amber-500 rounded-lg">
            <Zap className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
            Tariflar taqsimoti
          </span>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-1">
            <p className="text-[10px] font-mono text-agent-muted dark:text-dark-muted uppercase tracking-widest">Lite</p>
            <h4 className="text-xl font-bold dark:text-white">{planCounts.lite || 0}</h4>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-mono text-agent-muted dark:text-dark-muted uppercase tracking-widest">Pro</p>
            <h4 className="text-xl font-bold dark:text-white">{planCounts.pro || 0}</h4>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-mono text-agent-muted dark:text-dark-muted uppercase tracking-widest">Ultra</p>
            <h4 className="text-xl font-bold dark:text-white">{planCounts.ultra || 0}</h4>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
