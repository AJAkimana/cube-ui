import { baseState } from "../utils/baseStates";
import {
  USER_REGISTER,
  USER_SIGNIN,
  USER_LIST,
  SET_PASSWORD,
  USER_SIGNOUT,
  USER_UPDATE,
  USER_DELETE,
} from "../actions/actionTypes";
import { pending, fulfilled, rejected } from "../utils/actions";

export const loginReducer = (
  state = baseState("userInfo", { user: {} }),
  action
) => {
  switch (action.type) {
    case pending(USER_SIGNIN): {
      return {
        ...state,
        loading: true,
      };
    }
    case fulfilled(USER_SIGNIN): {
      return {
        ...state,
        loading: false,
        loaded: true,
        userInfo: action.payload.data.data,
      };
    }
    case USER_SIGNOUT: {
      return {
        ...state,
        loaded: false,
        userInfo: { user: {} },
      };
    }
    case rejected(USER_SIGNIN):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};
export const registerReducer = (state = baseState("userInfo", {}), action) => {
  switch (action.type) {
    case pending(USER_REGISTER): {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }
    case fulfilled(USER_REGISTER): {
      return {
        ...state,
        loading: false,
        loaded: true,
        userInfo: action.payload.data.data,
      };
    }
    case rejected(USER_REGISTER):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};
export const usersListReducer = (state = baseState("users", []), action) => {
  switch (action.type) {
    case pending(USER_LIST): {
      return {
        ...state,
        loading: true,
      };
    }
    case fulfilled(USER_LIST): {
      return {
        ...state,
        loading: false,
        loaded: true,
        users: action.payload.data.data,
      };
    }
    case rejected(USER_LIST):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};
export const setPasswordReducer = (
  state = baseState("message", ""),
  action
) => {
  switch (action.type) {
    case pending(SET_PASSWORD): {
      return {
        ...state,
        loading: true,
      };
    }
    case fulfilled(SET_PASSWORD): {
      return {
        ...state,
        loading: false,
        loaded: true,
        message: "Success",
      };
    }
    case rejected(SET_PASSWORD):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};
export const userEditReducer = (state = baseState("message", ""), action) => {
  switch (action.type) {
    case pending(USER_UPDATE): {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }
    case fulfilled(USER_UPDATE): {
      return {
        ...state,
        loading: false,
        loaded: true,
        message: action.payload.data.message,
      };
    }
    case rejected(USER_UPDATE):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};
export const userDeleteReducer = (state = baseState("message", ""), action) => {
  switch (action.type) {
    case pending(USER_DELETE): {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }
    case fulfilled(USER_DELETE): {
      return {
        ...state,
        loading: false,
        loaded: true,
        message: action.payload.data.message,
      };
    }
    case rejected(USER_DELETE):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};
