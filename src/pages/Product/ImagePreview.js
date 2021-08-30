import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@material-ui/core";
import { getProduct } from "redux/actions/product";
import { useSelector } from "react-redux";
import { IMAGES_3D_PATH } from "utils/constants";
import Loading from "components/loading.component";
import { AttributeEditor } from "./AttributeEditor";
import { toOrbitProp } from "./productConstants";
import { initialStates } from "./AttributeEditor/initialStates";

export const ImagePreview = ({ open, setOpen, productId = null }) => {
  const [attributes, setAttributes] = useState(initialStates);
  const appState = useSelector((state) => state);
  const {
    productGet: { loading, product, loaded },
  } = appState;
  useEffect(() => {
    if (productId && open) {
      getProduct(productId);
    }
  }, [productId, open]);
  useEffect(() => {
    if (loaded) {
      const { src, ...otherProps } = product.image;
      setAttributes(otherProps);
    }
  }, [loaded, product]);
  const booleanAttributes = (imageProp) => {
    let attribs = {};
    if (imageProp?.disableZoom) {
      attribs["disable-zoom"] = "true";
    }
    if (imageProp?.autoRotate) {
      attribs["auto-rotate"] = "true";
    }
    return attribs;
  };
  return (
    <Dialog
      open={open}
      maxWidth="lg"
      fullWidth
      onClose={setOpen}
      aria-labelledby="product-dialog-title"
      aria-describedby="product-dialog-description"
    >
      <DialogTitle id="product-dialog-title">{product?.name}</DialogTitle>
      <DialogContent id="product-dialog-description">
        {loading && !Boolean(product.image) ? (
          <Loading />
        ) : (
          <Grid
            container
            spacing={2}
            style={{ backgroundColor: attributes.backgroundColor }}
          >
            <Grid item md={5} lg={5}>
              <AttributeEditor
                productId={productId}
                attributes={attributes}
                setAttributes={setAttributes}
              />
            </Grid>
            <Grid item md={7} lg={7}>
              <model-viewer
                src={`${IMAGES_3D_PATH}/${product.imagesSrc?.glb}`}
                ios-src={`${IMAGES_3D_PATH}/${product.imagesSrc?.usdz}`}
                style={{ width: "100%", height: "70vh", border: "none" }}
                auto-rotate-delay={attributes.autoRotateDelay}
                background-color={attributes.backgroundColor}
                camera-orbit={toOrbitProp("cameraOrbit", attributes)}
                min-camera-orbit={toOrbitProp("minCameraOrbit", attributes)}
                max-camera-orbit={toOrbitProp("maxCameraOrbit", attributes)}
                camera-target={attributes.cameraTarget}
                field-of-view={attributes.fieldOfView}
                exposure={attributes.exposure}
                shadow-intensity={attributes.shadowIntensity}
                shadow-softness={attributes.shadowSoftness}
                alt={attributes.alt}
                ar-scale={attributes.scale}
                placement={attributes.placement}
                ar
                ar-modes="webxr scene-viewer quick-look"
                camera-controls
                autoplay
                quick-look-browsers="safari chrome firefox"
                loading="eager"
                {...booleanAttributes(attributes)}
              ></model-viewer>
            </Grid>
          </Grid>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={setOpen} color="primary" autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
