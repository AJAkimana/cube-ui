import { store } from "../store";
import {
  ADD_NEW_PROJECT,
  EDIT_PROJECT,
  GET_DASHBOARD_COUNTS,
  GET_PROJECT_HISTORIES,
  GET_PROJECTS,
  GET_PROJECT_DETAILS,
  ADD_NEW_LOG,
} from "./actionTypes";
import { http } from "utils/http";

export const addNewProject = (projectInfo) => {
  store.dispatch({
    type: ADD_NEW_PROJECT,
    payload: http.post("/project", projectInfo),
  });
};
export const getProjects = ({ status }) => {
  let params = "";
  if (status) {
    params += `status=${status}`;
  }
  store.dispatch({
    type: GET_PROJECTS,
    payload: http.get(`/project?${params}`),
  });
};
export const updateProject = (projectInfo, projectId) => {
  store.dispatch({
    type: EDIT_PROJECT,
    payload: http.patch(`/project/${projectId}`, projectInfo),
  });
};
export const getDashboardCounts = () => {
  store.dispatch({
    type: GET_DASHBOARD_COUNTS,
    payload: http.get("/home/dashboard"),
  });
};
export const getProjectHistories = (projectId = "") => {
  store.dispatch({
    type: GET_PROJECT_HISTORIES,
    payload: http.get(`/project/${projectId}/histories`),
  });
};
export const getProjectDetails = (projectId = "") => {
  store.dispatch({
    type: GET_PROJECT_DETAILS,
    payload: http.get(`/project/${projectId}`),
  });
};
export const addNewLog = (projectId = "", logBody = {}) => {
  store.dispatch({
    type: ADD_NEW_LOG,
    payload: http.post(`/project/${projectId}/histories`, logBody),
  });
};
