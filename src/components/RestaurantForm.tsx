import React from "react";

export default function RestaurantForm() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Yangi restoran qo'shish</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Restoran nomi *</label>
            <input type="text" placeholder="Restoran nomini kiriting" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Egasi / FIO *</label>
            <input type="text" placeholder="Egasining ismi" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Telefon *</label>
              <input type="tel" placeholder="+998 (__) ___-__-__" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Tarif *</label>
              <select className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300">
                <option>Basic - 150,000 so'm/oy</option>
                <option>Pro - 300,000 so'm/oy</option>
                <option>Premium - 500,000 so'm/oy</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Manzil</label>
            <input type="text" placeholder="Shahar, ko'cha, uy" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300" />
          </div>
          <div className="pt-4 flex gap-3">
            <button className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold shadow-[0_4px_15px_rgba(37,99,235,0.3)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.4)] transition-all duration-300 transform hover:scale-[1.02]">
              Restoranni yaratish
            </button>
            <button className="px-6 py-3 border-2 border-gray-200 text-gray-600 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300">
              Bekor qilish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}