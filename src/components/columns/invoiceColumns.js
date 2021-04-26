import React from "react";
import moment from "moment";
import {
  ButtonGroup,
  IconButton,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { Publish as PublishIcon } from "@material-ui/icons";

export const invoiceColumns = (onInvoiceClick, user = {}) => [
  {
    content: (item) => <Typography>{item.user.fullName}</Typography>,
    label: "Project owner",
  },
  { path: "amount", label: "Amount" },
  { path: "status", label: "Status" },
  {
    content: (item) => (
      <Typography>
        {item.status === "pending"
          ? moment(item.due_date).fromNow()
          : "Already paid"}
      </Typography>
    ),
    label: "Due data",
  },
  {
    content: (item) =>
      item.status === "pending" && user.role === "Manager" ? (
        <ButtonGroup variant="outlined">
          <Tooltip title="Approve payment">
            <IconButton
              aria-label="Approve payment"
              color="default"
              onClick={() => onInvoiceClick(item, "change")}
            >
              <PublishIcon /> Approve payment
            </IconButton>
          </Tooltip>
        </ButtonGroup>
      ) : (
        <Typography variant="caption" color="error">
          No action needed
        </Typography>
      ),
    label: "Actions",
  },
];
