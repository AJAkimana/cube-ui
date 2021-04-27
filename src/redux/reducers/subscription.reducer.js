import { baseState } from "../utils/baseStates";
import { GET_SUBSCRIPTIONS } from "../actions/actionTypes";
import { pending, fulfilled, rejected } from "../utils/actions";

export const subscriptionsGetReducer = (
  state = baseState("subscriptions", []),
  action
) => {
  switch (action.type) {
    case pending(GET_SUBSCRIPTIONS): {
      return {
        ...state,
        loading: true,
      };
    }
    case fulfilled(GET_SUBSCRIPTIONS): {
      return {
        ...state,
        loading: false,
        loaded: true,
        subscriptions: action.payload.data.data,
      };
    }
    case rejected(GET_SUBSCRIPTIONS):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};
