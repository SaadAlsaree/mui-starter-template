'use client';

import * as React from 'react';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { prefixer } from 'stylis';
import rtlPlugin from '@mui/stylis-plugin-rtl';
import { ThemeProvider, createTheme, useColorScheme } from '@mui/material/styles';
import type { ThemeOptions } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import { gray, brand } from './themePrimitives';

const ltrCache = createCache({
  key: 'muiltr',
  stylisPlugins: [prefixer],
});

const rtlCache = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

export const DirectionContext = React.createContext({
  direction: 'ltr' as 'ltr' | 'rtl',
  toggleDirection: () => {},
});

interface AppThemeProps {
  children: React.ReactNode;
  disableCustomTheme?: boolean;
  themeComponents?: Record<string, unknown>;
}

// Must run at module level — before any Emotion/stylis processing
// Silences known MUI DataGrid console.error about :first-child in dev
if (typeof window !== 'undefined') {
  const _error = console.error.bind(console);
  console.error = (...args: unknown[]) => {
    const m = String(args[0] ?? '');
    if (m.includes(':first-child') && m.includes('server-side rendering')) return;
    if (m.includes(':last-child') && m.includes('server-side rendering')) return;
    _error(...args);
  };
}

const DIRECTION_KEY = 'app-direction';

function loadDirection(): 'ltr' | 'rtl' {
  if (typeof window === 'undefined') return 'ltr';
  try {
    return localStorage.getItem(DIRECTION_KEY) === 'rtl' ? 'rtl' : 'ltr';
  } catch {
    return 'ltr';
  }
}

function createAppTheme(direction: 'ltr' | 'rtl', components?: Record<string, unknown>) {
  const baseTheme: ThemeOptions = {
    direction,
    cssVariables: {
      colorSchemeSelector: 'data-mui-color-scheme',
      cssVarPrefix: 'template',
    },
    colorSchemes: {
      light: {
        palette: {
          primary: { main: brand[500], light: brand[300], dark: brand[700], contrastText: brand[50] },
          grey,
          divider: gray[200],
          background: { default: 'hsl(0, 0%, 99%)', paper: 'hsl(220, 35%, 97%)' },
          text: { primary: gray[800], secondary: gray[600] },
          action: { hover: gray[100], selected: gray[200] },
        },
      },
      dark: {
        palette: {
          primary: { main: brand[400], light: brand[300], dark: brand[700], contrastText: brand[50] },
          grey,
          divider: gray[700],
          background: { default: gray[900], paper: 'hsl(220, 30%, 7%)' },
          text: { primary: 'hsl(0, 0%, 100%)', secondary: gray[400] },
          action: { hover: gray[800], selected: gray[700] },
        },
      },
    },
    shape: { borderRadius: 8 },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h4: { fontSize: '1.5rem', fontWeight: 600 },
      h5: { fontSize: '1.25rem', fontWeight: 600 },
      h6: { fontSize: '1.1rem', fontWeight: 600 },
      subtitle2: { fontWeight: 600 },
      body1: { fontSize: '0.875rem', fontWeight: 400 },
      body2: { fontSize: '0.875rem', fontWeight: 400 },
      caption: { fontSize: '0.75rem', fontWeight: 400 },
    },
    components: {
      MuiButton: { styleOverrides: { root: { textTransform: 'none', borderRadius: '8px' } } },
      MuiCard: { styleOverrides: { root: { borderRadius: '12px' } } },
      MuiCssBaseline: { styleOverrides: { body: { fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif' } } },
      ...components,
    },
  };
  return createTheme(baseTheme);
}

export default function AppTheme({ children, disableCustomTheme, themeComponents }: AppThemeProps) {
  const [dir, setDir] = React.useState<'ltr' | 'rtl'>('ltr');
  const [hydrated, setHydrated] = React.useState(false);

  // Load persisted direction on mount
  React.useEffect(() => {
    setDir(loadDirection());
    setHydrated(true);
  }, []);

  // Persist direction + sync html dir attribute
  React.useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(DIRECTION_KEY, dir);
    } catch { /* noop */ }
    document.documentElement.setAttribute('dir', dir);
  }, [dir, hydrated]);

  const directionContext = React.useMemo(
    () => ({
      direction: dir,
      toggleDirection: () => setDir((prev) => (prev === 'ltr' ? 'rtl' : 'ltr')),
    }),
    [dir],
  );

  const theme = React.useMemo(() => createAppTheme(dir, themeComponents), [dir, themeComponents]);

  if (disableCustomTheme) {
    return <>{children}</>;
  }

  return (
    <DirectionContext.Provider value={directionContext}>
      <CacheProvider value={dir === 'rtl' ? rtlCache : ltrCache}>
        <ThemeProvider theme={theme} defaultMode="light" noSsr disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </CacheProvider>
    </DirectionContext.Provider>
  );
}

export { useColorScheme };
