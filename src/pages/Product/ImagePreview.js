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
import { IMAGES_3D_PATH, IMAGES_PATH } from "utils/constants";
import Loading from "components/loading.component";
import { AttributeEditor } from "./AttributeEditor";
import { toOrbitProp, toAttributes } from "./productConstants";
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
                id="image3d-viewer"
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
                {...toAttributes(attributes)}
              >
                <input
                  type="image"
                  src={IMAGES_PATH + attributes.arButtonImage}
                  id="ar-button"
                  style={{ width: "50%" }}
                  slot="ar-button"
                  alt={attributes.alt}
                />
                <button
                  slot="hotspot-foot"
                  data-visibility-attribute="visible"
                  id="hotspot"
                  className="hotspot"
                  data-position="-0.5817108238276109m 1.2278369371543665m 0.74690684793254m"
                  data-normal="0.1736633601318935m -2.3333211432002816e-8m 0.9848050758133305m"
                  data-visible=""
                >
                  <div id="annotation">Some text </div>
                </button>
              </model-viewer>
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
