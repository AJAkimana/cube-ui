import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Collapse,
  Slider,
  Typography,
} from "@material-ui/core";

export const Material = ({ attName, attributes, onSliderChange }) => {
  return (
    <Collapse in={attName === "material"}>
      <Card>
        <CardHeader title="Image material" />
        <CardContent>
          <Typography variant="h4" id="metalness" gutterBottom>
            Matelness
          </Typography>
          <Slider
            aria-labelledby="metalness"
            min={0}
            step={0.01}
            max={1}
            valueLabelDisplay="on"
            name="metalness"
            value={attributes.metalness}
            onChange={(e, value) => onSliderChange("metalness", value)}
          />
          <Typography variant="h4" id="roughness" gutterBottom>
            Roughness
          </Typography>
          <Slider
            aria-labelledby="roughness"
            min={0}
            step={0.01}
            max={1}
            valueLabelDisplay="on"
            name="roughness"
            value={attributes.roughness}
            onChange={(e, value) => onSliderChange("roughness", value)}
          />
        </CardContent>
      </Card>
    </Collapse>
  );
};
