/// <reference types="vitest" />
import '@testing-library/jest-dom/vitest';
import { server } from '@/mocks/server';
import { beforeAll, afterAll, afterEach } from 'vitest';

// Start MSW server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// Suppress MUI DataGrid pseudo-class warnings in tests
const originalError = console.error;
console.error = (...args: unknown[]) => {
  const msg = String(args[0] ?? '');
  if (msg.includes(':first-child') || msg.includes(':last-child')) return;
  originalError.call(console, ...args);
};
