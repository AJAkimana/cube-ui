import React, { useState } from "react";
import { Button, ButtonGroup, Grid } from "@material-ui/core";
import { Scene } from "./Scene";
import { Lighting } from "./Lighting";
import { Material } from "./Material";
import { Annotation } from "./Annotation";
import { AREditor } from "./AREditor";

export const AttributeEditor = () => {
  const [activeBtn, setActiveBtn] = useState("scene");
  return (
    <Grid container spacing={2}>
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
        <Scene attName={activeBtn} />
        <Lighting attName={activeBtn} />
        <Material attName={activeBtn} />
        <Annotation attName={activeBtn} />
        <AREditor attName={activeBtn} />
      </Grid>
    </Grid>
  );
};
