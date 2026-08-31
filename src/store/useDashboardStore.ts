import { create } from 'zustand';

interface DashboardState {
  activeTab: 'dashboard' | 'agents' | 'restaurants';
  setActiveTab: (tab: 'dashboard' | 'agents' | 'restaurants') => void;
  resetForm: () => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  activeTab: 'dashboard',
  setActiveTab: (tab) => set({ activeTab: tab }),
  resetForm: () => console.log('Form reseted'),
}));
