'use client';

import * as React from 'react';

export interface RbacState {
  roles: string[];
  hasRole: (role: string) => boolean;
  hasAnyRole: (roles: string[]) => boolean;
}

export const RbacContext = React.createContext<RbacState>({
  roles: [],
  hasRole: () => false,
  hasAnyRole: () => false,
});

interface RbacProviderProps {
  /** Current user roles (e.g. from JWT, session, etc.) */
  roles?: string[];
  children: React.ReactNode;
}

export function RbacProvider({ roles = ['admin'], children }: RbacProviderProps) {
  const value = React.useMemo<RbacState>(
    () => ({
      roles,
      hasRole: (role: string) => roles.includes(role),
      hasAnyRole: (requested: string[]) =>
        requested.some((r) => roles.includes(r)),
    }),
    [roles],
  );

  return <RbacContext.Provider value={value}>{children}</RbacContext.Provider>;
}

/** Hook to access RBAC context */
export function useRoles() {
  return React.useContext(RbacContext);
}
