import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Collapse,
  Slider,
  Typography,
} from "@material-ui/core";

export const Lighting = ({ attName }) => {
  return (
    <Collapse in={attName === "lighting"}>
      <Card>
        <CardHeader title="Image lighting" />
        <CardContent>
          <Typography variant="h4" id="exposure" gutterBottom>
            Exposure
          </Typography>
          <Slider
            defaultValue={1}
            aria-labelledby="exposure"
            min={0}
            step={0.01}
            max={2}
            valueLabelDisplay="on"
          />
          <Typography variant="h4" id="shadow-intensity" gutterBottom>
            Shadow intensity
          </Typography>
          <Slider
            defaultValue={0.4}
            aria-labelledby="shadow-intensity"
            min={0}
            step={0.1}
            max={1}
            valueLabelDisplay="on"
          />
          <Typography variant="h4" id="shadow-softness" gutterBottom>
            Shadow softness
          </Typography>
          <Slider
            defaultValue={0.4}
            aria-labelledby="shadow-softness"
            min={0}
            step={0.1}
            max={1}
            valueLabelDisplay="on"
          />
        </CardContent>
      </Card>
    </Collapse>
  );
};
