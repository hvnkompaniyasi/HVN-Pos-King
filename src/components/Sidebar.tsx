import React, { useState } from "react";
import { LayoutDashboard, Store, Building2, LogOut, Menu, X } from "lucide-react";
import { useDashboardStore } from "../store/useDashboardStore";

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  collapsed?: boolean;
  onClick: () => void;
}

function NavItem({ icon: Icon, label, active = false, collapsed = false, onClick }: NavItemProps) {
  const baseClass = "w-full flex items-center gap-3 px-3 py-3 rounded-2xl transition-all duration-500 ease-apple text-sm font-semibold group ";
  const activeClass = "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-[0_8px_30px_rgb(37,99,235,0.3)]";
  const inactiveClass = "text-gray-600 dark:text-gray-400 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 hover:text-blue-600 dark:hover:from-blue-950 dark:hover:to-blue-900 dark:hover:text-blue-300";
  const justify = collapsed ? "justify-center" : "";

  return (
    <button onClick={onClick} title={label} className={baseClass + (active ? activeClass : inactiveClass) + " " + justify}>
      <span className={"w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-500 " + (active ? "bg-white/20 icon-3d" : "bg-gray-100 dark:bg-gray-800 group-hover:bg-white dark:group-hover:bg-gray-700 group-hover:shadow-[0_4px_15px_rgba(59,130,246,0.35)] group-hover:scale-105")}>
        <Icon className={"w-5 h-5 icon-anim icon-wiggle " + (active ? "text-white" : "text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-300")} />
      </span>
      {!collapsed && <span>{label}</span>}
      {!collapsed && active && <div className="ml-auto w-2 h-2 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]" />}
    </button>
  );
}

export default function Sidebar({ onLogout }: { onLogout: () => void }) {
  const { activeTab, setActiveTab, resetForm } = useDashboardStore();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={(collapsed ? "w-20" : "w-72") + " bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-900 border-r border-gray-200 dark:border-gray-800 flex-col hidden md:flex shadow-[4px_0_25px_rgba(0,0,0,0.05)] transition-all duration-500 ease-apple"}>
      <div className={"p-4 border-b border-gray-200 dark:border-gray-800 flex items-center " + (collapsed ? "justify-center" : "justify-between")}>
        {!collapsed && (
          <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent pl-2">HVN POS</span>
        )}
        <button onClick={() => setCollapsed(!collapsed)} title={collapsed ? "Menyuni ochish" : "Menyuni yopish"} className="group w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_2px_10px_rgba(0,0,0,0.08)]">
          {collapsed ? <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300 icon-anim icon-wiggle" /> : <X className="w-5 h-5 text-gray-600 dark:text-gray-300 icon-anim icon-spin" />}
        </button>
      </div>

      <nav className="flex-1 px-3 py-6 space-y-3">
        <NavItem icon={LayoutDashboard} label="Bosh sahifa" active={activeTab === "dashboard"} collapsed={collapsed} onClick={() => setActiveTab("dashboard")} />
        <NavItem icon={Store} label="Restoran ochish" active={activeTab === "agents"} collapsed={collapsed} onClick={() => { resetForm(); setActiveTab("agents"); }} />
        <NavItem icon={Building2} label="Restoranlar" active={activeTab === "restaurants"} collapsed={collapsed} onClick={() => setActiveTab("restaurants")} />
      </nav>

      <div className="p-3 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
        <button onClick={onLogout} title="Chiqish" className={"group w-full flex items-center gap-3 px-3 py-3 rounded-2xl text-gray-600 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-950 hover:text-red-600 dark:hover:text-red-400 transition-all duration-500 ease-apple text-sm font-semibold " + (collapsed ? "justify-center" : "")}>
          <span className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 group-hover:bg-white dark:group-hover:bg-gray-700 group-hover:shadow-[0_4px_15px_rgba(239,68,68,0.35)] flex items-center justify-center flex-shrink-0 transition-all duration-500 group-hover:scale-105">
            <LogOut className="w-5 h-5 icon-anim icon-wiggle" />
          </span>
          {!collapsed && <span>Chiqish</span>}
        </button>
      </div>
    </aside>
  );
}