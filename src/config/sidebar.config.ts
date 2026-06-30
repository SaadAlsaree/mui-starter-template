import type { SvgIconComponent } from '@mui/icons-material';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded';

export interface SidebarMenuItem {
  id: string;
  text: string;
  icon: SvgIconComponent;
  roles?: string[];
  children?: SidebarMenuItem[];
  badge?: number;
  divider?: boolean;
}

export const ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  EDITOR: 'editor',
  VIEWER: 'viewer',
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

export const ICON_MAP: Record<string, SvgIconComponent> = {
  home: HomeRoundedIcon,
  analytics: AnalyticsRoundedIcon,
  clients: PeopleRoundedIcon,
  tasks: AssignmentRoundedIcon,
  settings: SettingsRoundedIcon,
  about: InfoRoundedIcon,
  feedback: HelpRoundedIcon,
  admin: AdminPanelSettingsRoundedIcon,
  dashboard: DashboardRoundedIcon,
  security: SecurityRoundedIcon,
};

export const sidebarConfig: SidebarMenuItem[] = [
  {
    id: 'home',
    text: 'Home',
    icon: HomeRoundedIcon,
  },
  {
    id: 'analytics',
    text: 'Analytics',
    icon: AnalyticsRoundedIcon,
    roles: [ROLES.ADMIN, ROLES.MANAGER, ROLES.EDITOR],
  },
  {
    id: 'clients',
    text: 'Clients',
    icon: PeopleRoundedIcon,
    roles: [ROLES.ADMIN, ROLES.MANAGER],
  },
  {
    id: 'tasks',
    text: 'Tasks',
    icon: AssignmentRoundedIcon,
  },
  {
    id: 'admin',
    text: 'Administration',
    icon: AdminPanelSettingsRoundedIcon,
    roles: [ROLES.ADMIN],
    divider: true,
    children: [
      {
        id: 'admin-dashboard',
        text: 'Dashboard',
        icon: DashboardRoundedIcon,
        roles: [ROLES.ADMIN],
      },
      {
        id: 'admin-security',
        text: 'Security',
        icon: SecurityRoundedIcon,
        roles: [ROLES.ADMIN],
      },
    ],
  },
  {
    id: 'settings',
    text: 'Settings',
    icon: SettingsRoundedIcon,
    divider: true,
  },
  {
    id: 'about',
    text: 'About',
    icon: InfoRoundedIcon,
  },
  {
    id: 'feedback',
    text: 'Feedback',
    icon: HelpRoundedIcon,
  },
];

export function filterByRoles(
  items: SidebarMenuItem[],
  userRoles: string[],
): SidebarMenuItem[] {
  return items
    .map((item) => {
      const canSee = !item.roles || item.roles.some((r) => userRoles.includes(r));
      const filteredChildren = item.children
        ? filterByRoles(item.children, userRoles)
        : undefined;

      if (filteredChildren !== undefined) {
        if (filteredChildren.length === 0 && !canSee) return null;
        return { ...item, children: filteredChildren };
      }

      if (!canSee) return null;
      return item;
    })
    .filter((item): item is SidebarMenuItem => item !== null);
}
