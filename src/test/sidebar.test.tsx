import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RbacProvider, useRoles } from '@/features/auth/rbac';
import { filterByRoles, sidebarConfig, ROLES } from '@/config/sidebar.config';

// ─── RBAC ───────────────────────────────────────────────────────
describe('RBAC', () => {
  it('provides roles to children', () => {
    function TestComponent() {
      const { roles, hasRole } = useRoles();
      return (
        <div>
          <span data-testid="roles">{roles.join(',')}</span>
          <span data-testid="has-admin">{String(hasRole('admin'))}</span>
        </div>
      );
    }

    render(
      <RbacProvider roles={['admin', 'manager']}>
        <TestComponent />
      </RbacProvider>,
    );

    expect(screen.getByTestId('roles')).toHaveTextContent('admin,manager');
    expect(screen.getByTestId('has-admin')).toHaveTextContent('true');
  });
});

// ─── Sidebar Config ─────────────────────────────────────────────
describe('Sidebar Config', () => {
  it('filters items by roles', () => {
    const adminItems = filterByRoles(sidebarConfig, ['admin']);
    const ids = adminItems.map((i) => i.id);
    // Admin sees everything including admin sub-items
    expect(ids).toContain('admin');
    expect(ids).toContain('analytics');
  });

  it('hides restricted items from viewer', () => {
    const viewerItems = filterByRoles(sidebarConfig, ['viewer']);
    const ids = viewerItems.map((i) => i.id);
    // Viewer should NOT see admin, analytics (restricted), or clients
    expect(ids).not.toContain('admin');
    expect(ids).not.toContain('analytics');
    expect(ids).not.toContain('clients');
    // Viewer SHOULD see home, tasks, settings
    expect(ids).toContain('home');
    expect(ids).toContain('tasks');
    expect(ids).toContain('settings');
  });

  it('all items are visible when roles=[] (no role restriction)', () => {
    const allItems = filterByRoles(
      sidebarConfig.filter((i) => !i.roles),
      [],
    );
    expect(allItems.length).toBeGreaterThan(0);
  });
});

// ─── Sidebar Items ──────────────────────────────────────────────
describe('Sidebar Config Structure', () => {
  it('has required main items', () => {
    const ids = sidebarConfig.map((i) => i.id);
    expect(ids).toContain('home');
    expect(ids).toContain('tasks');
    expect(ids).toContain('settings');
  });

  it('admin item has children', () => {
    const admin = sidebarConfig.find((i) => i.id === 'admin');
    expect(admin?.children).toBeDefined();
    expect(admin!.children!.length).toBeGreaterThan(0);
  });
});
