import React, { useEffect, useState } from "react";
import { toAttributes, toOrbitProp } from "pages/Product/productConstants";
import { IMAGES_3D_PATH, IMAGES_PATH } from "utils/constants";
import { getProduct } from "redux/actions/product";
import { initialStates } from "pages/Product/AttributeEditor/initialStates";
import { useSelector } from "react-redux";

export const ProductViewPage = ({ match }) => {
  const [attributes, setAttributes] = useState(initialStates);
  const appState = useSelector((state) => state);
  const { productId } = match.params;
  const {
    productGet: { product, loaded },
  } = appState;
  useEffect(() => {
    getProduct(productId);
  }, [productId]);
  useEffect(() => {
    if (loaded) {
      const { src, ...otherProps } = product.image;
      setAttributes(otherProps);
    }
  }, [loaded, product]);
  const onSelectHotspot = (hotspot) => {
    const currentAttributes = { ...attributes };
    const theHotspots = currentAttributes.hotspots.map((hs) => ({
      ...hs,
      selected: hs.dataNormal === hotspot.dataNormal ? "selected" : "",
    }));
    currentAttributes.hotspots = theHotspots;
    setAttributes(currentAttributes);
  };
  return (
    <model-viewer
      id="image3d-viewer"
      src={`${IMAGES_3D_PATH}/${product.imagesSrc?.glb}`}
      ios-src={`${IMAGES_3D_PATH}/${product.imagesSrc?.usdz}`}
      style={{
        width: "100%",
        height: "100vh",
        border: "none",
        backgroundColor: attributes.backgroundColor,
      }}
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
  );
};
