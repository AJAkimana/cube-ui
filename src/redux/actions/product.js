import { store } from "../store";
import {
  ADD_NEW_PRODUCT,
  GET_PRODUCTS,
  GET_PRODUCT_IMAGES,
  UPDATE_PRODUCT,
  UPLOAD_PRODUCT_IMAGES,
} from "./actionTypes";
import { http } from "utils/http";

const BASE_URL = "/products";
export const uploadProductImages = (formData, currentImage = null) => {
  const config = {
    headers: { "Content-Type": "multipart/form-data" },
  };
  let uploadUrl = `${BASE_URL}/upload/image`;
  if (currentImage) {
    uploadUrl += `?prevFile=${currentImage}`;
  }
  store.dispatch({
    type: UPLOAD_PRODUCT_IMAGES,
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
