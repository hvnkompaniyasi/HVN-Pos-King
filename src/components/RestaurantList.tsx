import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/useAuthStore';
import { useDashboardStore } from '../store/useDashboardStore';
import { useRestaurants } from '../hooks/useRestaurants';

// Components
import Sidebar from './dashboard/Sidebar';
import Header from './dashboard/Header';
import StatsGrid from './dashboard/StatsGrid';
import UpcomingPayments from './dashboard/UpcomingPayments';
import RestaurantForm from './dashboard/RestaurantForm';
import RestaurantList from './dashboard/RestaurantList';

export default function Dashboard() {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const { activeTab } = useDashboardStore();
  const { data: restaurants = [], refetch } = useRestaurants();

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    logout();
    navigate('/login');
  };

  const triggerPaymentCheck = async () => {
    try {
      const res = await fetch('/api/cron/check-payments');
      const data = await res.json();
      if (data.success) {
        alert(`Tekshiruv yakunlandi. ${data.checked} ta restoran tekshirildi.`);
        refetch();
      } else {
        throw new Error(data.error || 'Noma\'lum xatolik');
      }
    } catch (err: any) {
      alert('Xatolik: ' + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex transition-colors duration-300">
      <Sidebar onLogout={handleLogout} />

      <main className="flex-1 flex flex-col">
        <Header />

        <div className="p-8 space-y-8">
          {activeTab === 'dashboard' ? (
            <>
              <div className="flex items-end justify-between">
                <div>
                  <h2 className="text-3xl font-bold tracking-tighter uppercase dark:text-white">Asosiy ko'rsatkichlar</h2>
                </div>
                <button 
                  onClick={triggerPaymentCheck}
                  aria-label="To'lovlarni tekshirish"
                  className="agent-button-secondary flex items-center gap-2"
                >
                  <Bell className="w-4 h-4" aria-hidden="true" /> To'lovlarni tekshirish
                </button>
              </div>

              <StatsGrid restaurants={restaurants} />

              <div className="grid grid-cols-1 gap-8">
                <UpcomingPayments restaurants={restaurants} />
              </div>
            </>
          ) : activeTab === 'agents' ? (
            <RestaurantForm />
          ) : (
            <RestaurantList />
          )}
        </div>
      </main>
    </div>
  );
}
