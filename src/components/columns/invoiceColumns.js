import React from "react";
import moment from "moment";
import {
  ButtonGroup,
  IconButton,
  Tooltip,
  Typography,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import {
  Publish as PublishIcon,
  PrintRounded as PrintRoundedIcon,
} from "@material-ui/icons";
import { INVOICE_ROUTE } from "utils/constants";

export const invoiceColumns = (onInvoiceClick, user = {}) => [
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
  {
    content: (item) => <Typography>{item?.user?.fullName}</Typography>,
    label: "Project owner",
  },
  {
    content: (item) => (
      <Typography>$ {item.amount?.toLocaleString("en-US")}</Typography>
    ),
    label: "Amount",
  },
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
      item.status === "pending" && user.role !== "Client" ? (
        <ButtonGroup variant="outlined" size="small">
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
        <>
          <Typography variant="caption" color="error">
            No action needed
          </Typography>
          <Tooltip title="Print invoice">
            <IconButton
              component="a"
              aria-label="Print invoice"
              color="default"
              rel="noreferrer"
              href={`${INVOICE_ROUTE}/${item._id}`}
              target="_blank"
              size="small"
            >
              <PrintRoundedIcon /> Download
            </IconButton>
          </Tooltip>
        </>
      ),
    label: "Actions",
  },
];
