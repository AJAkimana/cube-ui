import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Collapse,
  Slider,
  Typography,
} from "@material-ui/core";

export const Material = ({ attName }) => {
  return (
    <Collapse in={attName === "material"}>
      <Card>
        <CardHeader title="Image material" />
        <CardContent>
          <Typography variant="h4" id="metalness" gutterBottom>
            Matelness
          </Typography>
          <Slider
            defaultValue={0.2}
            aria-labelledby="metalness"
            min={0}
            step={0.01}
            max={1}
            valueLabelDisplay="on"
          />
          <Typography variant="h4" id="roughness" gutterBottom>
            Roughness
          </Typography>
          <Slider
            defaultValue={0.4}
            aria-labelledby="roughness"
            min={0}
            step={0.01}
            max={1}
            valueLabelDisplay="on"
          />
        </CardContent>
      </Card>
    </Collapse>
  );
};
