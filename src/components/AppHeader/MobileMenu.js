import React from "react";
import { IconButton, Badge, MenuItem, Menu } from "@material-ui/core";
import {
  AccountCircle,
  Notifications as NotificationsIcon,
} from "@material-ui/icons";

export const mobileMenuId = "primary-search-account-menu-mobile";
export const MobileMenu = ({
  mobileMoreAnchorEl,
  isMobileMenuOpen,
  handleMobileMenuClose,
  handleNavMenuOpen,
  user,
  notificationsCount = 0,
}) => (
  <Menu
    anchorEl={mobileMoreAnchorEl}
    anchorOrigin={{ vertical: "top", horizontal: "right" }}
    id={mobileMenuId}
    keepMounted
    transformOrigin={{ vertical: "top", horizontal: "right" }}
    open={isMobileMenuOpen}
    onClose={handleMobileMenuClose}
  >
    <MenuItem>
      <IconButton
        aria-label={`show ${notificationsCount} new notifications`}
        color="inherit"
        aria-controls="notifications-menu"
        aria-haspopup="true"
      >
        <Badge badgeContent={notificationsCount} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <p>Notifications</p>
    </MenuItem>
    {Boolean(user?.fullName) && (
      <MenuItem onClick={handleNavMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>{user.fullName}</p>
      </MenuItem>
    )}
  </Menu>
);
