import React from "react";
import moment from "moment";
import { Typography } from "@material-ui/core";
import { projectOwnerCol } from "./projectColumns";

export const subscriptionColumns = (user = {}) => [
  {
    content: (item) => <Typography>{item.quote?.project?.name}</Typography>,
    label: "Project",
  },
  ...projectOwnerCol(user),
  {
    content: (item) => <Typography>{item?.quote?.billingCycle}</Typography>,
    label: "Billing cycle",
  },
  {
    content: (item) => (
      <Typography>$ {item.quote?.amount?.toLocaleString("en-US")}</Typography>
    ),
    label: "Amount",
  },
  {
    content: (item) => (
      <Typography>{moment(item.startDate).fromNow()}</Typography>
    ),
    label: "Start date",
  },
  {
    content: (item) => (
      <Typography>
        {item.expirationDate
          ? moment(item.expirationDate).fromNow()
          : "One time pay"}
      </Typography>
    ),
    label: "Expiration date",
  },
  { path: "status", label: "Status" },
];
