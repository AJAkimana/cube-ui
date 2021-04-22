import { store } from "../store";
import { ADD_NEW_QUOTE, UPDATE_QUOTE, GET_QUOTES } from "./actionTypes";
import { http } from "utils/http";

export const addNewQuote = (quoteInfo) => {
  store.dispatch({
    type: ADD_NEW_QUOTE,
    payload: http.post("/quote", quoteInfo),
  });
};
export const getQuotes = () => {
  store.dispatch({
    type: GET_QUOTES,
    payload: http.get("/quote"),
  });
};
export const updateQuote = (quoteInfo, quoteId) => {
  const { projectId, ...rest } = quoteInfo;
  store.dispatch({
    type: UPDATE_QUOTE,
    payload: http.patch(`/quote/${quoteId}`, rest),
  });
};
