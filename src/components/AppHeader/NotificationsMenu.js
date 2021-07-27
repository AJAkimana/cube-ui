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
import { Link } from "react-router-dom";
import { notifUser } from "utils/helper";

export const notificationsMenuId = "notifications-menu";

export const NotificationsMenu = ({ anchorEl, onClose, user }) => {
  const appState = useSelector((state) => state);
  const {
    notifsGet: { notifs, loading },
  } = appState;
  const toLink = (notif = {}) => {
    let url = `/dashboard/projects/${notif.project}`;
    if (notif.quote) {
      url = "/dashboard/quotes";
    }
    return url;
  };
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
          <MenuItem
            onClick={onClose}
            key={notifIdx}
            component={Link}
            to={toLink(notif)}
          >
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
                      ({notifUser(user, notif)})
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
