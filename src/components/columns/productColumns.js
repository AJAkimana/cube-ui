import React from "react";
import { Button } from "@material-ui/core";

export const productColumns = (onProductClick) => [
  {
    content: (item) => (
      <Button onClick={() => onProductClick(item, "preview")}>
        {item.name}
      </Button>
    ),
    label: "Product name",
  },
  { path: "status", label: "Status" },
];
