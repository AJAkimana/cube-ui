import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import { ButtonCounter } from "./ButtonCounter";
import { Collapse } from "@material-ui/core";

export const CameraOrbit = ({
  cardTitle,
  onSetCounterValue,
  onChangeCheckbox,
  counterValues = {},
  attribute,
}) => {
  return (
    <Card>
      <CardHeader title={cardTitle} />
      <CardContent>
        <FormControlLabel
          control={
            <Checkbox
              checked={counterValues.useCustom}
              onChange={({ target }) => onChangeCheckbox(target, attribute)}
            />
          }
          label="Default value"
        />
        <Collapse in={!counterValues.useCustom}>
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
        </Collapse>
      </CardContent>
    </Card>
  );
};
