import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { getProductImages } from "redux/actions/product";
import { useSelector } from "react-redux";
import { IMAGES_PATH } from "utils/constants";
import Loading from "components/loading.component";

export const ImagePreview = ({ open, setOpen, productInfo = null }) => {
  const appState = useSelector((state) => state);
  const [product, setProduct] = useState({});
  const {
    productImg: { loading, image },
  } = appState;
  useEffect(() => {
    if (productInfo) {
      getProductImages(productInfo?._id);
      setProduct(productInfo);
      // console.log("productInfo", productInfo);
    }
  }, [productInfo]);
  return (
    <Dialog
      open={open}
      maxWidth="md"
      fullWidth
      onClose={setOpen}
      aria-labelledby="product-dialog-title"
      aria-describedby="product-dialog-description"
    >
      <DialogTitle id="product-dialog-title">{product?.name}</DialogTitle>
      <DialogContent>
        {loading && !image.glb ? (
          <Loading />
        ) : (
          <model-viewer
            src={`${IMAGES_PATH}/${image.glb}`}
            ios-src={`${IMAGES_PATH}/${image.usdz}`}
            disable-zoom={String(product.image?.disableZoom)}
            auto-rotate={String(product.image?.autoRotate)}
            auto-rotate-delay={String(product.image?.autoRotateDelay)}
            background-color={product.image?.backgroundColor}
            camera-orbit={product.image?.cameraOrbit}
            min-camera-orbit={String(product.image?.minCameraOrbit)}
            max-camera-orbit={product.image?.maxCameraOrbit}
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
          ></model-viewer>
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
