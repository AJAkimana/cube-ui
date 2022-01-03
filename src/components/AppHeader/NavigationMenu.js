import React from "react";
import { MenuItem, Menu, Divider } from "@material-ui/core";
import { Link } from "react-router-dom";
import { signout } from "redux/actions/user";

export const menuId = "primary-search-account-menu";

export const NavigationMenu = ({
  anchorEl,
  isMenuOpen,
  handleMenuClose,
  user,
}) => {
  let navigations = [
    { link: "analytics", title: "Analytics" },
    { link: "products", title: "3D assets" },
    { link: "projects", title: "Projects" },
    { link: "quotes", title: "Proposals" },
    { link: "invoices", title: "Invoices" },
    { link: "subscriptions", title: "Subscriptions" },
    { link: "profile", title: "My profile" },
  ];
  if (user && user.role !== "Client") {
    navigations = [{ link: "customers", title: "Customers" }, ...navigations];
  }
  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {navigations.map((item, itemIdx) => (
        <MenuItem
          onClick={handleMenuClose}
          component={Link}
          to={`/dashboard/${item.link}`}
          key={itemIdx}
        >
          {item.title}
        </MenuItem>
      ))}
      <Divider />
      <MenuItem onClick={() => signout()}>Sign Out</MenuItem>
    </Menu>
  );
};
