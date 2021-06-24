import React from "react";
import {
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import moment from "moment";
import { useSelector } from "react-redux";
import Loading from "components/loading.component";

export const notificationsMenuId = "notifications-menu";
export const NotificationsMenu = ({ anchorEl, onClose }) => {
  const appState = useSelector((state) => state);
  const {
    notifsGet: { notifs, loading },
  } = appState;
  return (
    <Menu
      id={notificationsMenuId}
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={onClose}
    >
      {loading ? (
        <Loading />
      ) : notifs.length ? (
        notifs.map((notif, notifIdx) => (
          <MenuItem onClick={onClose} key={notifIdx}>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={notif.description}
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      style={{ display: "inline" }}
                      color="textPrimary"
                    >
                      ({notif.userRole})
                    </Typography>
                    {` — ${moment(notif.createdAt).fromNow()}`}
                  </>
                }
              />
            </ListItem>
          </MenuItem>
        ))
      ) : (
        <MenuItem onClick={onClose}> No new notification</MenuItem>
      )}
    </Menu>
  );
};
