import React from 'react';
import { Bell, Search, Settings, User } from 'lucide-react';

export default function Header() {
  return (
    <header className="h-20 bg-white/80 backdrop-blur-xl border-b border-gray-200 flex items-center px-8 justify-between shadow-[0_4px_20px_rgba(0,0,0,0.05)] sticky top-0 z-50">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative flex-1 max-w-2xl">
          <input 
            type="text" 
            placeholder="Qidiruv..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-[0_2px_10px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_15px_rgba(0,0,0,0.08)]"
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <button className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 flex items-center justify-center transition-all duration-300 shadow-[0_4px_15px_rgba(37,99,235,0.2)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.3)] transform hover:scale-105">
          <Bell className="w-5 h-5 text-blue-600" />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center shadow-[0_2px_8px_rgba(239,68,68,0.4)] font-semibold">3</span>
        </button>
        
        <button className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 flex items-center justify-center transition-all duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] transform hover:scale-105">
          <Settings className="w-5 h-5 text-gray-700" />
        </button>
        
        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-[0_4px_15px_rgba(37,99,235,0.3)]">
            <User className="w-6 h-6 text-white" />
          </div>
          <div className="hidden lg:block">
            <p className="font-semibold text-gray-800 text-sm">Admin</p>
            <p className="text-xs text-gray-500">admin@hvn.uz</p>
          </div>
        </div>
      </div>
    </header>
  );
}