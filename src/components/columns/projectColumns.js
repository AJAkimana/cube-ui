import React from "react";
import {
  ButtonGroup,
  IconButton,
  ListItem,
  ListItemText,
  Tooltip,
  Typography,
} from "@material-ui/core";
import {
  EditRounded as EditIcon,
  Publish as PublishIcon,
  ViewComfy as ViewComfyIcon,
} from "@material-ui/icons";

export const projectOwnerCol = (user = {}) => {
  return user.role !== "Client"
    ? [
        {
          content: (item) => <Typography>{item?.user?.fullName}</Typography>,
          label: "Project Owner",
        },
      ]
    : [];
};

export const projectColumns = (onProjectClick, user = {}) => [
  {
    content: (item) => (
      <ListItem>
        <ListItemText primary={item.name} secondary={item.type} />
      </ListItem>
    ),
    label: "Project",
  },
  ...projectOwnerCol(user),
  { path: "type", label: "Type" },
  { path: "status", label: "Status" },
  {
    content: (item) => (
      <Typography>$ {item.budget?.toLocaleString("en-US")}</Typography>
    ),
    label: "Budget",
  },
  {
    content: (item) => (
      <ButtonGroup variant="outlined" size="small">
        <Tooltip title="View">
          <IconButton
            aria-label="View"
            color="secondary"
            onClick={() => onProjectClick(item, "view")}
          >
            <ViewComfyIcon /> View
          </IconButton>
        </Tooltip>
        {user.role === "Client" && (
          <Tooltip title="Edit">
            <IconButton
              aria-label="Edit"
              color="secondary"
              disabled={item.status === "approved"}
              onClick={() => onProjectClick(item, "edit")}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
        )}
        {user.role !== "Client" && (
          <Tooltip title="Change status">
            <IconButton
              aria-label="Change status"
              color="default"
              disabled={item.status === "approved"}
              onClick={() => onProjectClick(item, "change")}
            >
              <PublishIcon />
            </IconButton>
          </Tooltip>
        )}
        {user.role === "Admin" && (
          <Tooltip title="Change project manager">
            <IconButton
              aria-label="Change project manager"
              color="default"
              disabled={item.status === "approved"}
              onClick={() => onProjectClick(item, "changePm")}
            >
              Change PM
            </IconButton>
          </Tooltip>
        )}
      </ButtonGroup>
    ),
    label: "Actions",
  },
];
