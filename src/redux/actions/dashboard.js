import { store } from "redux/store";
import { GET_NOTIFICATIONS, GET_NOTIFICATIONS_COUNT } from "./actionTypes";
import { http } from "utils/http";

export const getNotifications = (type = "") => {
  let routeParams = "notifications";
  let actionType = GET_NOTIFICATIONS;
  if (type !== "") {
    routeParams += "?type=count";
    actionType = GET_NOTIFICATIONS_COUNT;
  }
  store.dispatch({
    type: actionType,
    payload: http.get(`/home/${routeParams}`),
  });
};
