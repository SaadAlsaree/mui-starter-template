'use client';

import type {} from '@mui/x-date-pickers/themeAugmentation';
import type {} from '@mui/x-charts/themeAugmentation';
import type {} from '@mui/x-data-grid/themeAugmentation';
import type {} from '@mui/x-tree-view/themeAugmentation';
import * as React from 'react';
import dynamic from 'next/dynamic';
import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import AppNavbar from '@/features/layout/navbar/AppNavbar';
import Header from '@/features/layout/header/Header';
import SideMenu from '@/features/layout/sidebar/SideMenu';
import AppTheme from '@/theme/AppTheme';
import AppProviders from '@/features/providers/AppProviders';
import { RbacProvider } from '@/features/auth/rbac';
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from '@/theme/customizations';

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

const DRAWER_WIDTH = 240;
const MINI_DRAWER_WIDTH = 64;
const SIDEBAR_KEY = 'app-sidebar-open';

const MainGrid = dynamic(() => import('@/features/dashboard/MainGrid'), { ssr: false });

function loadSidebarState(): boolean {
  if (typeof window === 'undefined') return true;
  try {
    return localStorage.getItem(SIDEBAR_KEY) !== 'collapsed';
  } catch {
    return true;
  }
}

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    setSidebarOpen(loadSidebarState());
    setHydrated(true);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => {
      const next = !prev;
      if (hydrated) {
        try { localStorage.setItem(SIDEBAR_KEY, next ? 'expanded' : 'collapsed'); } catch { /* noop */ }
      }
      return next;
    });
  };

  return (
    <AppTheme themeComponents={xThemeComponents}>
      <AppProviders>
        <RbacProvider roles={['admin']}>
          <CssBaseline enableColorScheme />
          <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <SideMenu open={sidebarOpen} />

            <Header
              sidebarOpen={sidebarOpen}
              onToggleSidebar={toggleSidebar}
              drawerWidth={sidebarOpen ? DRAWER_WIDTH : MINI_DRAWER_WIDTH}
            />

            <AppNavbar />

            <Box
              component="main"
              sx={(theme) => ({
                flexGrow: 1,
                overflow: 'auto',
                minHeight: '100vh',
                backgroundColor: theme.vars
                  ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
                  : alpha(theme.palette.background.default, 1),
              })}
            >
              <Box sx={{ display: { xs: 'block', md: 'none' }, height: 56 }} />
              <Box sx={{ display: { xs: 'none', md: 'block' }, height: 48 }} />
              <Box sx={{ px: 3, pb: 5 }}>
                <MainGrid />
              </Box>
            </Box>
          </Box>
        </RbacProvider>
      </AppProviders>
    </AppTheme>
  );
}
