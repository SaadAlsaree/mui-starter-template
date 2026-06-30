import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useRoles } from '@/features/auth/rbac';
import { filterByRoles, sidebarConfig, type SidebarMenuItem } from '@/config/sidebar.config';

interface MenuContentProps {
  expanded?: boolean;
}

export default function MenuContent({ expanded = true }: MenuContentProps) {
  const { roles } = useRoles();
  const visibleItems = React.useMemo(
    () => filterByRoles(sidebarConfig, roles),
    [roles],
  );

  return (
    <List dense sx={{ flex: 1, overflow: 'auto' }}>
      {visibleItems.map((item: SidebarMenuItem) => (
        <SidebarItemRenderer key={item.id} item={item} expanded={expanded} depth={0} />
      ))}
    </List>
  );
}

function SidebarItemRenderer({
  item,
  expanded,
  depth,
}: {
  item: SidebarMenuItem;
  expanded: boolean;
  depth: number;
}) {
  const [subOpen, setSubOpen] = React.useState(false);
  const hasChildren = item.children && item.children.length > 0;
  const Icon = item.icon;

  const handleClick = () => {
    if (hasChildren) setSubOpen((prev) => !prev);
  };

  const button = (
    <ListItemButton
      onClick={handleClick}
      selected={false}
      sx={{
        justifyContent: expanded ? 'initial' : 'center',
        px: expanded ? 2 : 1,
        pl: expanded ? 2 + depth * 2 : 1,
        borderRadius: 1.5,
        mx: 0.5,
        mb: 0.25,
        minHeight: 40,
      }}
    >
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: expanded ? 2 : 'auto',
          justifyContent: 'center',
        }}
      >
        <Icon fontSize="small" />
      </ListItemIcon>
      {expanded && (
        <>
          <ListItemText
            primary={item.text}
            slotProps={{ primary: { variant: 'body2' } }}
          />
          {hasChildren && (subOpen ? <ExpandLess /> : <ExpandMore />)}
        </>
      )}
    </ListItemButton>
  );

  const listItem = (
    <ListItem disablePadding>
      {!expanded && !hasChildren ? (
        <Tooltip title={item.text} placement="right" arrow>
          {button}
        </Tooltip>
      ) : (
        button
      )}
    </ListItem>
  );

  return (
    <Box>
      {item.divider && <Divider sx={{ my: 0.5 }} />}
      {listItem}
      {hasChildren && expanded && (
        <Collapse in={subOpen} timeout="auto" unmountOnExit>
          <List dense disablePadding>
            {item.children!.map((child: SidebarMenuItem) => (
              <SidebarItemRenderer
                key={child.id}
                item={child}
                expanded={expanded}
                depth={depth + 1}
              />
            ))}
          </List>
        </Collapse>
      )}
    </Box>
  );
}
