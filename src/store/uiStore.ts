import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { City } from '@/lib/api';

/**
 * UI State Store
 * Manages global UI state: sidebar, modals, city selection, notifications
 */

interface UIState {
  // Sidebar
  sidebarOpen: boolean;
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebarCollapsed: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;

  // City Selection
  selectedCity: City;
  setSelectedCity: (city: City) => void;

  // Notifications/Alerts
  notificationsOpen: boolean;
  toggleNotifications: () => void;
  setNotificationsOpen: (open: boolean) => void;
  unreadCount: number;
  setUnreadCount: (count: number) => void;

  // Modals
  activeModal: string | null;
  openModal: (modalId: string) => void;
  closeModal: () => void;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Theme (future)
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;

  // Mobile detection
  isMobile: boolean;
  setIsMobile: (isMobile: boolean) => void;
}

const DEFAULT_CITY: City = {
  id: 'hyderabad',
  name: 'Hyderabad',
  centerLat: 17.3850,
  centerLng: 78.4867,
  zoomLevel: 12,
  isActive: true,
};

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      // Sidebar
      sidebarOpen: true,
      sidebarCollapsed: false,
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      toggleSidebarCollapsed: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),

      // City Selection
      selectedCity: DEFAULT_CITY,
      setSelectedCity: (city) => set({ selectedCity: city }),

      // Notifications
      notificationsOpen: false,
      toggleNotifications: () => set((state) => ({ notificationsOpen: !state.notificationsOpen })),
      setNotificationsOpen: (open) => set({ notificationsOpen: open }),
      unreadCount: 3,
      setUnreadCount: (count) => set({ unreadCount: count }),

      // Modals
      activeModal: null,
      openModal: (modalId) => set({ activeModal: modalId }),
      closeModal: () => set({ activeModal: null }),

      // Search
      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),

      // Theme
      theme: 'light',
      setTheme: (theme) => set({ theme }),

      // Mobile
      isMobile: false,
      setIsMobile: (isMobile) => set({ isMobile }),
    }),
    {
      name: 'marg-darshak-ui',
      storage: createJSONStorage(() => localStorage),
      version: 1,
      migrate: () => ({
        selectedCity: DEFAULT_CITY,
      }),
      partialize: (state) => ({
        sidebarCollapsed: state.sidebarCollapsed,
        selectedCity: state.selectedCity,
        theme: state.theme,
      }),
    }
  )
);