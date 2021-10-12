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
} from "@material-ui/icons";
import { projectOwnerCol } from "./projectColumns";

export const quoteColumns = (onQuoteClick, user = {}) => [
  {
    content: (item) => (
      <ListItem>
        <ListItemText
          primary={item.project?.name}
          secondary={item.project?.type}
        />
      </ListItem>
    ),
    label: "Project",
  },
  ...projectOwnerCol(user),
  { path: "billingCycle", label: "Billing cycle" },
  {
    content: (item) => (
      <Typography>$ {item.amount?.toLocaleString("en-US")}</Typography>
    ),
    label: "Amount",
  },
  { path: "status", label: "Status" },
  { path: "comment", label: "Comment" },
  {
    content: (item) =>
      item.status === "draft" ? (
        <Tooltip title="manage-items">
          <IconButton
            aria-label="manage-items"
            color="secondary"
            onClick={() => onQuoteClick(item, "items")}
            size="small"
          >
            <EditIcon />
            Items
          </IconButton>
        </Tooltip>
      ) : (
        <ButtonGroup variant="outlined" size="small">
          {user.role !== "Client" ? (
            <Tooltip title="Edit">
              <IconButton
                aria-label="Edit"
                color="secondary"
                onClick={() => onQuoteClick(item, "edit")}
              >
                <EditIcon />
                Edit
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Change status">
              <IconButton
                aria-label="Change status"
                color="default"
                onClick={() => onQuoteClick(item, "change")}
              >
                <PublishIcon /> Change status
              </IconButton>
            </Tooltip>
          )}
        </ButtonGroup>
      ),
    label: "Actions",
  },
];
