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
  const baseClass = "w-full flex items-center gap-3 px-6 py-4 rounded-2xl transition-all duration-300 text-sm font-semibold group ";
  const activeClass = "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-[0_8px_30px_rgb(37,99,235,0.3)] transform hover:scale-105 hover:shadow-[0_12px_40px_rgb(37,99,235,0.4)]";
  const inactiveClass = "text-gray-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 hover:text-blue-600 hover:shadow-[0_4px_15px_rgba(0,0,0,0.1)] transform hover:-translate-y-0.5";
  
  return (
    <button 
      onClick={onClick}
      className={baseClass + (active ? activeClass : inactiveClass)}
    >
      <Icon className={"w-5 h-5 transition-transform group-hover:scale-110 " + (active ? "text-white" : "text-gray-500 group-hover:text-blue-600")} />
      <span>{label}</span>
      {active && <div className="ml-auto w-2 h-2 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]" />}
    </button>
  );
}

export default function Sidebar({ onLogout }: { onLogout: () => void }) {
  const { activeTab, setActiveTab, resetForm } = useDashboardStore();

  return (
    <aside className="w-72 bg-gradient-to-b from-white to-gray-50 border-r border-gray-200 flex flex-col hidden md:flex shadow-[4px_0_25px_rgba(0,0,0,0.05)]">
      <div className="p-8 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-500">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-[0_4px_15px_rgba(0,0,0,0.2)]">
            <span className="text-2xl font-bold text-blue-600">H</span>
          </div>
          <div>
            <span className="font-bold text-white text-lg tracking-tight">HVN EmpireOS</span>
            <p className="text-blue-100 text-xs">POS King</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-5 py-8 space-y-3">
        <NavItem 
          icon={LayoutDashboard} 
          label="Bosh sahifa" 
          active={activeTab === 'dashboard'} 
          onClick={() => setActiveTab('dashboard')}
        />
        <NavItem 
          icon={Store} 
          label="Restoran ochish" 
          active={activeTab === 'agents'} 
          onClick={() => {
            resetForm();
            setActiveTab('agents');
          }}
        />
        <NavItem 
          icon={Building2} 
          label="Restoranlar" 
          active={activeTab === 'restaurants'} 
          onClick={() => setActiveTab('restaurants')}
        />
      </nav>

      <div className="p-5 border-t border-gray-200 bg-gray-50">
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-6 py-4 rounded-2xl text-gray-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 hover:text-red-600 hover:shadow-[0_4px_15px_rgba(239,68,68,0.2)] transition-all duration-300 text-sm font-semibold group transform hover:-translate-y-0.5"
        >
          <LogOut className="w-5 h-5 transition-transform group-hover:scale-110" />
          <span>Chiqish</span>
        </button>
      </div>
    </aside>
  );
}