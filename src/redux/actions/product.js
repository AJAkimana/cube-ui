import { store } from "../store";
import { UPLOAD_PRODUCT_IMAGES } from "./actionTypes";
import { http } from "utils/http";

export const uploadProductImages = (formData) => {
  // const files = formData.getAll("productFiles");
  // console.log(files);
  store.dispatch({
    type: UPLOAD_PRODUCT_IMAGES,
    payload: http.post("/products/upload/image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  });
};
