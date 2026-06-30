'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import SideMenuMobile from './SideMenuMobile';
import MenuButton from '@/features/notifications/MenuButton';
import ColorModeIconDropdown from '@/features/layout/header/ColorModeIconDropdown';

export default function AppNavbar() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <Box
      sx={{
        display: { xs: 'block', md: 'none' },
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1200,
        px: 1.5,
        py: 1,
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        borderBottom: 1,
        borderColor: 'divider',
        bgcolor: 'rgba(255, 255, 255, 0.6)',
        color: 'grey.800',
        '[data-mui-color-scheme="dark"] &': {
          bgcolor: 'rgba(18, 18, 18, 0.6)',
          color: 'grey.200',
        },
      }}
    >
      <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
        <Stack direction="row" spacing={1} sx={{ mr: 'auto', alignItems: 'center' }}>
          <Box
            sx={{
              width: '1.5rem',
              height: '1.5rem',
              borderRadius: '999px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundImage:
                'linear-gradient(135deg, hsl(210, 98%, 60%) 0%, hsl(210, 100%, 35%) 100%)',
              color: 'hsla(210, 100%, 95%, 0.9)',
              border: '1px solid',
              borderColor: 'hsl(210, 100%, 55%)',
              boxShadow: 'inset 0 2px 5px rgba(255, 255, 255, 0.3)',
            }}
          >
            <DashboardRoundedIcon color="inherit" sx={{ fontSize: '1rem' }} />
          </Box>
          <Typography variant="h4" component="h1" sx={{ color: 'text.primary' }}>
            Dashboard
          </Typography>
        </Stack>
        <ColorModeIconDropdown />
        <MenuButton aria-label="menu" onClick={toggleDrawer(true)}>
          <MenuRoundedIcon />
        </MenuButton>
        <SideMenuMobile open={open} toggleDrawer={toggleDrawer} />
      </Stack>
    </Box>
  );
}
