import React, { useEffect, useState } from "react";
import { toAttributes, toOrbitProp } from "pages/Product/productConstants";
import { IMAGES_3D_PATH, IMAGES_PATH } from "utils/constants";
import { addNewAnalytic, getProduct } from "redux/actions/product";
import { initialStates } from "pages/Product/AttributeEditor/initialStates";
import { useSelector } from "react-redux";
import Loading from "components/loading.component";

export const ProductViewPage = ({
  match,
  styles = { width: "100%", height: "100vh" },
  addVisit = true,
}) => {
  const [attributes, setAttributes] = useState(initialStates);
  const appState = useSelector((state) => state);
  const { productId } = match.params;
  const {
    productGet: { product, loaded, loading },
    analyticAdd: { loading: adding },
  } = appState;
  useEffect(() => {
    if (productId) {
      getProduct(productId, addVisit);
    }
  }, [productId, addVisit]);
  useEffect(() => {
    if (loaded) {
      const { src, ...otherProps } = product.image;
      setAttributes(otherProps);
    }
  }, [loaded, product]);
  useEffect(() => {
    const modelViewer = document.querySelector("model-viewer#image3d-viewer");
    if (loaded && modelViewer) {
      modelViewer.addEventListener("load", (ev) => {
        let material = modelViewer.model.materials[0];
        material.pbrMetallicRoughness.setMetallicFactor(attributes.metalness);
        material.pbrMetallicRoughness.setRoughnessFactor(attributes.roughness);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, attributes.metalness, attributes.roughness]);
  if (loading) return <Loading />;
  if (!Boolean(product.imagesSrc)) return null;
  return (
    <model-viewer
      id="image3d-viewer"
      src={`${IMAGES_3D_PATH}/${product.imagesSrc?.glb}`}
      ios-src={`${IMAGES_3D_PATH}/${product.imagesSrc?.usdz}`}
      style={{
        ...styles,
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
          className="ar-button"
          slot="ar-button"
          alt={attributes.alt}
          disabled={adding}
          onClick={() => addNewAnalytic(product._id, "click")}
        />
      )}
      {attributes.hotspots?.map((hs, hsIdx) => (
        <button
          key={hsIdx}
          slot={`hotspot-${hsIdx}`}
          className="hotspot"
          style={{ backgroundColor: hs.bgColor }}
          data-position={hs.dataPosition}
          data-normal={hs.dataNormal}
        >
          <div className="annotation">{hs.dataText}</div>
        </button>
      ))}
    </model-viewer>
  );
};
