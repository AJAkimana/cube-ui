import React from "react";
import {
  Button,
  Typography,
  ButtonGroup,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import {
  EditRounded as EditIcon,
  ViewComfy as ViewComfyIcon,
} from "@material-ui/icons";

export const productColumns = (onProductClick, user) => [
  {
    content: (item) => (
      <Button onClick={() => onProductClick(item, "preview")}>
        {item.name}
      </Button>
    ),
    label: "Asset name",
  },
  {
    content: (item) => (
      <Typography>
        {item.customer.fullName}, {item.customer.companyName}
      </Typography>
    ),
    label: "Customer",
  },
  {
    content: (item) => <Typography>{item.project?.name}</Typography>,
    label: "Project",
  },
  { path: "sku", label: "SKU" },
  {
    content: (item) => (
      <Typography>
        {item.price ? `$ ${item.price?.toLocaleString("en-US")}` : ""}
      </Typography>
    ),
    label: "Price",
  },
  { path: "status", label: "Status" },
  {
    content: (item) => (
      <ButtonGroup variant="outlined" size="small">
        <Tooltip title="View">
          <IconButton
            aria-label="View"
            color="secondary"
            onClick={() => onProductClick(item, "preview")}
          >
            <ViewComfyIcon /> View
          </IconButton>
        </Tooltip>
        {user.role !== "Client" && (
          <Tooltip title="Edit">
            <IconButton
              aria-label="Edit"
              color="secondary"
              disabled={item.status === "COMPLETED"}
              onClick={() => onProductClick(item, "edit")}
            >
              <EditIcon /> Edit
            </IconButton>
          </Tooltip>
        )}
      </ButtonGroup>
    ),
    label: "Actions",
  },
];
