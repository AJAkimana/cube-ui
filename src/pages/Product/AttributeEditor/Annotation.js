import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Collapse,
  TextField,
} from "@material-ui/core";

export const Annotation = ({ attName, attributes = {}, onInputChange }) => {
  return (
    <Collapse in={attName === "annotation"}>
      <Card>
        <CardHeader title="Modal annotation" />
        <CardContent>
          <TextField
            label="Model alt text"
            style={{ margin: 8 }}
            placeholder="Type here"
            fullWidth
            margin="normal"
            name="alt"
            value={attributes.alt}
            onChange={onInputChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </CardContent>
      </Card>
    </Collapse>
  );
};
