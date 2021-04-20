import { baseState } from "../utils/baseStates";
import {
  ADD_NEW_QUOTE,
  UPDATE_QUOTE,
  GET_QUOTES,
} from "../actions/actionTypes";
import { pending, fulfilled, rejected } from "../utils/actions";

export const quoteAddReducer = (state = baseState("message", ""), action) => {
  switch (action.type) {
    case pending(ADD_NEW_QUOTE): {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }
    case fulfilled(ADD_NEW_QUOTE): {
      return {
        ...state,
        loading: false,
        loaded: true,
        message: "Success",
      };
    }
    case rejected(ADD_NEW_QUOTE):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};
export const quoteEditReducer = (state = baseState("message", ""), action) => {
  switch (action.type) {
    case pending(UPDATE_QUOTE): {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }
    case fulfilled(UPDATE_QUOTE): {
      return {
        ...state,
        loading: false,
        loaded: true,
        message: "Success",
      };
    }
    case rejected(UPDATE_QUOTE):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};
export const quotesGetReducer = (state = baseState("quotes", []), action) => {
  switch (action.type) {
    case pending(GET_QUOTES): {
      return {
        ...state,
        loading: true,
      };
    }
    case fulfilled(GET_QUOTES): {
      return {
        ...state,
        loading: false,
        loaded: true,
        quotes: action.payload.data.data,
      };
    }
    case rejected(GET_QUOTES):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};
