import React, { useState } from "react";
import { Button, ButtonGroup, Grid } from "@material-ui/core";
import { Scene } from "./Scene";
import { Lighting } from "./Lighting";
import { Material } from "./Material";
import { Annotation } from "./Annotation";
import { AREditor } from "./AREditor";
import { useStyles } from "../productStyles";
import { initialStates } from "./initialStates";

export const AttributeEditor = () => {
  const [activeBtn, setActiveBtn] = useState("scene");
  const [attributes, setAttributes] = useState(initialStates);
  const classes = useStyles();
  const onSetCounterValue = (attribute, name, currentValue) => {
    const customValues = { ...attributes[attribute].custom };
    customValues[name] += currentValue;
    attributes[attribute].custom = customValues;
    setAttributes({ ...attributes, [attribute]: attributes[attribute] });
  };
  const onInputChange = ({ target: { name, value } }) => {
    setAttributes({ ...attributes, [name]: value });
  };
  const onSliderChange = ({ target }, newValue) => {
    setAttributes({ ...attributes, [target.name]: newValue });
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
            color={activeBtn === "scene" ? "primary" : ""}
            onClick={() => setActiveBtn("scene")}
          >
            Scene
          </Button>
          <Button
            color={activeBtn === "lighting" ? "primary" : ""}
            onClick={() => setActiveBtn("lighting")}
          >
            Lighting
          </Button>
          <Button
            color={activeBtn === "material" ? "primary" : ""}
            onClick={() => setActiveBtn("material")}
          >
            Material
          </Button>
          <Button
            color={activeBtn === "annotation" ? "primary" : ""}
            onClick={() => setActiveBtn("annotation")}
          >
            Annotations
          </Button>
          <Button
            color={activeBtn === "ar" ? "primary" : ""}
            onClick={() => setActiveBtn("ar")}
          >
            AR
          </Button>
        </ButtonGroup>
      </Grid>
      <Grid item sm={8} md={8}>
        <Scene
          attName={activeBtn}
          attributes={attributes}
          onSetCounterValue={onSetCounterValue}
        />
        <Lighting attName={activeBtn} />
        <Material attName={activeBtn} />
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
