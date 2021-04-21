import React from "react";
import {
  ButtonGroup,
  IconButton,
  Tooltip,
  Typography,
} from "@material-ui/core";
import {
  EditRounded as EditIcon,
  Publish as PublishIcon,
} from "@material-ui/icons";

export const quoteColumns = (onQuoteClick) => [
  {
    content: (item) => <Typography>{item.project.name}</Typography>,
    label: "Project",
  },
  { path: "billingCycle", label: "Billing cycle" },
  { path: "amount", label: "Amount" },
  {
    content: (item) => (
      <ButtonGroup variant="outlined">
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
        <Tooltip title="Change status">
          <IconButton
            aria-label="Change status"
            color="default"
            onClick={() => onQuoteClick(item, "change")}
          >
            <PublishIcon /> Change status
          </IconButton>
        </Tooltip>
      </ButtonGroup>
    ),
    label: "Actions",
  },
];
