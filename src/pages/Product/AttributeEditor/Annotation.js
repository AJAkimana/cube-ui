import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Collapse,
  TextField,
} from "@material-ui/core";

export const Annotation = ({ attName }) => {
  return (
    <Collapse in={attName === "annotation"}>
      <Card>
        <CardHeader title="Modal annotation" />
        <CardContent>
          <TextField
            id="alt-text"
            label="Model alt text"
            style={{ margin: 8 }}
            placeholder="Type here"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </CardContent>
      </Card>
    </Collapse>
  );
};
