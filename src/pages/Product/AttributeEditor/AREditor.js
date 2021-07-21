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

export const AREditor = ({ attName }) => {
  return (
    <Collapse in={attName === "ar"}>
      <Card>
        <CardHeader title="AR Editor" />
        <CardContent>
          <FormControl fullWidth>
            <InputLabel shrink id="">
              AR scale
            </InputLabel>
            <Select
              labelId=""
              id="demo-simple-select-placeholder-label"
              displayEmpty
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Fixed</MenuItem>
              <MenuItem value={20}>Auto</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel shrink id="">
              AR placement
            </InputLabel>
            <Select
              labelId=""
              id="demo-simple-select-placeholder-label"
              displayEmpty
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Floor</MenuItem>
              <MenuItem value={20}>Wall</MenuItem>
            </Select>
          </FormControl>
        </CardContent>
      </Card>
    </Collapse>
  );
};
