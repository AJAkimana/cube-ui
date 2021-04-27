import { baseState } from "../utils/baseStates";
import {
  ADD_NEW_PROJECT,
  EDIT_PROJECT,
  GET_DASHBOARD_COUNTS,
  GET_PROJECTS,
} from "../actions/actionTypes";
import { pending, fulfilled, rejected } from "../utils/actions";

export const projectAddReducer = (state = baseState("message", ""), action) => {
  switch (action.type) {
    case pending(ADD_NEW_PROJECT): {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }
    case fulfilled(ADD_NEW_PROJECT): {
      return {
        ...state,
        loading: false,
        loaded: true,
        message: "Success",
      };
    }
    case rejected(ADD_NEW_PROJECT):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};
export const projectEditReducer = (
  state = baseState("message", ""),
  action
) => {
  switch (action.type) {
    case pending(EDIT_PROJECT): {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }
    case fulfilled(EDIT_PROJECT): {
      return {
        ...state,
        loading: false,
        loaded: true,
        message: "Success",
      };
    }
    case rejected(EDIT_PROJECT):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};
export const projectsGetReducer = (
  state = baseState("projects", []),
  action
) => {
  switch (action.type) {
    case pending(GET_PROJECTS): {
      return {
        ...state,
        loading: true,
      };
    }
    case fulfilled(GET_PROJECTS): {
      return {
        ...state,
        loading: false,
        loaded: true,
        projects: action.payload.data.data,
      };
    }
    case rejected(GET_PROJECTS):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};
export const dashboardReducer = (state = baseState("counts", {}), action) => {
  switch (action.type) {
    case pending(GET_DASHBOARD_COUNTS): {
      return {
        ...state,
        loading: true,
      };
    }
    case fulfilled(GET_DASHBOARD_COUNTS): {
      return {
        ...state,
        loading: false,
        loaded: true,
        counts: action.payload.data.data,
      };
    }
    case rejected(GET_DASHBOARD_COUNTS):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};
