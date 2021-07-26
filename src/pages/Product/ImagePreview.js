import React, { useEffect } from "react";
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
import { IMAGES_PATH } from "utils/constants";
import Loading from "components/loading.component";
import { AttributeEditor } from "./AttributeEditor";
import { toOrbitProp } from "./productConstants";
import { notifier } from "utils/notifier";

export const ImagePreview = ({ open, setOpen, productId = null }) => {
  const appState = useSelector((state) => state);
  const {
    productGet: { loading, product },
    attrUpdate: { loaded, message },
  } = appState;
  useEffect(() => {
    if (productId && open) {
      getProduct(productId);
    }
  }, [productId]);
  useEffect(() => {
    if (loaded) {
      getProduct(productId);
      notifier.success(message);
    }
  }, [loaded, message, productId]);
  const booleanAttributes = () => ({});
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
            style={{ backgroundColor: product.image?.backgroundColor }}
          >
            <Grid item md={5} lg={5}>
              <AttributeEditor productId={productId} />
            </Grid>
            <Grid item md={7} lg={7}>
              <model-viewer
                src={`${IMAGES_PATH}/${product.imagesSrc?.glb}`}
                ios-src={`${IMAGES_PATH}/${product.imagesSrc?.usdz}`}
                style={{ width: "100%", height: "70vh", border: "none" }}
                disable-zoom={product.image?.disableZoom}
                auto-rotate={product.image?.autoRotate}
                auto-rotate-delay={product.image?.autoRotateDelay}
                background-color={product.image?.backgroundColor}
                camera-orbit={toOrbitProp("cameraOrbit", product.image)}
                min-camera-orbit={toOrbitProp("minCameraOrbit", product.image)}
                max-camera-orbit={toOrbitProp("maxCameraOrbit", product.image)}
                camera-target={product.image?.cameraTarget}
                field-of-view={product.image?.fieldOfView}
                exposure={product.image?.exposure}
                shadow-intensity={product.image?.shadowIntensity}
                shadow-softness={product.image?.shadowSoftness}
                alt={product.image?.alt}
                ar-scale={product.image?.scale}
                placement={product.image?.placement}
                ar
                ar-modes="webxr scene-viewer quick-look"
                camera-controls
                autoplay
                quick-look-browsers="safari chrome firefox"
                loading="eager"
                {...booleanAttributes()}
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
