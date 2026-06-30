import { z } from 'zod';

/**
 * Shared validation schemas for the app.
 * Import and compose these schemas in your forms.
 */

// ─── Auth ───────────────────────────────────────────────────────
export const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export type LoginInput = z.infer<typeof loginSchema>;

// ─── Profile ────────────────────────────────────────────────────
export const profileSchema = z.object({
  name: z.string().min(2, 'Name is required').max(100),
  email: z.string().email('Invalid email'),
  role: z.enum(['admin', 'manager', 'editor', 'viewer']).optional(),
});

export type ProfileInput = z.infer<typeof profileSchema>;

// ─── Search / Filter ────────────────────────────────────────────
export const searchSchema = z.object({
  query: z.string().min(1, 'Search query is required').max(200),
});

export type SearchInput = z.infer<typeof searchSchema>;

// ─── Settings ───────────────────────────────────────────────────
export const settingsSchema = z.object({
  language: z.enum(['en', 'ar']),
  theme: z.enum(['light', 'dark', 'system']),
  sidebarCollapsed: z.boolean().optional(),
});

export type SettingsInput = z.infer<typeof settingsSchema>;
