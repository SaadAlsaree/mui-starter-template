'use client';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import SelectContent from '@/features/settings/SelectContent';
import MenuContent from './MenuContent';
import CardAlert from './CardAlert';
import OptionsMenu from '@/features/settings/OptionsMenu';

const DRAWER_WIDTH = 240;
const MINI_DRAWER_WIDTH = 64;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})<{ open?: boolean }>(({ theme }) => ({
  width: DRAWER_WIDTH,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  [`& .${drawerClasses.paper}`]: {
    width: DRAWER_WIDTH,
    boxSizing: 'border-box',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
  },
  variants: [
    {
      props: ({ open }) => !open,
      style: {
        width: MINI_DRAWER_WIDTH,
        [`& .${drawerClasses.paper}`]: {
          width: MINI_DRAWER_WIDTH,
        },
      },
    },
  ],
}));

interface SideMenuProps {
  open?: boolean;
}

export default function SideMenu({ open = true }: SideMenuProps) {
  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        display: { xs: 'none', md: 'block' },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: 'background.paper',
        },
      }}
    >
      {/* Brand */}
      {open && (
        <Box sx={{ mt: 'calc(var(--template-frame-height, 0px) + 4px)', p: 1.5 }}>
          <SelectContent />
        </Box>
      )}
      {!open && (
        <Box sx={{ mt: 'calc(var(--template-frame-height, 0px) + 4px)', height: 8 }} />
      )}

      <Divider />

      {/* Dynamic RBAC-aware navigation */}
      <Box sx={{ overflow: 'auto', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <MenuContent expanded={open} />
        {open && <CardAlert />}
      </Box>

      {/* User profile */}
      <Stack
        direction="row"
        sx={{
          p: open ? 2 : 1,
          gap: 1,
          alignItems: 'center',
          borderTop: '1px solid',
          borderColor: 'divider',
          justifyContent: open ? 'flex-start' : 'center',
        }}
      >
        <Avatar
          sizes="small"
          alt="Riley Carter"
          src="/static/images/avatar/7.jpg"
          sx={{ width: 36, height: 36 }}
        />
        {open && (
          <>
            <Box sx={{ mr: 'auto', minWidth: 0 }}>
              <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: '16px' }} noWrap>
                Riley Carter
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }} noWrap>
                riley@email.com
              </Typography>
            </Box>
            <OptionsMenu />
          </>
        )}
      </Stack>
    </Drawer>
  );
}
