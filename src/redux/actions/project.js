import { store } from "../store";
import { ADD_NEW_PROJECT, EDIT_PROJECT, GET_PROJECT } from "./actionTypes";
import { http } from "utils/http";

export const addNewProject = (projectInfo) => {
  store.dispatch({
    type: ADD_NEW_PROJECT,
    payload: http.post("/project", projectInfo),
  });
};
export const getProjects = () => {
  store.dispatch({
    type: GET_PROJECT,
    payload: http.get("/project"),
  });
};
export const updateProject = (projectInfo, projectId) => {
  store.dispatch({
    type: EDIT_PROJECT,
    payload: http.patch(`/project/${projectId}`, projectInfo),
  });
};
