import React, { useState } from "react";
import { Button, ButtonGroup } from "@material-ui/core";
import { Add as AddIcon, Remove as RemoveIcon } from "@material-ui/icons";

export const ButtonCounter = ({ name, value = 1, onSetValue }) => {
  return (
    <ButtonGroup size="small">
      <Button aria-label="reduce" onClick={() => onSetValue(name, -1, value)}>
        <RemoveIcon fontSize="small" />
      </Button>
      <Button>{value}</Button>
      <Button aria-label="increase" onClick={() => onSetValue(name, 1, value)}>
        <AddIcon fontSize="small" />
      </Button>
    </ButtonGroup>
  );
};
