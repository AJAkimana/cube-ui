import React from "react";
import {
  Card,
  Collapse,
  FormControlLabel,
  Slider,
  Switch,
  TextField,
  Typography,
  CardContent,
} from "@material-ui/core";
import ColorPicker from "material-ui-color-picker";
import { CameraOrbit } from "components/CameraOrbit";
import { useStyles } from "../productStyles";

export const Scene = ({
  attributes = {},
  attName,
  onInputChange,
  onSetCounterValue,
  onSliderChange,
  onChangeColor,
  onChangeSwitch,
  onChangeCheckbox,
}) => {
  const classes = useStyles();
  return (
    <Collapse in={attName === "scene"}>
      <Card className={classes.root}>
        <CardContent>
          <FormControlLabel
            control={
              <Switch
                checked={attributes.disableZoom}
                onChange={onChangeSwitch}
                name="disableZoom"
                color="primary"
              />
            }
            label="Disable zoom"
          />
          <FormControlLabel
            control={
              <Switch
                checked={attributes.autoRotate}
                onChange={onChangeSwitch}
                name="autoRotate"
                color="primary"
              />
            }
            label="Auto rotate"
          />
          <TextField
            label="Auto rotate delay"
            type="number"
            name="autoRotateDelay"
            value={attributes.autoRotateDelay}
            fullWidth
            onChange={onInputChange}
          />
          <ColorPicker
            defaultValue="Color"
            name="backgroundColor"
            floatingLabelText="Background color"
            onChange={onChangeColor}
            fullWidth
            value={attributes.backgroundColor}
          />

          <CameraOrbit
            cardTitle="Camera orbit"
            onSetCounterValue={onSetCounterValue}
            counterValues={attributes.cameraOrbit}
            onChangeCheckbox={onChangeCheckbox}
            attribute="cameraOrbit"
          />
          <CameraOrbit
            cardTitle="Min Camera orbit"
            onSetCounterValue={onSetCounterValue}
            counterValues={attributes.minCameraOrbit}
            onChangeCheckbox={onChangeCheckbox}
            attribute="minCameraOrbit"
          />
          <CameraOrbit
            cardTitle="Max Camera orbit"
            onSetCounterValue={onSetCounterValue}
            counterValues={attributes.maxCameraOrbit}
            onChangeCheckbox={onChangeCheckbox}
            attribute="maxCameraOrbit"
          />
          <Typography variant="h4" id="field-of-view" gutterBottom>
            Field of view
          </Typography>
          <Slider
            aria-labelledby="field-of-view"
            min={0}
            step={5}
            max={50}
            valueLabelDisplay="on"
            name="fieldOfView"
            value={attributes.fieldOfView}
            onChange={(e, value) => onSliderChange("fieldOfView", value)}
          />
        </CardContent>
      </Card>
    </Collapse>
  );
};
