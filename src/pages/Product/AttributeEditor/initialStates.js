const orbits = { side: 50, ud: 50, io: 50 };
export const initialStates = {
  disableZoom: false,
  autoRotate: true,
  autoRotateDelay: 3000,
  backgroundColor: "#abab34",
  cameraOrbit: { default: "0deg 75deg 105%", custom: orbits, useCustom: false },
  minCameraOrbit: {
    default: "Infinity 22.5deg auto",
    custom: orbits,
    useCustom: false,
  },
  maxCameraOrbit: {
    default: "Infinity 157.5deg auto",
    custom: orbits,
    useCustom: false,
  },
  cameraTarget: { default: "auto auto auto", custom: "", useCustom: false },
  fieldOfView: 10,
  exposure: 1,
  shadowIntensity: 0,
  shadowSoftness: 0,
  alt: "",
  scale: "auto",
  placement: "floor",
  metalness: 0,
  roughness: 0,
};
