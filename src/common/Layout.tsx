import React, { MouseEvent, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Divider,
  Drawer,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { AccountCircle } from '@material-ui/icons';

import { useTokenContext } from '../store';
import { AuthAPI } from '.';

const menuEntries = [
  { label: 'Accueil', url: '/' },
  { label: 'Cours', url: '/lessons' },
  { label: 'Professeurs', url: '/teachers' },
  { label: 'Salles', url: '/rooms' },
  { label: 'Goodies', url: '/goodies' },
  { label: 'Commandes', url: '/orders' },
  { label: 'Adhérents', url: '/members' },
  { label: 'Pré-inscriptions', url: '/pre-registrations' },
];

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  title: {
    flexGrow: 1,
  },
  drawer: {
    flexShrink: 0,
    width: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
}));

interface Props {
  title: string;
  actions?: string[];
}

const Layout: React.FC<Props> = ({ title, actions, children }) => {
  const classes = useStyles();
  const [token, setToken] = useTokenContext();
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null);
  const isMenuOpen = Boolean(menuAnchorEl);

  const handleMenuOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleLogout = () => {
    const logout = async (accessToken: string) => {
      try {
        await AuthAPI.logout(accessToken);
        sessionStorage.removeItem('token');
        setToken({});
      } catch (e) {
        console.error('Failed to logout:', e.message);
      }
    };

    if (!token || !token.access_token) {
      return;
    }

    logout(token.access_token);
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="fixed">
        <Toolbar>
          <Typography className={classes.title} noWrap variant="h6">
            {title}
          </Typography>
          <IconButton
            aria-controls="menu-appbar"
            aria-haspopup="true"
            aria-label="Compte utilisateur"
            color="inherit"
            onClick={handleMenuOpen}
          >
            <AccountCircle />
          </IconButton>
          <Menu
            anchorEl={menuAnchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            id="menu-appbar"
            open={isMenuOpen}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => console.log('Change password')}>
              Changer de mot de passe
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              Déconnexion
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        classes={{ paper: classes.drawerPaper }}
        variant="permanent"
      >
        <div className={classes.toolbar} />
        {actions && (
          <>
            <List>
              {actions.map((text) => (
                <ListItem key={text} button>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
            <Divider />
          </>
        )}
        <List>
          {menuEntries.map((entry) => (
            <Link
              key={entry.label}
              color="inherit"
              component={RouterLink}
              to={entry.url}
              underline="none"
            >
              <ListItem button>
                <ListItemText primary={entry.label} />
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
};

export default Layout;
