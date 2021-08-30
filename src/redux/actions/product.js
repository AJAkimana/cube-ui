import { store } from "../store";
import {
  ADD_NEW_PRODUCT,
  GET_PRODUCT,
  GET_PRODUCTS,
  GET_PRODUCT_IMAGES,
  RESET_UPLOAD_A_IMAGE,
  UPDATE_ATTRIBUTES,
  UPDATE_PRODUCT,
  UPLOAD_ATTR_IMAGE,
  UPLOAD_PRODUCT_IMAGES,
} from "./actionTypes";
import { http } from "utils/http";

const BASE_URL = "/products";
export const uploadProductImages = (
  files,
  imageType = "image3d",
  otherAttribs = {}
) => {
  const formData = new FormData();
  for (const key of Object.keys(files)) {
    formData.append("productFiles", files[key]);
  }
  const { productId, imgType } = otherAttribs;
  const config = {
    headers: { "Content-Type": "multipart/form-data" },
  };
  let uploadUrl = `${BASE_URL}/upload/${imageType}`;
  let actionType = UPLOAD_PRODUCT_IMAGES;
  if (productId && imgType) {
    uploadUrl += `?productId=${productId}&imgType=${imgType}`;
  }
  if (imageType === "attr-image") {
    actionType = UPLOAD_ATTR_IMAGE;
  }
  store.dispatch({
    type: actionType,
    payload: http.post(uploadUrl, formData, config),
  });
};
export const addNewProduct = (productBody) => {
  store.dispatch({
    type: ADD_NEW_PRODUCT,
    payload: http.post(BASE_URL, productBody),
  });
};
export const getProducts = () => {
  store.dispatch({
    type: GET_PRODUCTS,
    payload: http.get(BASE_URL),
  });
};
export const getProductImages = (productId = "") => {
  store.dispatch({
    type: GET_PRODUCT_IMAGES,
    payload: http.get(`${BASE_URL}/files/${productId}`),
  });
};
export const editProduct = (productBody) => {
  const { _id, __v, ...rest } = productBody;
  store.dispatch({
    type: UPDATE_PRODUCT,
    payload: http.patch(`${BASE_URL}/${_id}`, rest),
  });
};
export const updateAttributes = (attributesBody = {}, productId = "") => {
  store.dispatch({
    type: UPDATE_ATTRIBUTES,
    payload: http.patch(`${BASE_URL}/attributes/${productId}`, attributesBody),
  });
};
export const getProduct = (productId) => {
  store.dispatch({
    type: GET_PRODUCT,
    payload: http.get(`${BASE_URL}/${productId}`),
  });
};
export const uploadAttrImage = (formData, imageType = "", productId = {}) => {
  const config = {
    headers: { "Content-Type": "multipart/form-data" },
  };
  let uploadUrl = `${BASE_URL}/upload/${imageType}`;
  uploadUrl += `/${productId}`;
  store.dispatch({
    type: UPLOAD_ATTR_IMAGE,
    payload: http.post(uploadUrl, formData, config),
  });
};
export const resetUploadAttrImg = () => {
  store.dispatch({
    type: RESET_UPLOAD_A_IMAGE,
  });
};
