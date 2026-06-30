'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import FormatTextdirectionLToRIcon from '@mui/icons-material/FormatTextdirectionLToR';
import FormatTextdirectionRToLIcon from '@mui/icons-material/FormatTextdirectionRToL';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import CustomDatePicker from './CustomDatePicker';
import NavbarBreadcrumbs from './NavbarBreadcrumbs';
import MenuButton from './MenuButton';
import ColorModeIconDropdown from '../theme/ColorModeIconDropdown';
import { DirectionContext } from '../theme/AppTheme';
import Search from './Search';

interface HeaderProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  drawerWidth: number;
}

export default function Header({ sidebarOpen, onToggleSidebar, drawerWidth }: HeaderProps) {
  const { direction, toggleDirection } = React.useContext(DirectionContext);
  const isRtl = direction === 'rtl';

  return (
    <Box
      sx={{
        display: { xs: 'none', md: 'flex' },
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        // RTL plugin automatically swaps margin-left ↔ margin-right
        // So marginLeft works for both: LTR=left margin, RTL=right margin
        marginLeft: `${drawerWidth}px`,
        zIndex: 1100,
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 1,
        px: 1.5,
        py: 1,
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        borderBottom: 1,
        borderColor: 'divider',
        bgcolor: 'rgba(255, 255, 255, 0.6)',
        color: 'grey.800',
        transition: 'margin-left 300ms ease, margin-right 300ms ease',
        '[data-mui-color-scheme="dark"] &': {
          bgcolor: 'rgba(18, 18, 18, 0.6)',
          color: 'grey.200',
        },
      }}
    >
      <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
        <IconButton onClick={onToggleSidebar} size="small" aria-label="Toggle sidebar">
          <MenuIcon />
        </IconButton>
        <NavbarBreadcrumbs />
      </Stack>

      <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
        <Search />
        <CustomDatePicker />
        <IconButton onClick={toggleDirection} size="small" aria-label="Toggle direction">
          {isRtl ? (
            <FormatTextdirectionLToRIcon fontSize="small" />
          ) : (
            <FormatTextdirectionRToLIcon fontSize="small" />
          )}
        </IconButton>
        <MenuButton showBadge aria-label="Open notifications">
          <NotificationsRoundedIcon />
        </MenuButton>
        <ColorModeIconDropdown />
      </Stack>
    </Box>
  );
}
