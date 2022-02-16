import React from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  TextField,
} from "@material-ui/core";
import ColorPicker from "material-ui-color-picker";
import { useStyles } from "../productStyles";

export const Annotation = ({
  attName,
  attributes = {},
  setAttributes,
  onInputChange,
  modelViewRef = {},
  currentHotspot,
  setCurrentHotspot,
}) => {
  const classes = useStyles();
  const imageViewer = modelViewRef.current;

  const onAddHotspot = () => {
    imageViewer.addEventListener("click", onClickHotspot);
  };
  const onRemoveHotspot = () => {
    if (currentHotspot) {
      const currentAttributes = { ...attributes };
      const theHotspots = currentAttributes.hotspots.filter(
        (hs) => hs.hotspotNum !== currentHotspot.hotspotNum
      );
      setAttributes((prev) => ({ ...prev, hotspots: theHotspots }));
      setCurrentHotspot(null);
    }
  };
  const nextNumber = () => {
    const hotspots = [...attributes.hotspots];
    let theNum = 1;
    if (hotspots.length > 0) {
      const lastHotspot = hotspots.pop();
      theNum = lastHotspot.hotspotNum + 1;
    }
    return theNum;
  };
  const onClickHotspot = (event) => {
    const rect = imageViewer.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const positionAndNormal = imageViewer.positionAndNormalFromPoint(x, y);
    if (!positionAndNormal) {
      return;
    }
    const { position, normal } = positionAndNormal;
    const currentAttributes = { ...attributes };
    const newHotspot = {
      dataPosition: position.toString(),
      dataNormal: normal.toString(),
      dataText: "",
      bgColor: "black",
      hotspotNum: nextNumber(),
      selected: "selected",
    };
    const theHotspots = currentAttributes.hotspots.map((hs) => ({
      ...hs,
      selected: "",
    }));
    theHotspots.push(newHotspot);
    setAttributes({ ...attributes, hotspots: theHotspots });
    setCurrentHotspot(newHotspot);
    imageViewer.removeEventListener("click", onClickHotspot);
  };
  const onChangeAnnotationText = ({ target }) => {
    if (currentHotspot) {
      const currentAttributes = { ...attributes };
      const idx = currentAttributes.hotspots.findIndex(
        (hs) => hs.dataNormal === currentHotspot.dataNormal
      );
      const theCurrentHotspot = { ...currentHotspot, dataText: target.value };
      setCurrentHotspot(theCurrentHotspot);

      currentAttributes.hotspots[idx].dataText = target.value;

      setAttributes(currentAttributes);
    }
  };
  const onChangeColor = (color) => {
    if (currentHotspot) {
      const currentAttributes = { ...attributes };
      const idx = currentAttributes.hotspots.findIndex(
        (hs) => hs.dataNormal === currentHotspot.dataNormal
      );
      const theCurrentHotspot = { ...currentHotspot, bgColor: color };
      setCurrentHotspot(theCurrentHotspot);

      currentAttributes.hotspots[idx].bgColor = color;

      setAttributes(currentAttributes);
    }
  };
  return (
    <Collapse in={attName === "annotation"}>
      <Card className={classes.root}>
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
          <Button color="primary" onClick={() => onAddHotspot()}>
            Add new hotspot
          </Button>
          <TextField
            label="Model alt text"
            style={{ margin: 8 }}
            placeholder="Type annotation text"
            fullWidth
            margin="normal"
            name="dataText"
            value={currentHotspot?.dataText}
            disabled={!currentHotspot}
            onChange={onChangeAnnotationText}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <ColorPicker
            defaultValue="Click to select color"
            name="bgColor"
            floatingLabelText="Hotspot background color"
            onChange={onChangeColor}
            disabled={!currentHotspot}
            fullWidth
            value={currentHotspot?.bgColor}
          />
          <Button
            color="secondary"
            disabled={!currentHotspot}
            onClick={() => onRemoveHotspot()}
          >
            Remove hotspot
          </Button>
        </CardContent>
      </Card>
    </Collapse>
  );
};
