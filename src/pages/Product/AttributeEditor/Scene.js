import React from "react";
import { FormControlLabel, Grid, Switch, TextField } from "@material-ui/core";
import ColorPicker from "material-ui-color-picker";
import { ButtonCounter } from "components/ButtonCounter";

export const Scene = ({ attributes = {}, onSetAttributes }) => {
  return (
    <Grid container spacing={3}>
      <FormControlLabel
        control={
          <Switch
            checked={attributes.zoom}
            onChange={onSetAttributes}
            name="zoom"
            color="primary"
          />
        }
        label="Disable zoom"
      />
      <FormControlLabel
        control={
          <Switch
            checked={attributes.rotate}
            onChange={onSetAttributes}
            name="rotate"
            color="primary"
          />
        }
        label="Auto rotate"
      />
      <TextField
        label="Auto rotate delay"
        type="number"
        name="autoRotateDelay"
      />
      <ColorPicker
        defaultValue="Color"
        name="bgColor"
        floatingLabelText="Background color"
        onChange={(color) => onSetAttributes({ ...attributes, bgColor: color })}
        value={attributes.bgColor}
      />
      <ButtonCounter />
    </Grid>
  );
};
