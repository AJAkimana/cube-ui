import { store } from "redux/store";
import { GET_NOTIFICATIONS } from "./actionTypes";
import { http } from "utils/http";

export const getNotifications = (type = "") => {
  let routeParams = "notifications";
  if (type !== "") {
    routeParams += "?type=hasRead";
  }
  store.dispatch({
    type: GET_NOTIFICATIONS,
    payload: http.get(`/home/${routeParams}`),
  });
};
