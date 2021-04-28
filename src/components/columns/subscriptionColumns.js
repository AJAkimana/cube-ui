import React from "react";
import moment from "moment";
import { Typography } from "@material-ui/core";

export const subscriptionColumns = () => [
  {
    content: (item) => <Typography>{item.user.fullName}</Typography>,
    label: "User names",
  },
  {
    content: (item) => <Typography>{item?.quote?.billingCycle}</Typography>,
    label: "Billing cycle",
  },
  {
    content: (item) => <Typography>{item?.quote?.amount}</Typography>,
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
      <Typography>{moment(item.expirationDate).fromNow()}</Typography>
    ),
    label: "Expiration date",
  },
  { path: "status", label: "Status" },
];