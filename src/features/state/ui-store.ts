import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeMode = 'light' | 'dark' | 'system';
export type Direction = 'ltr' | 'rtl';
export type Locale = 'en' | 'ar';

interface UIState {
  // Sidebar
  sidebarOpen: boolean;
  toggleSidebar: () => void;

  // Theme
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;

  // Direction
  direction: Direction;
  setDirection: (dir: Direction) => void;

  // Locale
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarOpen: true,
      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),

      theme: 'system',
      setTheme: (theme) => set({ theme }),

      direction: 'ltr',
      setDirection: (direction) => set({ direction }),

      locale: 'en',
      setLocale: (locale) => set({ locale }),
    }),
    {
      name: 'app-ui-store',
      partialize: (state) => ({
        sidebarOpen: state.sidebarOpen,
        theme: state.theme,
        direction: state.direction,
        locale: state.locale,
      }),
    },
  ),
);
