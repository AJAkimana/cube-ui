import React from "react";
import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import { CustomisedTable } from "components/CustomizedTable";
import { productAnalyticsColumns } from "components/columns";

const data = [
  { name: "The asset example", users: 23, clicks: 5, devices: "20 androids" },
];
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
        <Grid item lg={4} md={4} xl={6} xs={12}>
          <FormControl variant="filled" size="small">
            <InputLabel id="select-project">Age</InputLabel>
            <Select
              labelId="select-project"
              id="select-project-filled"
              onChange={() => {}}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <ButtonGroup
            variant="contained"
            aria-label="outlined primary button group"
          >
            <Button>Today</Button>
            <Button>Last 7 days</Button>
            <Button>Current Month</Button>
          </ButtonGroup>
        </Grid>
        <Grid item lg={8} md={8} xl={6} xs={12}>
          <Typography variant="h4">Analytics page</Typography>
          <CustomisedTable
            tableTitle="3D assets analytics"
            columns={productAnalyticsColumns()}
            data={data}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
