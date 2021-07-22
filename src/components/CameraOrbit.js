import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import { ButtonCounter } from "./ButtonCounter";

export const CameraOrbit = ({
  cardTitle,
  onSetCounterValue,
  counterValues = {},
  attribute,
}) => {
  return (
    <Card>
      <CardHeader title={cardTitle} />
      <FormControlLabel control={<Checkbox checked />} label="Default value" />
      <CardContent>
        <ButtonCounter
          label="Side to side"
          onSetValue={onSetCounterValue}
          attribute={attribute}
          values={counterValues.custom}
          name="side"
        />
        <ButtonCounter
          label="Up and down"
          onSetValue={onSetCounterValue}
          attribute={attribute}
          values={counterValues.custom}
          name="ud"
        />
        <ButtonCounter
          label="In and out"
          onSetValue={onSetCounterValue}
          attribute={attribute}
          values={counterValues.custom}
          name="io"
        />
      </CardContent>
    </Card>
  );
};
