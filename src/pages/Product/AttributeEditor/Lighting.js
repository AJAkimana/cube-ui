import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Collapse,
  Slider,
  Typography,
} from "@material-ui/core";

export const Lighting = ({ attName, attributes, onSliderChange }) => {
  return (
    <Collapse in={attName === "lighting"}>
      <Card>
        <CardHeader title="Image lighting" />
        <CardContent>
          <Typography variant="h4" id="exposure" gutterBottom>
            Exposure
          </Typography>
          <Slider
            aria-labelledby="exposure"
            min={0}
            step={0.01}
            max={2}
            valueLabelDisplay="on"
            name="exposure"
            value={attributes.exposure}
            onChange={(e, value) => onSliderChange("exposure", value)}
          />
          <Typography variant="h4" id="shadow-intensity" gutterBottom>
            Shadow intensity
          </Typography>
          <Slider
            aria-labelledby="shadow-intensity"
            min={0}
            step={0.1}
            max={1}
            valueLabelDisplay="on"
            name="shadowIntensity"
            value={attributes.shadowIntensity}
            onChange={(e, value) => onSliderChange("shadowIntensity", value)}
          />
          <Typography variant="h4" id="shadow-softness" gutterBottom>
            Shadow softness
          </Typography>
          <Slider
            aria-labelledby="shadow-softness"
            min={0}
            step={0.1}
            max={1}
            valueLabelDisplay="on"
            name="shadowSoftness"
            value={attributes.shadowSoftness}
            onChange={(e, value) => onSliderChange("shadowSoftness", value)}
          />
        </CardContent>
      </Card>
    </Collapse>
  );
};
