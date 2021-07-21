import React from "react";
import { Button, ButtonGroup, Grid, Typography } from "@material-ui/core";
import { Add as AddIcon, Remove as RemoveIcon } from "@material-ui/icons";

export const ButtonCounter = ({ label, name, value = 1, onSetValue }) => {
  return (
    <Grid container>
      <Grid item sm={7} md={7}>
        <Typography variant="h6">{label}</Typography>
      </Grid>
      <Grid item sm={5} md={5}>
        <ButtonGroup size="small">
          <Button
            aria-label="reduce"
            onClick={() => onSetValue(name, -1, value)}
          >
            <RemoveIcon fontSize="small" />
          </Button>
          <Button>{value}</Button>
          <Button
            aria-label="increase"
            onClick={() => onSetValue(name, 1, value)}
          >
            <AddIcon fontSize="small" />
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
};
