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

const BASE_ROUTE = `${process.env.REACT_APP_API_URL}api/v1/invoice`;

export const invoiceColumns = (onInvoiceClick, user = {}) => [
  {
    content: (item) => (
      <ListItem>
        <ListItemText
          primary={item?.quote?.project?.name}
          secondary={item?.quote?.project?.type}
        />
      </ListItem>
    ),
    label: "Project",
  },
  {
    content: (item) => <Typography>{item?.user?.fullName}</Typography>,
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
              href={`${BASE_ROUTE}/${item._id}`}
              target="_blank"
            >
              <PrintRoundedIcon /> Download
            </IconButton>
          </Tooltip>
        </>
      ),
    label: "Actions",
  },
];
