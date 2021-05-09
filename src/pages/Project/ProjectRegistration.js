import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Typography,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Card,
  CardActions,
} from "@material-ui/core";
import moment from "moment";
import { ComputerOutlined } from "@material-ui/icons";
import { EditorState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import { stateFromHTML } from "draft-js-import-html";
import { addNewProject, updateProject } from "redux/actions/project";
import { Loading } from "components/loading.component";
import { useStyles } from "styles/formStyles";
import { getUsersList } from "redux/actions/user";
import { DraftEditor } from "components/DraftEditor";

const initialState = {
  name: "",
  type: "",
  nOfItems: "1",
  startDate: "",
  dueDate: "",
  budget: "",
  status: "pending",
  description: "",
  userId: "",
};
const projectStatuses = ["pending", "approved", "canceled"];
const projectTypes = [
  {
    name: "Cube Platform",
    description: "I want to publish and manage my products in 3D and AR myself",
  },
  {
    name: "3D modeling",
    description: "I need help with creating my products in 3D",
  },
  {
    name: "3D Viewer",
    description: "I want to present my product in 3D on a website",
  },
  {
    name: "3D Configurator",
    description: "I want to showcase my products in specific configurations",
  },
  { name: "AR", description: "I want to showcase my products in AR" },
];
export const ProjectRegistration = ({ action = "add", currentItem = null }) => {
  const classes = useStyles();
  const [values, setValues] = useState(initialState);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const projectState = useSelector((state) => state);

  const {
    projectAdd: { loading: adding, loaded: added },
    projectEdit: { loading: updating, loaded: updated },
    userList: { users },
    login: {
      userInfo: { user },
    },
  } = projectState;
  useEffect(() => {
    getUsersList();
  }, []);
  useEffect(() => {
    if (user.role === "Client") {
      setValues({ ...values, userId: user._id });
    }
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (added || updated) {
      let states = { ...initialState };
      states.userId = user.role === "Client" ? user._id : "";
      setValues(states);
      setEditorState(EditorState.createEmpty());
    }
  }, [added, updated]);
  useEffect(() => {
    if (currentItem) {
      const {
        status,
        name,
        description,
        type,
        nOfItems,
        startDate,
        dueDate,
        budget,
        user,
      } = currentItem;
      const contentState = stateFromHTML(description);
      setValues({
        name,
        status,
        type,
        nOfItems,
        startDate: moment(startDate).format("YYYY-MM-DD"),
        dueDate: moment(dueDate).format("YYYY-MM-DD"),
        budget,
        userId: user,
      });
      setEditorState(EditorState.createWithContent(contentState));
    }
  }, [currentItem]);
  const onHandleChange = (e) => {
    e.preventDefault();
    const {
      target: { name, value },
    } = e;
    setValues({ ...values, [name]: value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    values.description = stateToHTML(editorState.getCurrentContent());
    if (action !== "add" && currentItem) {
      updateProject(values, currentItem._id);
    } else {
      addNewProject(values);
    }
  };
  return (
    <Card component="main" className={classes.root}>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <ComputerOutlined />
        </Avatar>
        <Typography component="h1" variant="h4">
          {currentItem
            ? `Update "${currentItem?.name?.toUpperCase()}" project`
            : "Add a new project"}
        </Typography>
        {(adding || updating) && <Loading />}
        <form className={classes.form} onSubmit={submitHandler}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                className={classes.input}
                name="name"
                variant="outlined"
                fullWidth
                label="Project name"
                onChange={onHandleChange}
                value={values.name}
                autoFocus
              />
            </Grid>
            {user.role === "Manager" && (
              <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="project-owner">Project owner</InputLabel>
                  <Select
                    labelId="project-owner"
                    value={values.userId}
                    name="userId"
                    onChange={onHandleChange}
                  >
                    <MenuItem value="">---</MenuItem>
                    {users.map(({ _id, fullName }, userIdx) => (
                      <MenuItem value={_id} key={userIdx}>
                        {fullName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )}
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="project-type">Project type</InputLabel>
                <Select
                  labelId="project-type"
                  value={values.type}
                  name="type"
                  onChange={onHandleChange}
                >
                  <MenuItem value="">---</MenuItem>
                  {projectTypes.map((type, typeIdx) => (
                    <MenuItem value={type.name} key={typeIdx}>
                      {`${type.name} - ${type.description}`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="project-status">Status</InputLabel>
                <Select
                  labelId="project-status"
                  value={values.status}
                  name="status"
                  onChange={onHandleChange}
                  disabled={action !== "change"}
                >
                  <MenuItem value="">---</MenuItem>
                  {projectStatuses.map((status, choiceIdx) => (
                    <MenuItem value={status} key={choiceIdx}>
                      {status.toUpperCase()}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item lg={6} md={6} xl={6} xs={12}>
              <TextField
                className={classes.input}
                variant="outlined"
                fullWidth
                type="date"
                name="startDate"
                label="Start date"
                value={values.startDate}
                onChange={onHandleChange}
              />
            </Grid>
            <Grid item lg={6} md={6} xl={6} xs={12}>
              <TextField
                className={classes.input}
                variant="outlined"
                fullWidth
                type="date"
                name="dueDate"
                label="Due date"
                value={values.dueDate}
                onChange={onHandleChange}
              />
            </Grid>
            <Grid item lg={4} md={4} xl={4} xs={12}>
              <TextField
                className={classes.input}
                variant="outlined"
                fullWidth
                type="number"
                name="nOfItems"
                label="Number of items"
                value={values.nOfItems}
                onChange={onHandleChange}
              />
            </Grid>
            <Grid item lg={8} md={8} xl={8} xs={12}>
              <TextField
                className={classes.input}
                variant="outlined"
                fullWidth
                type="number"
                name="budget"
                label="Budget"
                value={values.budget}
                onChange={onHandleChange}
              />
            </Grid>
            <Grid item xs={12}>
              {/* <TextField
                className={classes.input}
                variant="outlined"
                fullWidth
                name="description"
                label="Project description"
                id="description"
                value={values.description}
                onChange={onHandleChange}
              /> */}
              <DraftEditor
                editorState={editorState}
                setEditorState={setEditorState}
              />
            </Grid>
          </Grid>
          <CardActions>
            {action === "add" ? (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.submit}
                disabled={adding}
              >
                Save
              </Button>
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.submit}
                disabled={updating}
              >
                Update the project
              </Button>
            )}
          </CardActions>
        </form>
      </div>
    </Card>
  );
};
