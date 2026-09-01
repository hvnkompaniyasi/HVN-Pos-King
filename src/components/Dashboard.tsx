import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import RestaurantList from "./RestaurantList";
import RestaurantForm from "./RestaurantForm";
import StatCard from "./StatCard";
import TariffCard from "./TariffCard";
import { useDashboardStore } from "../store/useDashboardStore";
import { useAuthStore } from "../store/useAuthStore";
import { supabase } from "../lib/supabase";

const tariffBase = [
  { name: "Lite", price: "250,000 so'm/oy", color: "blue" },
  { name: "Pro", price: "300,000 so'm/oy", color: "purple" },
  { name: "Premium", price: "500,000 so'm/oy", color: "gold" }
];

export default function Dashboard() {
  const { activeTab } = useDashboardStore();
  const logout = useAuthStore((s) => s.logout);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [statistics, setStatistics] = useState<any[]>([]);
  const [tariffs, setTariffs] = useState<any[]>([]);
  const [revenue, setRevenue] = useState({ total: 0, month: 0 });

  const loadStats = async () => {
    const { data } = await supabase.from("restaurants").select("status, tariff, created_at, payment_due_date");
    const list = data || [];
    const now = new Date();

    setStatistics([
      { title: "Jami restoranlar", value: String(list.length), icon: "Building2", color: "blue", subtitle: "Barcha davrlar bo'yicha" },
      { title: "Faol restoranlar", value: String(list.filter((r) => r.status === "active").length), icon: "CheckCircle", color: "green", subtitle: "To'lov qilgan" },
      { title: "To'lov kutilmoqda", value: String(list.filter((r) => { if (!r.payment_due_date || r.status === "blocked") return false; return Math.ceil((new Date(r.payment_due_date).getTime() - Date.now()) / 86400000) <= 3; }).length), icon: "AlertCircle", color: "orange", subtitle: "3 kun ichida to'lov qilishi kerak" },
      { title: "Bloklangan", value: String(list.filter((r) => r.status === "blocked").length), icon: "XCircle", color: "red", subtitle: "To'lov qilmagan" },
      { title: "Yangi (bu oy)", value: String(list.filter((r) => { const d = new Date(r.created_at); return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear(); }).length), icon: "Calendar", color: "cyan" }
    ]);

    setTariffs(tariffBase.map((t) => ({
      ...t,
      count: String(list.filter((r) => r.tariff === t.name).length)
    })));

    const { data: rev } = await supabase.rpc("get_revenue_summary");
    setRevenue({
      total: Number(rev?.net_total || 0),
      month: Number(rev?.net_month || 0)
    });
  };

  useEffect(() => {
    if (activeTab === "dashboard") loadStats();
  }, [activeTab]);

  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
      {mobileOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden animate-fade-in" onClick={() => setMobileOpen(false)} />}
      <Sidebar onLogout={logout} mobileOpen={mobileOpen} onCloseMobile={() => setMobileOpen(false)} />
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setMobileOpen(true)} />
        <div className="flex-1 overflow-auto p-8">
          {activeTab === "dashboard" && (
            <div className="space-y-8">
              <div className="animate-fade-in-up bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-[0_8px_30px_rgba(34,197,94,0.35)] flex items-center justify-between">
                <div><p className="text-sm opacity-80 mb-1">Jami daromad</p><p className="text-3xl font-bold">{revenue.total.toLocaleString()} so'm</p></div>
                <div className="text-right"><p className="text-sm opacity-80 mb-1">Shu oy daromadi</p><p className="text-2xl font-bold">{revenue.month.toLocaleString()} so'm</p></div>
              </div>
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
            </div>
          )}
          {activeTab === "agents" && <RestaurantForm />}
          {activeTab === "restaurants" && <RestaurantList />}
          {activeTab === "reports" && <Reports />}
        </div>
      </main>
    </div>
  );
}