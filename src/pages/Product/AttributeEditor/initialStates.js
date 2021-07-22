const orbits = { side: 50, ud: 50, io: 50 };
export const initialStates = {
  disableZoom: false,
  autoRotate: true,
  autoRotateDelay: 3000,
  backgroundColor: "#ffffff",
  cameraOrbit: { default: "0deg 75deg 105deg", custom: orbits },
  minCameraOrbit: { default: "Infinity 22.5deg auto", custom: orbits },
  maxCameraOrbit: { default: "Infinity 157.5deg auto", custom: orbits },
  cameraTarget: { default: "auto auto auto", custom: "" },
  fieldOfView: 10,
  exposure: 1,
  shadowIntensity: 0,
  shadowSoftness: 0,
  alt: "",
  scale: "auto",
  placement: "floor",
};
