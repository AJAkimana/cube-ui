import { combineReducers } from "redux";
import { notifsCountReducer, notifsGetReducer } from "./dashboard.reducer";
import { invoiceEditReducer, invoicesGetReducer } from "./invoice.reducer";
import {
  dashboardReducer,
  historiesGetReducer,
  logAddReducer,
  projectAddReducer,
  projectEditReducer,
  projectGetReducer,
  projectsGetReducer,
} from "./project.reducer";
import {
  quoteAddReducer,
  quoteEditReducer,
  quotesGetReducer,
} from "./quote.reducer";
import { subscriptionsGetReducer } from "./subscription.reducer";
import { reducer } from "../utils/reducer";
import {
  loginReducer,
  profileEditReducer,
  registerReducer,
  resetPasswordReducer,
  sendLinkReducer,
  setPasswordReducer,
  userDeleteReducer,
  userEditReducer,
  usersListReducer,
} from "./user.reducer";
import {
  ADD_NEW_PRODUCT,
  DELETE_ATTR_IMAGE,
  GET_PRODUCT,
  GET_PRODUCTS,
  GET_PRODUCT_IMAGES,
  UPDATE_ATTRIBUTES,
  UPDATE_PRODUCT,
  UPLOAD_PRODUCT_IMAGES,
} from "redux/actions/actionTypes";
import { attrImageReducer } from "./file.reducer";

export default combineReducers({
  login: loginReducer,
  register: registerReducer,
  userList: usersListReducer,
  passwordSet: setPasswordReducer,
  projectAdd: projectAddReducer,
  projectsGet: projectsGetReducer,
  projectEdit: projectEditReducer,
  quoteAdd: quoteAddReducer,
  quotesGet: quotesGetReducer,
  quoteEdit: quoteEditReducer,
  invoicesGet: invoicesGetReducer,
  invoiceEdit: invoiceEditReducer,
  subscriptionsGet: subscriptionsGetReducer,
  dashboard: dashboardReducer,
  userEdit: userEditReducer,
  userRm: userDeleteReducer,
  profileEdit: profileEditReducer,
  linkSend: sendLinkReducer,
  pwdReset: resetPasswordReducer,
  historiesGet: historiesGetReducer,
  notifsGet: notifsGetReducer,
  notifsCount: notifsCountReducer,
  projectGet: projectGetReducer,
  logAdd: logAddReducer,
  fileUpload: reducer(UPLOAD_PRODUCT_IMAGES, "filePath", "string"),
  productAdd: reducer(ADD_NEW_PRODUCT, "product", "object"),
  productsGet: reducer(GET_PRODUCTS, "products", "array"),
  productImg: reducer(GET_PRODUCT_IMAGES, "image", "object"),
  productEdit: reducer(UPDATE_PRODUCT, "message", "string"),
  attrUpdate: reducer(UPDATE_ATTRIBUTES, "message", "string"),
  productGet: reducer(GET_PRODUCT, "product", "object"),
  attrImg: attrImageReducer,
  imgAttrDel: reducer(DELETE_ATTR_IMAGE, "deletedFile", "string"),
});
