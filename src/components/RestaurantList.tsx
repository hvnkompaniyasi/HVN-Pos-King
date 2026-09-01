import React from "react";
import { Plus } from "lucide-react";
import RecentRestaurantsTable from "./RecentRestaurantsTable";
import { useDashboardStore } from "../store/useDashboardStore";

export default function RestaurantList() {
  const setActiveTab = useDashboardStore((s) => s.setActiveTab);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between animate-fade-in-up">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Restoranlar</h2>
        <button
          onClick={() => setActiveTab("agents")}
          className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold shadow-[0_4px_15px_rgba(37,99,235,0.3)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.4)] transition-all duration-300 ease-apple transform hover:scale-[1.02] active:scale-95"
        >
          <Plus className="w-5 h-5 icon-anim icon-wiggle" />
          Yangi restoran
        </button>
      </div>

      <RecentRestaurantsTable />
    </div>
  );
}