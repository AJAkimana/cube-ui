import React, { useEffect, useState, useRef } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@material-ui/core";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { getProduct } from "redux/actions/product";
import { useSelector } from "react-redux";
import { BASE_URL, IMAGES_3D_PATH, IMAGES_PATH } from "utils/constants";
import Loading from "components/loading.component";
import { AttributeEditor } from "./AttributeEditor";
import { toOrbitProp, toAttributes } from "./productConstants";
import { initialStates } from "./AttributeEditor/initialStates";

export const ImagePreview = ({ open, setOpen, productId = null }) => {
  const modelViewRef = useRef(null);
  const [attributes, setAttributes] = useState(initialStates);
  const [currentHotspot, setCurrentHotspot] = useState(null);
  const [copied, setCopied] = useState(false);
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
      setAttributes((prevAttribs) => ({ prevAttribs, ...otherProps }));
      setCopied(false);
      setCurrentHotspot(null);
    }
  }, [loaded, product]);
  useEffect(() => {
    const modelViewer = modelViewRef.current;
    document.querySelectorAll("button.hotspot").forEach((e) => e.remove());
    if (attributes.hotspots.length && modelViewer) {
      attributes.hotspots.forEach((el) => {
        const newHotspot = document.createElement("button");
        newHotspot.slot = `hotspot-${el.hotspotNum}`;
        newHotspot.classList.add("hotspot");
        newHotspot.style.backgroundColor = el.bgColor;
        newHotspot.dataset.position = el.dataPosition;
        newHotspot.dataset.normal = el.dataNormal;

        modelViewer.appendChild(newHotspot);
        newHotspot.addEventListener("click", () => {
          onSelectHotspot(el);
        });
        const div = document.createElement("div");
        div.classList.add("annotation");
        div.textContent = el.dataText;
        newHotspot.appendChild(div);
      });
    }
  }, [attributes.hotspots, currentHotspot]);
  useEffect(() => {
    const modelViewer = modelViewRef.current;
    console.log("++++++++++++++++++++", modelViewer);
    // const modelViewer = document.querySelector("model-viewer#image3d-viewer");
    if (modelViewer && modelViewer.model) {
      console.log("====================>Loaded");
      let material = modelViewer.model.materials[0];
      material.pbrMetallicRoughness.setBaseColorFactor([
        0.7294, 0.5333, 0.0392,
      ]);
      material.pbrMetallicRoughness.setMetallicFactor(attributes.metalness);
      material.pbrMetallicRoughness.setRoughnessFactor(attributes.roughness);
      console.log(
        material.pbrMetallicRoughness.metallicFactor,
        material.pbrMetallicRoughness.roughnessFactor
      );
      console.log(attributes.metalness, attributes.roughness);
      // });
    }
  }, [modelViewRef, product.image, attributes.metalness, attributes.roughness]);
  const onSelectHotspot = (hotspot) => {
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
      <DialogActions>
        <CopyToClipboard
          text={`${BASE_URL}/products/${productId}`}
          onCopy={() => setCopied(true)}
        >
          <Button color={copied ? "secondary" : ""}>
            {copied ? "Copied!" : "Copy the embeded code"}
          </Button>
        </CopyToClipboard>
        <Button onClick={setOpen} color="primary" autoFocus>
          Exit
        </Button>
      </DialogActions>
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
                camera-controls
                autoplay
                ar-modes="webxr scene-viewer quick-look"
                quick-look-browsers="safari chrome firefox"
                loading="eager"
                interaction-prompt="none"
                {...toAttributes(attributes)}
              >
                {Boolean(attributes.arButtonImage) && (
                  <input
                    type="image"
                    src={IMAGES_PATH + attributes.arButtonImage}
                    className="ar-button"
                    style={{ width: "50%" }}
                    slot="ar-button"
                    alt={attributes.alt}
                  />
                )}
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
