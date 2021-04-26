import { baseState } from "../utils/baseStates";
import { UPDATE_INVOICE, GET_INVOICES } from "../actions/actionTypes";
import { pending, fulfilled, rejected } from "../utils/actions";

export const invoiceEditReducer = (
  state = baseState("message", ""),
  action
) => {
  switch (action.type) {
    case pending(UPDATE_INVOICE): {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }
    case fulfilled(UPDATE_INVOICE): {
      return {
        ...state,
        loading: false,
        loaded: true,
        message: "Success",
      };
    }
    case rejected(UPDATE_INVOICE):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};
export const invoicesGetReducer = (
  state = baseState("invoices", []),
  action
) => {
  switch (action.type) {
    case pending(GET_INVOICES): {
      return {
        ...state,
        loading: true,
      };
    }
    case fulfilled(GET_INVOICES): {
      return {
        ...state,
        loading: false,
        loaded: true,
        invoices: action.payload.data.data,
      };
    }
    case rejected(GET_INVOICES):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};
