import React, { useState } from "react";
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
  onInputChange,
  modelViewRef = {},
}) => {
  const [hotstpotCount, setHotspotCount] = useState(1);
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const imageViewer = modelViewRef.current;

  const onAddHotspot = () => {
    imageViewer.addEventListener("click", onClickHotspot);
  };
  const onClickHotspot = (event) => {
    const rect = imageViewer.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const positionAndNormal = imageViewer.positionAndNormalFromPoint(x, y);
    if (!positionAndNormal) {
      console.log("no hit result: mouse = ", x, ", ", y);
      return;
    }
    const { position, normal } = positionAndNormal;
    const newHotspot = document.createElement("button");
    newHotspot.slot = `hotspot-${hotstpotCount}`;
    setHotspotCount((count) => count + 1);
    newHotspot.classList.add("hotspot");
    newHotspot.dataset.position = position.toString();
    if (normal != null) {
      newHotspot.dataset.normal = normal.toString();
    }
    imageViewer.appendChild(newHotspot);
    selectHotspot(newHotspot);
    newHotspot.addEventListener("click", () => {
      selectHotspot(newHotspot);
    });
    const div = document.createElement("div");
    div.classList.add("annotation");
    div.textContent =
      "data-position:\r\n" + position + "\r\ndata-normal:\r\n" + normal;
    newHotspot.appendChild(div);
    imageViewer.removeEventListener("click", onClickHotspot);
  };
  const selectHotspot = (hotspot) => {
    for (let i = 0; i < imageViewer.children.length; i++) {
      imageViewer.children[i].classList.remove("selected");
    }
    hotspot.classList.add("selected");
    setSelectedHotspot(hotspot);
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
          <Button color="secondary" onClick={() => onAddHotspot()}>
            Add new hotspot
          </Button>
        </CardContent>
      </Card>
    </Collapse>
  );
};
