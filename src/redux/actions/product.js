import { store } from "../store";
import {
  ADD_NEW_PRODUCT,
  GET_PRODUCTS,
  UPLOAD_PRODUCT_IMAGES,
} from "./actionTypes";
import { http } from "utils/http";

const BASE_URL = "/products";
export const uploadProductImages = (formData) => {
  const config = {
    headers: { "Content-Type": "multipart/form-data" },
  };
  const uploadUrl = `${BASE_URL}/upload/image`;
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
