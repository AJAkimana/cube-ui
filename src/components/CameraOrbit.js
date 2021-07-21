import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import { ButtonCounter } from "./ButtonCounter";

export const CameraOrbit = ({ cardTitle }) => {
  return (
    <Card>
      <CardHeader title={cardTitle} />
      <CardContent>
        <FormControlLabel
          control={<Checkbox checked />}
          label="Default value"
        />
        <ButtonCounter label="Side to side" />
        <ButtonCounter label="Up and down" />
        <ButtonCounter label="In and out" />
      </CardContent>
    </Card>
  );
};
