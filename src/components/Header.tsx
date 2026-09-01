import React, { useState, useEffect } from "react";
import { Bell, Search, Sun, Moon } from "lucide-react";
import NotificationPanel from "./NotificationPanel";
import { initialNotifications } from "../data/notifications";
import { useDashboardStore } from "../store/useDashboardStore";

export default function Header() {
  const [dark, setDark] = useState(() => localStorage.getItem("theme") === "dark");
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const { activeTab, searchQuery, setSearchQuery } = useDashboardStore();

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const markRead = (id: number) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <header className="h-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 flex items-center px-8 justify-between shadow-[0_4px_20px_rgba(0,0,0,0.05)] sticky top-0 z-50">
      {activeTab === "restaurants" && (
        <div className="flex-1 max-w-2xl mr-10 animate-fade-in">
          <div className="relative group">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Restoran yoki egasini qidirish..."
              className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-500 ease-apple shadow-[0_2px_10px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_15px_rgba(0,0,0,0.08)] focus:shadow-[0_4px_20px_rgba(59,130,246,0.25)]"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2 icon-anim group-focus-within:rotate-12 group-focus-within:scale-110 group-focus-within:text-blue-500" />
          </div>
        </div>
      )}

      <div className="flex items-center gap-4 ml-auto">
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            title="Bildirishnomalar"
            className="group relative w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 hover:from-blue-100 hover:to-blue-200 flex items-center justify-center transition-all duration-300 ease-apple shadow-[0_4px_15px_rgba(37,99,235,0.2)] icon-3d hover:shadow-[0_6px_20px_rgba(37,99,235,0.35)] hover:scale-105 active:scale-95"
          >
            <Bell className={"w-5 h-5 icon-anim icon-wiggle " + (showNotifications ? "text-blue-700 dark:text-blue-200" : "text-blue-600 dark:text-blue-300")} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center shadow-[0_2px_8px_rgba(239,68,68,0.4)] font-semibold animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <NotificationPanel
              notifications={notifications}
              onMarkAllRead={markAllRead}
              onMarkRead={markRead}
              onClose={() => setShowNotifications(false)}
            />
          )}
        </div>

        <button
          onClick={() => setDark(!dark)}
          title={dark ? "Yorug' rejim" : "Qorong'u rejim"}
          className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-100 dark:from-indigo-950 dark:to-gray-900 flex items-center justify-center transition-all duration-500 ease-apple icon-3d shadow-[0_4px_15px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.2)] hover:scale-105 active:scale-95 overflow-hidden"
        >
          <Sun className={"w-6 h-6 text-amber-500 absolute transition-all duration-500 " + (dark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100")} />
          <Moon className={"w-6 h-6 text-indigo-300 absolute transition-all duration-500 " + (dark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0")} />
        </button>
      </div>
    </header>
  );
}