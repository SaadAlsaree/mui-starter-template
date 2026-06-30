/// <reference types="vitest" />
import '@testing-library/jest-dom/vitest';

// Suppress MUI DataGrid pseudo-class warnings in tests
const originalError = console.error;
console.error = (...args: unknown[]) => {
  const msg = String(args[0] ?? '');
  if (msg.includes(':first-child') || msg.includes(':last-child')) return;
  originalError.call(console, ...args);
};
