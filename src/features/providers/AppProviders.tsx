import AxeProvider from '@/features/a11y/AxeProvider';
'use client';

import * as React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { Toaster } from 'sonner';
import { ErrorBoundary } from 'react-error-boundary';
import type { FallbackProps } from 'react-error-boundary';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        retry: 2,
        refetchOnWindowFocus: false,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

function getQueryClient() {
  if (typeof window === 'undefined') return makeQueryClient();
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
}

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        gap: 3,
        p: 4,
      }}
    >
      <Alert severity="error" sx={{ maxWidth: 500 }}>
        <Typography variant="h6">Ø­Ø¯Ø« Ø®Ø·Ø£ ØºÙŠØ± Ù…ØªÙˆÙ‚Ø¹</Typography>
        <Typography variant="body2" sx={{ mt: 1, fontFamily: 'monospace' }}>
          {error instanceof Error ? error.message : String(error)}
        </Typography>
      </Alert>
      <Button variant="contained" onClick={resetErrorBoundary}>
        Ø¥Ø¹Ø§Ø¯Ø© ØªØ­Ù…ÙŠÙ„
      </Button>
    </Box>
  );
}

interface AppProvidersProps {
  children: React.ReactNode;
}

export default function AppProviders({ children }: AppProvidersProps) {
  const queryClient = getQueryClient();

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <QueryClientProvider client={queryClient}>
        {children}
        <AxeProvider />
        <Toaster
          position="top-right"
          richColors
          closeButton
          dir="auto"
        />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
