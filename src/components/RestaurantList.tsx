import React from 'react';
import { Building2, Plus } from 'lucide-react';

export default function RestaurantList() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Restoranlar</h2>
        <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold shadow-[0_4px_15px_rgba(37,99,235,0.3)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.4)] transition-all duration-300 transform hover:scale-[1.02]">
          <Plus className="w-5 h-5" />
          Yangi restoran
        </button>
      </div>
      
      <div className="bg-white rounded-2xl p-12 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-10 h-10 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Restoranlar yo'q</h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">Hozircha restoranlar mavjud emas. Birinchi restoraningizni qo'shing va boshqarishni boshlang.</p>
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold shadow-[0_4px_15px_rgba(37,99,235,0.3)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.4)] transition-all duration-300 transform hover:scale-[1.02]">
            <Plus className="w-5 h-5" />
            Restoran qo'shish
          </button>
        </div>
      </div>
    </div>
  );
}