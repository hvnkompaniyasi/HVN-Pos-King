import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import RestaurantList from "./RestaurantList";
import RestaurantForm from "./RestaurantForm";
import StatCard from "./StatCard";
import TariffCard from "./TariffCard";
import RecentRestaurantsTable from "./RecentRestaurantsTable";
import { useDashboardStore } from "../store/useDashboardStore";
import { useAuthStore } from "../store/useAuthStore";
import { statistics, tariffs } from "../data/dashboardData";

export default function Dashboard() {
  const { activeTab } = useDashboardStore();

  const logout = useAuthStore((s) => s.logout);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
      <Sidebar onLogout={handleLogout} />
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 overflow-auto p-8">
          {activeTab === "dashboard" && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {statistics.map((stat, idx) => (
                  <StatCard key={idx} index={idx} {...stat} />
                ))}
              </div>

              <div>
                <h3 className="animate-fade-in-up text-2xl font-bold text-gray-800 dark:text-white mb-6">Tariflar bo'yicha taqsimot</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tariffs.map((tariff, idx) => (
                    <TariffCard key={idx} index={idx} {...tariff} />
                  ))}
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
