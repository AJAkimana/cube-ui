import React, { useState } from "react";
import { Button, ButtonGroup, Grid } from "@material-ui/core";
import { Scene } from "./Scene";
import { Lighting } from "./Lighting";
import { Material } from "./Material";
import { Annotation } from "./Annotation";
import { AREditor } from "./AREditor";
import { useStyles } from "../productStyles";
import { initialStates } from "./initialStates";
import { updateAttributes } from "redux/actions/product";
import { useSelector } from "react-redux";

export const AttributeEditor = ({ productId }) => {
  const classes = useStyles();
  const [activeBtn, setActiveBtn] = useState("scene");
  const [attributes, setAttributes] = useState(initialStates);

  const appState = useSelector((state) => state);
  const {
    attrUpdate: { loading },
  } = appState;

  const onSetCounterValue = (attribute, name, currentValue) => {
    const customValues = { ...attributes[attribute].custom };
    customValues[name] += currentValue;
    attributes[attribute].custom = customValues;
    setAttributes({ ...attributes, [attribute]: attributes[attribute] });
  };
  const onInputChange = ({ target: { name, value } }) => {
    setAttributes({ ...attributes, [name]: value });
  };
  const onSliderChange = (name, newValue) => {
    setAttributes({ ...attributes, [name]: newValue });
  };
  const onChangeColor = (color) => {
    setAttributes({ ...attributes, backgroundColor: color });
  };
  const onChangeSwitch = ({ target: { name, checked } }) => {
    setAttributes({ ...attributes, [name]: checked });
  };
  const onChangeCheckbox = ({ checked }, attribute) => {
    const attributeValues = { ...attributes[attribute] };
    attributeValues.useDefault = checked;
    if (checked) {
      attributeValues.custom = initialStates[attribute].custom;
    }
    setAttributes({ ...attributes, [attribute]: attributeValues });
  };
  return (
    <Grid container spacing={2} className={classes.editor}>
      <Grid item sm={4} md={4}>
        <ButtonGroup
          orientation="vertical"
          color="primary"
          aria-label="vertical contained primary button group"
          variant="text"
        >
          <Button
            color={activeBtn === "scene" ? "primary" : "success"}
            onClick={() => setActiveBtn("scene")}
          >
            Scene
          </Button>
          <Button
            color={activeBtn === "lighting" ? "primary" : "success"}
            onClick={() => setActiveBtn("lighting")}
          >
            Lighting
          </Button>
          <Button
            color={activeBtn === "material" ? "primary" : "success"}
            onClick={() => setActiveBtn("material")}
          >
            Material
          </Button>
          <Button
            color={activeBtn === "annotation" ? "primary" : "success"}
            onClick={() => setActiveBtn("annotation")}
          >
            Annotations
          </Button>
          <Button
            color={activeBtn === "ar" ? "primary" : "success"}
            onClick={() => setActiveBtn("ar")}
          >
            AR
          </Button>
        </ButtonGroup>
        <Button
          color="secondary"
          variant="contained"
          disabled={loading}
          onClick={() => updateAttributes(attributes, productId)}
        >
          Save Changes
        </Button>
      </Grid>
      <Grid item sm={8} md={8}>
        <Scene
          attName={activeBtn}
          attributes={attributes}
          onInputChange={onInputChange}
          onSetCounterValue={onSetCounterValue}
          onSliderChange={onSliderChange}
          onChangeColor={onChangeColor}
          onChangeSwitch={onChangeSwitch}
          onChangeCheckbox={onChangeCheckbox}
        />
        <Lighting
          attName={activeBtn}
          attributes={attributes}
          onSliderChange={onSliderChange}
        />
        <Material
          attName={activeBtn}
          attributes={attributes}
          onSliderChange={onSliderChange}
        />
        <Annotation
          attName={activeBtn}
          attributes={attributes}
          onInputChange={onInputChange}
        />
        <AREditor
          attName={activeBtn}
          attributes={attributes}
          onInputChange={onInputChange}
        />
      </Grid>
    </Grid>
  );
};
