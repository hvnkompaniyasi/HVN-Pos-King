import { create } from "zustand";

interface DashboardState {
  activeTab: "dashboard" | "agents" | "restaurants";
  setActiveTab: (tab: "dashboard" | "agents" | "restaurants") => void;
  resetForm: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  activeTab: "dashboard",
  setActiveTab: (tab) => set({ activeTab: tab }),
  resetForm: () => {},
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query })
}));