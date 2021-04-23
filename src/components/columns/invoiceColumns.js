import React from "react";
import { ButtonGroup, IconButton, Tooltip } from "@material-ui/core";
import { Publish as PublishIcon } from "@material-ui/icons";

export const invoiceColumns = (onInvoiceClick) => [
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
