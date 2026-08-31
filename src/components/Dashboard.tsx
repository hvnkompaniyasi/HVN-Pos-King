import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import RestaurantList from "./RestaurantList";
import RestaurantForm from "./RestaurantForm";
import StatCard from "./StatCard";
import TariffCard from "./TariffCard";
import RecentRestaurantsTable from "./RecentRestaurantsTable";
import { useDashboardStore } from "../store/useDashboardStore";
import { statistics, tariffs } from "../data/dashboardData";
import { AlertCircle, Activity, TrendingUp } from "lucide-react";

export default function Dashboard() {
  const { activeTab } = useDashboardStore();

  const handleLogout = () => {
    console.log("Chiqish bosildi");
  };

  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100">
      <Sidebar onLogout={handleLogout} />
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 overflow-auto p-8">
          {activeTab === "dashboard" && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {statistics.map((stat, idx) => (
                  <StatCard key={idx} {...stat} />
                ))}
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Tariflar bo'yicha taqsimot</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {tariffs.map((tariff, idx) => (
                    <TariffCard key={idx} {...tariff} />
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-yellow-500 flex items-center justify-center flex-shrink-0">
                      <AlertCircle className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-800 mb-2">To'lov muddati yaqinlashgan</h3>
                      <p className="text-gray-600 text-sm mb-3">5 ta restoranning to'lov muddati 3 kun ichida tugaydi</p>
                      <button className="px-4 py-2 bg-yellow-500 text-white rounded-xl text-sm font-semibold hover:bg-yellow-600 transition-colors">
                        Eslatma yuborish
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center flex-shrink-0">
                      <Activity className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-800 mb-2">Yuqori faollik</h3>
                      <p className="text-gray-600 text-sm mb-3">Bugun 89 ta restoran faol ishlagan</p>
                      <div className="flex items-center gap-2 text-blue-600 text-sm font-semibold">
                        <TrendingUp className="w-4 h-4" />
                        +12% o'tgan haftaga nisbatan
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <RecentRestaurantsTable />
            </div>
          )}
          {activeTab === "agents" && <RestaurantForm />}
          {activeTab === "restaurants" && <RestaurantList />}
        </div>
      </main>
    </div>
  );
}