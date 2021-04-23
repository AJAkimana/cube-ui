import { store } from "../store";
import { UPDATE_INVOICE, GET_INVOICES } from "./actionTypes";
import { http } from "utils/http";

export const getInvoices = ({}) => {
  store.dispatch({
    type: GET_INVOICES,
    payload: http.get("/invoice"),
  });
};
export const updateInvoice = (invoiceInfo = {}, invoiceId = "") => {
  const { quoteId, ...rest } = invoiceInfo;
  store.dispatch({
    type: UPDATE_INVOICE,
    payload: http.patch(`/invoice/${invoiceId}`, rest),
  });
};
