import React from "react";
import { ButtonGroup, IconButton, Tooltip } from "@material-ui/core";
import {
  EditRounded as EditIcon,
  Publish as PublishIcon,
  ViewComfy as ViewComfyIcon,
} from "@material-ui/icons";

export const projectColumns = (onProjectClick, user = {}) => [
  { path: "name", label: "Project name" },
  { path: "type", label: "Type" },
  { path: "status", label: "Status" },
  { path: "budget", label: "Budget" },
  {
    content: (item) => (
      <ButtonGroup variant="outlined">
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
        {user.role === "Manager" && (
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
