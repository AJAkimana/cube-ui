import React from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  TextField,
} from "@material-ui/core";

export const Annotation = ({
  attName,
  attributes = {},
  setAttributes,
  onInputChange,
  modelViewRef = {},
  currentHotspot,
  setCurrentHotspot,
}) => {
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
      // currentAttributes.hotspots = theHotspots;
      // console.log(currentAttributes.hotspots);
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
    // console.log("theNum====>", theNum);
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
      hotspotNum: nextNumber(),
      selected: "selected",
    };
    const theHotspots = currentAttributes.hotspots.map((hs) => ({
      ...hs,
      selected: "",
    }));
    theHotspots.push(newHotspot);
    // currentAttributes.hotspots = [newHotspot, ...theHotspots];
    // console.log(currentAttributes.hotspots);
    setAttributes({ ...attributes, hotspots: theHotspots });
    setCurrentHotspot(newHotspot);
    // const newHotspot = document.createElement("button");
    // newHotspot.slot = `hotspot-${hotstpotCount}`;
    // setHotspotCount((count) => count + 1);
    // newHotspot.classList.add("hotspot");
    // newHotspot.dataset.position = position.toString();
    // if (normal != null) {
    //   newHotspot.dataset.normal = normal.toString();
    // }
    // imageViewer.appendChild(newHotspot);
    // selectHotspot(newHotspot);
    // newHotspot.addEventListener("click", () => {
    //   selectHotspot(newHotspot);
    // });
    // const div = document.createElement("div");
    // div.classList.add("annotation");
    // div.textContent =
    //   "data-position:\r\n" + position + "\r\ndata-normal:\r\n" + normal;
    // newHotspot.appendChild(div);
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
