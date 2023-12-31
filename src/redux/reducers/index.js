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
import { promisedReducer } from "../utils/reducer";
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
  ADD_ANALYTIC,
  ADD_NEW_PRODUCT,
  ADD_PROJECT_PROD,
  DELETE_ATTR_IMAGE,
  DELETE_PRODUCT,
  GET_ANALYTICS,
  GET_PRODUCT,
  GET_PRODUCTS,
  GET_PRODUCT_IMAGES,
  GET_PROJECT_PROD,
  UPDATE_ATTRIBUTES,
  UPDATE_PRODUCT,
  UPLOAD_PRODUCT_IMAGES,
} from "redux/actions/actionTypes";
import { attrImageReducer, qrCodeGeneratorReducer } from "./file.reducer";

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
  fileUpload: promisedReducer(UPLOAD_PRODUCT_IMAGES, "filePath", "string"),
  productAdd: promisedReducer(ADD_NEW_PRODUCT, "product", "object"),
  productsGet: promisedReducer(GET_PRODUCTS, "products", "array"),
  productImg: promisedReducer(GET_PRODUCT_IMAGES, "image", "object"),
  productEdit: promisedReducer(UPDATE_PRODUCT, "message", "string"),
  attrUpdate: promisedReducer(UPDATE_ATTRIBUTES, "message", "string"),
  productGet: promisedReducer(GET_PRODUCT, "product", "object", true),
  attrImg: attrImageReducer,
  imgAttrDel: promisedReducer(DELETE_ATTR_IMAGE, "deletedFile", "string"),
  projectAddProd: promisedReducer(ADD_PROJECT_PROD, "message", "string", true),
  projectProdsGet: promisedReducer(GET_PROJECT_PROD, "projProds", "array"),
  analyticsGet: promisedReducer(GET_ANALYTICS, "analytics", "array"),
  analyticAdd: promisedReducer(ADD_ANALYTIC, "analytic", "object", true),
  qrGenerate: qrCodeGeneratorReducer,
  productRm: promisedReducer(DELETE_PRODUCT, "message", "string", true),
});
