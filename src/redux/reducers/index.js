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
});
