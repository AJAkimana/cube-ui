import React from "react";
import { Box, Grid, Typography } from "@material-ui/core";

export const AnalyticsPage = () => {
  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        minHeight: "100%",
        py: 3,
      }}
    >
      <Grid container spacing={1}>
        <Grid item lg={8} md={8} xl={6} xs={12}>
          <Typography variant="h4">Analytics page</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
