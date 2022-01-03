import React from "react";
import { ButtonGroup, IconButton, Tooltip } from "@material-ui/core";
import {
  EditRounded as EditIcon,
  ViewComfy as ViewComfyIcon,
  DeleteForeverRounded as DeleteIcon,
} from "@material-ui/icons";

export const userColumns = (onUserClick) => [
  { path: "fullName", label: "Names" },
  { path: "email", label: "Email" },
  { path: "phoneNumber", label: "Phone number" },
  { path: "role", label: "User role" },
  { path: "companyName", label: "Company" },
  {
    content: (item) => (
      <ButtonGroup variant="outlined" size="small">
        <Tooltip title="View">
          <IconButton
            aria-label="View"
            color="secondary"
            onClick={() => onUserClick(item, "view")}
          >
            <ViewComfyIcon /> View
          </IconButton>
        </Tooltip>
        <Tooltip title="Edit">
          <IconButton
            aria-label="Edit"
            color="secondary"
            onClick={() => onUserClick(item, "edit")}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton
            aria-label="Delete"
            color="danger"
            onClick={() => onUserClick(item, "delete")}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </ButtonGroup>
    ),
    label: "Actions",
  },
];
