import { combineReducers } from "redux";
import { invoiceEditReducer, invoicesGetReducer } from "./invoice.reducer";
import {
  projectAddReducer,
  projectEditReducer,
  projectsGetReducer,
} from "./project.reducer";
import {
  quoteAddReducer,
  quoteEditReducer,
  quotesGetReducer,
} from "./quote.reducer";
import {
  loginReducer,
  registerReducer,
  setPasswordReducer,
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
});
