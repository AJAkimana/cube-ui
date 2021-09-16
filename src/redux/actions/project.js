import { store } from "../store";
import {
  ADD_NEW_PROJECT,
  EDIT_PROJECT,
  GET_DASHBOARD_COUNTS,
  GET_PROJECT_HISTORIES,
  GET_PROJECTS,
  GET_PROJECT_DETAILS,
  ADD_NEW_LOG,
  ADD_PROJECT_PROD,
  GET_PROJECT_PROD,
} from "./actionTypes";
import { http } from "utils/http";

const BASE_URL = "/project/";
export const addNewProject = (projectInfo) => {
  store.dispatch({
    type: ADD_NEW_PROJECT,
    payload: http.post(BASE_URL, projectInfo),
  });
};
export const getProjects = ({ status }) => {
  let params = "";
  if (status) {
    params += `status=${status}`;
  }
  store.dispatch({
    type: GET_PROJECTS,
    payload: http.get(`${BASE_URL}?${params}`),
  });
};
export const updateProject = (projectInfo, projectId) => {
  store.dispatch({
    type: EDIT_PROJECT,
    payload: http.patch(BASE_URL + projectId, projectInfo),
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
    payload: http.get(`${BASE_URL + projectId}/histories`),
  });
};
export const getProjectDetails = (projectId = "") => {
  store.dispatch({
    type: GET_PROJECT_DETAILS,
    payload: http.get(BASE_URL + projectId),
  });
};
export const addNewLog = (projectId = "", logBody = {}) => {
  store.dispatch({
    type: ADD_NEW_LOG,
    payload: http.post(`${BASE_URL + projectId}/histories`, logBody),
  });
};
export const addProjectProd = (newProduct = {}) => {
  const { projectId, ...rest } = newProduct;
  store.dispatch({
    type: ADD_PROJECT_PROD,
    payload: http.post(`${BASE_URL + projectId}/products`, rest),
  });
};
export const getProjectProds = (ppId, type = "project") => {
  let urlWithParams = `${BASE_URL + ppId}/products`;
  urlWithParams += `?type=${type}`;
  store.dispatch({
    type: GET_PROJECT_PROD,
    payload: http.get(urlWithParams),
  });
};
