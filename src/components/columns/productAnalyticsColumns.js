import React from "react";
import { Avatar, Button, Chip } from "@material-ui/core";

export const productAnalyticsColumns = (onItemClick) => [
  {
    content: (item) => (
      <Button onClick={() => onItemClick(item, "preview")}>
        {item.product?.name}
      </Button>
    ),
    label: "3D Assets",
  },
  {
    path: "users",
    label: "Users",
  },
  {
    path: "clicks",
    label: "AR Users",
  },
  {
    content: (item) => (
      <>
        <Chip
          variant="outlined"
          color="primary"
          size="small"
          label="iOs"
          avatar={<Avatar>{item.iOs}</Avatar>}
        />
        <Chip
          variant="outlined"
          color="secondary"
          size="small"
          label="Android"
          avatar={<Avatar>{item.androids}</Avatar>}
        />
        <Chip
          variant="outlined"
          size="small"
          label="Desktop"
          avatar={<Avatar>{item.desktops}</Avatar>}
        />
      </>
    ),
    label: "Device by Users",
  },
  {
    content: (item) =>
      item.countries.map((el, elIdx) => (
        <Chip
          variant="outlined"
          size="small"
          label={el.name}
          avatar={<Avatar>{el.count}</Avatar>}
          key={elIdx}
        />
      )),
    label: "Country by Users",
  },
];
