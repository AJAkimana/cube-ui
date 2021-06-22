import { baseState } from "../utils/baseStates";
import { GET_NOTIFICATIONS } from "../actions/actionTypes";
import { pending, fulfilled, rejected } from "../utils/actions";

export const notifsGetReducer = (state = baseState("notifs", []), action) => {
  switch (action.type) {
    case pending(GET_NOTIFICATIONS): {
      return {
        ...state,
        loading: true,
      };
    }
    case fulfilled(GET_NOTIFICATIONS): {
      return {
        ...state,
        loading: false,
        loaded: true,
        notifs: action.payload.data.data,
      };
    }
    case rejected(GET_NOTIFICATIONS):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};
