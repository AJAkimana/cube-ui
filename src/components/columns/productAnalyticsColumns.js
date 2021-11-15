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

export const productAnalyticsColumns = () => [
  {
    path: "name",
    label: "Asset name",
  },
  {
    path: "users",
    label: "# of users",
  },
  {
    path: "devices",
    label: "Devices",
  },
  {
    path: "clicks",
    label: "# of clicks",
  },
];
