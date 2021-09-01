import React, { useEffect, useState, useRef } from "react";
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
  const modelViewRef = useRef(null);
  const [attributes, setAttributes] = useState(initialStates);
  const [currentHotspot, setCurrentHotspot] = useState(null);
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
  // useEffect(() => {
  //   if (modelViewRef.current) {
  //     const modelViewer = modelViewRef.current;
  //     // const material = modelViewer.materials;
  //     // console.log("material===>", modelViewer.model);
  //     modelViewer.addEventListener("scene-graph-ready", (ev) => {
  //       let material = modelViewer.model.materials[0];
  //       material.pbrMetallicRoughness.setMetallicFactor(attributes.metalness);
  //       material.pbrMetallicRoughness.setRoughnessFactor(attributes.roughness);
  //     });
  //   }
  // }, [attributes.metalness, attributes.roughness]);
  const onSelectHotspot = (hotspot) => {
    const currentAttributes = { ...attributes };
    const theHotspots = currentAttributes.hotspots.map((hs) => ({
      ...hs,
      selected: hs.dataNormal === hotspot.dataNormal ? "selected" : "",
    }));
    currentAttributes.hotspots = theHotspots;
    setAttributes(currentAttributes);
    hotspot.selected = "selected";
    setCurrentHotspot(hotspot);
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
                modelViewRef={modelViewRef}
                currentHotspot={currentHotspot}
                setCurrentHotspot={setCurrentHotspot}
              />
            </Grid>
            <Grid item md={7} lg={7}>
              <model-viewer
                id="image3d-viewer"
                ref={modelViewRef}
                src={`${IMAGES_3D_PATH}/${product.imagesSrc?.glb}`}
                ios-src={`${IMAGES_3D_PATH}/${product.imagesSrc?.usdz}`}
                style={{ width: "100%", height: "70vh", border: "none" }}
                auto-rotate-delay={attributes.autoRotateDelay}
                background-color={attributes.backgroundColor}
                camera-orbit={toOrbitProp("cameraOrbit", attributes)}
                min-camera-orbit={toOrbitProp("minCameraOrbit", attributes)}
                max-camera-orbit={toOrbitProp("maxCameraOrbit", attributes)}
                camera-target={toOrbitProp("cameraTarget", attributes)}
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
                {Boolean(attributes.arButtonImage) && (
                  <input
                    type="image"
                    src={IMAGES_PATH + attributes.arButtonImage}
                    id="ar-button"
                    style={{ width: "50%" }}
                    slot="ar-button"
                    alt={attributes.alt}
                  />
                )}
                {attributes.hotspots?.map((hs, hsIdx) => (
                  <button
                    key={hsIdx}
                    slot={`hotspot-${hsIdx}`}
                    className={`hotspot ${hs.selected}`}
                    data-position={hs.dataPosition}
                    data-normal={hs.dataNormal}
                    onClick={() => onSelectHotspot(hs)}
                  >
                    <div className="annotation">{hs.dataText}</div>
                  </button>
                ))}
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
