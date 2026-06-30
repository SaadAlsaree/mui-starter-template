'use client';

import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import ModeNightRoundedIcon from '@mui/icons-material/ModeNightRounded';
import { useColorScheme } from '@/theme/AppTheme';

export default function ColorModeIconDropdown() {
  const { mode, setMode } = useColorScheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // Handle initial undefined mode (first render before hydration)
  // Per MUI docs: "mode is always undefined on first render"
  const currentMode = mode || 'light';

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <IconButton
        onClick={handleClick}
        size="small"
        aria-label="Toggle color mode"
      >
        {currentMode === 'dark' ? (
          <ModeNightRoundedIcon fontSize="small" />
        ) : (
          <WbSunnyRoundedIcon fontSize="small" />
        )}
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem
          onClick={() => { setMode('light'); handleClose(); }}
          selected={currentMode === 'light'}
        >
          <ListItemIcon>
            <WbSunnyRoundedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Light</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => { setMode('dark'); handleClose(); }}
          selected={currentMode === 'dark'}
        >
          <ListItemIcon>
            <ModeNightRoundedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Dark</ListItemText>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
