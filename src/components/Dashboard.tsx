import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import RestaurantList from './RestaurantList';
import { useDashboardStore } from '../store/useDashboardStore';

export default function Dashboard() {
  const { activeTab } = useDashboardStore();

  const handleLogout = () => {
    console.log('Chiqish bosildi');
  };

  return (
    <div className="flex h-screen w-full">
      <Sidebar onLogout={handleLogout} />
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 overflow-auto p-6">
          {activeTab === 'dashboard' && <div className="text-2xl font-bold">Bosh sahifa (Dashboard)</div>}
          {activeTab === 'agents' && <div className="text-2xl font-bold">Yangi restoran ochish</div>}
          {activeTab === 'restaurants' && <RestaurantList />}
        </div>
      </main>
    </div>
  );
}
