import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Badge,
} from "@material-ui/core";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  AccountCircle,
  Notifications as NotificationsIcon,
  MoreVert as MoreIcon,
} from "@material-ui/icons";
import { useStyles } from "styles/headerStyles";
import { menuId, NavigationMenu } from "./NavigationMenu";
import { MobileMenu, mobileMenuId } from "./MobileMenu";
import { useSelector } from "react-redux";
import { NotificationsMenu, notificationsMenuId } from "./NotificationsMenu";

const notifications = [1];
export const AppHeader = ({ children }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [notifAnchorEl, setNotifAnchorEl] = React.useState(null);

  const appState = useSelector((state) => state);
  const {
    login: {
      userInfo: { user },
    },
  } = appState;

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleNavMenuOpen = (event) => {
    setMobileMoreAnchorEl(null);
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h4" noWrap>
            Augmented Reality Innovations
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div className={classes.grow} />
          {Boolean(user?.fullName) && (
            <div className={classes.sectionDesktop}>
              <IconButton
                aria-label={`show ${notifications.length} new notifications`}
                color="inherit"
                aria-controls={notificationsMenuId}
                aria-haspopup="true"
                onClick={({ currentTarget }) => setNotifAnchorEl(currentTarget)}
              >
                <Badge badgeContent={notifications.length} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleNavMenuOpen}
                color="inherit"
              >
                {user.fullName} <AccountCircle />
              </IconButton>
            </div>
          )}
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <NavigationMenu
        anchorEl={anchorEl}
        isMenuOpen={isMenuOpen}
        handleMenuClose={handleMenuClose}
        user={user}
      />
      <MobileMenu
        mobileMoreAnchorEl={mobileMoreAnchorEl}
        isMobileMenuOpen={isMobileMenuOpen}
        handleMobileMenuClose={handleMobileMenuClose}
        handleNavMenuOpen={handleNavMenuOpen}
        user={user}
        notifications={notifications}
      />
      <NotificationsMenu
        anchorEl={notifAnchorEl}
        onClose={() => setNotifAnchorEl(null)}
      />
      {children}
    </div>
  );
};
