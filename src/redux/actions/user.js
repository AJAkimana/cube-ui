import { store } from "../store";
import {
  RESET_PASSWORD,
  SEND_LINK,
  SET_PASSWORD,
  UPDATE_PROFILE,
  USER_DELETE,
  USER_LIST,
  USER_REGISTER,
  USER_SIGNIN,
  USER_SIGNOUT,
  USER_UPDATE,
} from "./actionTypes";
import { http } from "utils/http";

export const signin = (userInfo) => {
  store.dispatch({
    type: USER_SIGNIN,
    payload: http.post("/auth/login", userInfo),
  });
};
export const registerUser = (userInfo) => {
  store.dispatch({
    type: USER_REGISTER,
    payload: http.post("/user/register", userInfo),
  });
};
export const signout = () => {
  store.dispatch({ type: USER_SIGNOUT });
};

export const getUsersList = (userRoleType = "") => {
  let userUrl = "/auth/users";
  if (userRoleType) {
    userUrl += `?role=${userRoleType}`;
  }
  store.dispatch({
    type: USER_LIST,
    payload: http.get(userUrl),
  });
};
export const setPassword = (credentials) => {
  store.dispatch({
    type: SET_PASSWORD,
    payload: http.patch("/auth/set-password", credentials),
  });
};
export const updateUser = (userInfo) => {
  const { _id: userId, ...rest } = userInfo;
  store.dispatch({
    type: USER_UPDATE,
    payload: http.patch(`/auth/users/${userId}`, rest),
  });
};
export const deleteUser = (userId = "") => {
  store.dispatch({
    type: USER_DELETE,
    payload: http.delete(`/auth/users/${userId}`),
  });
};
export const updateProfile = (userInfo) => {
  store.dispatch({
    type: UPDATE_PROFILE,
    payload: http.patch(`/auth/edit-profile`, userInfo),
  });
};
export const sendLink = (email = "") => {
  store.dispatch({
    type: SEND_LINK,
    payload: http.post("/auth/send-reset-link", { email }),
  });
};
export const resetPassword = (credentials) => {
  store.dispatch({
    type: RESET_PASSWORD,
    payload: http.post("/auth/reset-password", credentials),
  });
};
