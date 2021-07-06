import React from "react";
import { Grid } from "@material-ui/core";
import { CustomisedTable } from "components/CustomizedTable";
import { ProductRegistration } from "./ProductRegistraction";

export const ProductPage = () => {
  return (
    <Grid container spacing={2} sx={{ py: 3 }}>
      <Grid item xs={12} sm={4} md={4} lg={4}>
        <ProductRegistration />
      </Grid>
      <Grid item xs={12} sm={8} md={8} lg={8}>
        <CustomisedTable tableTitle="List of products" />
      </Grid>
    </Grid>
  );
};
