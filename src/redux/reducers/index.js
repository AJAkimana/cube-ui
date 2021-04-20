import { combineReducers } from "redux";
import {
  projectAddReducer,
  projectEditReducer,
  projectsGetReducer,
} from "./project.reducer";
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
});
