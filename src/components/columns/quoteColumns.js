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

const hasExpired = (aDate) => {
  const today = new Date();
  const theDate = new Date(aDate);
  return today.getTime() < theDate.getTime();
};
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
    content: (item) =>
      item.amounts?.total ? (
        <Typography>
          $ {item.amounts?.total?.toLocaleString("en-US")}
        </Typography>
      ) : (
        "-"
      ),
    label: "Amount",
  },
  {
    content: (item) => (
      <Typography>
        {item.status === "Pending" && hasExpired(item.expiryDate)
          ? "Dead"
          : item.status}
      </Typography>
    ),
    label: "Status",
  },
  { path: "comment", label: "Comment" },
  {
    content: (item) =>
      item.status === "Pending" ||
      item.status === "Draft" ||
      hasExpired(item.expiryDate) ? (
        <ButtonGroup variant="outlined" size="small">
          <Tooltip title="Manage items">
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
          {user.role !== "Client" && (
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
          )}
          {user.role === "Client" && item.items.length && (
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
      ) : (
        <Typography variant="caption" color="error">
          No action needed
        </Typography>
      ),
    label: "Actions",
  },
];
