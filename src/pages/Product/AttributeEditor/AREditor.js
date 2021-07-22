import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Collapse,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";

const scales = ["auto", "fixed"];
const placements = ["floor", "wall"];
export const AREditor = ({ attName, attributes = {}, onInputChange }) => {
  return (
    <Collapse in={attName === "ar"}>
      <Card>
        <CardHeader title="AR Editor" />
        <CardContent>
          <FormControl fullWidth>
            <InputLabel shrink id="select-scale">
              AR scale
            </InputLabel>
            <Select
              labelId="select-scale"
              name="scale"
              value={attributes.scale}
              onChange={onInputChange}
            >
              {scales.map((scale) => (
                <MenuItem value={scale}>{scale.toUpperCase()}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel shrink id="select-placement">
              AR placement
            </InputLabel>
            <Select
              labelId="select-placement"
              name="placement"
              value={attributes.placement}
              onChange={onInputChange}
            >
              {placements.map((pl) => (
                <MenuItem value={pl}>{pl.toUpperCase()}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </CardContent>
      </Card>
    </Collapse>
  );
};
