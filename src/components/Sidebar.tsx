import React from 'react';
import { LayoutDashboard, Store, Building2, LogOut } from 'lucide-react';
import { useDashboardStore } from '../store/useDashboardStore';

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  onClick: () => void;
}

function NavItem({ icon: Icon, label, active = false, onClick }: NavItemProps) {
  return (
    <button 
      onClick={onClick}
      className={\w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium group \\}
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  );
}

export default function Sidebar({ onLogout }: { onLogout: () => void }) {
  const { activeTab, setActiveTab, resetForm } = useDashboardStore();

  return (
    <aside className="w-64 border-r border-zinc-200 flex flex-col hidden md:flex bg-white">
      <div className="p-8 border-b border-zinc-200">
        <span className="font-bold tracking-tighter uppercase text-sm">HVN EmpireOS</span>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        <NavItem icon={LayoutDashboard} label="Bosh sahifa" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
        <NavItem icon={Store} label="Restoran ochish" active={activeTab === 'agents'} onClick={() => { resetForm(); setActiveTab('agents'); }} />
        <NavItem icon={Building2} label="Restoranlar" active={activeTab === 'restaurants'} onClick={() => setActiveTab('restaurants')} />
      </nav>
      <div className="p-4 border-t border-zinc-200">
        <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 text-zinc-500 hover:text-black hover:bg-zinc-50 rounded-xl transition-all text-sm font-medium">
          <LogOut className="w-4 h-4" />
          Chiqish
        </button>
      </div>
    </aside>
  );
}
