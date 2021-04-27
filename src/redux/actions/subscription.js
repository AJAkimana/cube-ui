import { store } from "../store";
import { GET_SUBSCRIPTIONS } from "./actionTypes";
import { http } from "utils/http";

export const getGetSubscriptions = () => {
  store.dispatch({
    type: GET_SUBSCRIPTIONS,
    payload: http.get("/subscription"),
  });
};
