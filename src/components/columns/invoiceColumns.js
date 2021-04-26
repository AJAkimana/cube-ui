import React from "react";
import {
  ButtonGroup,
  IconButton,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { Publish as PublishIcon } from "@material-ui/icons";

export const invoiceColumns = (onInvoiceClick) => [
  {
    content: (item) => <Typography>{item.user.fullName}</Typography>,
    label: "Project owner",
  },
  { path: "status", label: "Status" },
  { path: "amount", label: "Amount" },
  {
    content: (item) => (
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
    ),
    label: "Actions",
  },
];
