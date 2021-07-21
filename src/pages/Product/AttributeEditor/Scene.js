import React from "react";
import {
  Card,
  Collapse,
  FormControlLabel,
  Slider,
  Switch,
  TextField,
  Typography,
} from "@material-ui/core";
import ColorPicker from "material-ui-color-picker";
import { CameraOrbit } from "components/CameraOrbit";
import { useStyles } from "../productStyles";

export const Scene = ({ attributes = {}, onSetAttributes, attName }) => {
  const classes = useStyles();
  const valueText = (txt) => `${txt}deg`;
  return (
    <Collapse in={attName === "scene"}>
      <Card className={classes.root}>
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
          onChange={(color) =>
            onSetAttributes({ ...attributes, bgColor: color })
          }
          value={attributes.bgColor}
        />
        <CameraOrbit cardTitle="Camera orbit" />
        <CameraOrbit cardTitle="Min Camera orbit" />
        <CameraOrbit cardTitle="Max Camera orbit" />
        <Typography variant="h4" id="field-of-view" gutterBottom>
          Field of view
        </Typography>
        <Slider
          defaultValue={15}
          getAriaValueText={valueText}
          aria-labelledby="field-of-view"
          min={0}
          step={5}
          max={50}
          marks={[{ value: 15, label: "15deg" }]}
          valueLabelDisplay="on"
        />
      </Card>
    </Collapse>
  );
};
