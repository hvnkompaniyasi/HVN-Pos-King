import { create } from 'zustand';

interface DashboardState {
  activeTab: 'dashboard' | 'agents' | 'restaurants';
  setActiveTab: (tab: 'dashboard' | 'agents' | 'restaurants') => void;
  resetForm: () => void;
  stats: {
    totalRestaurants: number;
    activeRestaurants: number;
    inactiveRestaurants: number;
    blockedRestaurants: number;
    newToday: number;
    monthlyRevenue: number;
    totalUsers: number;
  };
}

export const useDashboardStore = create<DashboardState>((set) => ({
  activeTab: 'dashboard',
  setActiveTab: (tab) => set({ activeTab: tab }),
  resetForm: () => console.log('Form reseted'),
  stats: {
    totalRestaurants: 156,
    activeRestaurants: 128,
    inactiveRestaurants: 18,
    blockedRestaurants: 10,
    newToday: 3,
    monthlyRevenue: 45200000,
    totalUsers: 1247,
  },
}));