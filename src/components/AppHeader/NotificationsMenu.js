import React from "react";
import {
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import moment from "moment";

export const notificationsMenuId = "notifications-menu";
export const NotificationsMenu = ({ anchorEl, onClose }) => {
  return (
    <Menu
      id={notificationsMenuId}
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={onClose}
      PaperProps={{
        style: {
          maxWidth: 400,
          width: "30ch",
        },
      }}
    >
      <MenuItem onClick={onClose}>
        <ListItem alignItems="flex-start">
          <ListItemText
            primary="Some desciption"
            secondary={
              <>
                <Typography
                  component="span"
                  variant="body2"
                  style={{ display: "inline" }}
                  color="textPrimary"
                >
                  Client
                </Typography>
                {` — ${moment().fromNow()}`}
              </>
            }
          />
        </ListItem>
      </MenuItem>
    </Menu>
  );
};
