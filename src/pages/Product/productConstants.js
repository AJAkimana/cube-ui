import { IMAGES_PATH } from "utils/constants";

export const initialState = {
  name: "",
  customer: "",
  project: "",
  price: "",
  status: "",
  sku: "",
  bgColor: "#FAFAFA",
  description: "",
  website: "",
  image: "",
};
export const productStatuses = ["QA", "COMPLETED"];
export const toOrbitProp = (type = "cameraOrbit", imageProp = {}) => {
  const theImgOrbitProp = imageProp[type];
  let orbitProp = theImgOrbitProp?.default;
  if (!theImgOrbitProp?.useDefault) {
    orbitProp = "";

    const customAttr = theImgOrbitProp?.custom;

    orbitProp += `${customAttr?.side}deg`;
    orbitProp += ` ${customAttr?.ud}deg`;
    orbitProp += ` ${customAttr?.side}%`;
  }
  return orbitProp;
};
export const toAttributes = (imageProp) => {
  const { skyboxImage, environmentImage } = imageProp;
  let attribs = {};
  if (imageProp.disableZoom) {
    attribs["disable-zoom"] = "true";
  }
  if (imageProp.autoRotate) {
    attribs["auto-rotate"] = "true";
  }
  if (skyboxImage?.active && skyboxImage?.image) {
    attribs["skybox-image"] = IMAGES_PATH + skyboxImage?.image;
  }
  if (environmentImage?.active && environmentImage?.image) {
    attribs["environment-image"] = IMAGES_PATH + environmentImage?.image;
  }
  return attribs;
};
