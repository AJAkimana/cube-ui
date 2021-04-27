import React from "react";
import { ButtonGroup, IconButton, Tooltip } from "@material-ui/core";
import {
  EditRounded as EditIcon,
  Publish as PublishIcon,
} from "@material-ui/icons";

export const projectColumns = (onProjectClick) => [
  { path: "name", label: "Project name" },
  { path: "type", label: "Type" },
  { path: "status", label: "Status" },
  { path: "description", label: "Description" },
  {
    content: (item) => (
      <ButtonGroup variant="outlined">
        <Tooltip title="Edit">
          <IconButton
            aria-label="Edit"
            color="secondary"
            onClick={() => onProjectClick(item, "edit")}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Change status">
          <IconButton
            aria-label="Change status"
            color="default"
            onClick={() => onProjectClick(item, "change")}
          >
            <PublishIcon />
          </IconButton>
        </Tooltip>
      </ButtonGroup>
    ),
    label: "Actions",
  },
];
