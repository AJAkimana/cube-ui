export const initialState = {
  name: "",
  customer: "",
  price: "",
  status: "",
  sku: "",
  bgColor: "#FAFAFA",
  description: "",
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
