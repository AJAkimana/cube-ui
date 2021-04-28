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
import { ComputerOutlined } from "@material-ui/icons";
import { addNewProject, updateProject } from "redux/actions/project";
import { Loading } from "components/loading.component";
import { useStyles } from "styles/formStyles";
import { getUsersList } from "redux/actions/user";

const initialState = {
  name: "",
  type: "",
  status: "pending",
  description: "",
  userId: "",
};
const projectStatuses = ["pending", "approved", "canceled"];
const projectTypes = [
  "Cube Platform",
  "3D modeling",
  "3D Viewer",
  "3D Configurator",
  "AR",
];
export const ProjectRegistration = ({ action = "add", currentItem = null }) => {
  const classes = useStyles();
  const [values, setValues] = useState(initialState);
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
      setValues(initialState);
    }
  }, [added, updated]);
  useEffect(() => {
    if (currentItem) {
      const { status, name, description, type } = currentItem;
      setValues({ name, status, description, type });
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
                    <MenuItem value={type} key={typeIdx}>
                      {type.toUpperCase()}
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
            <Grid item xs={12}>
              <TextField
                className={classes.input}
                variant="outlined"
                fullWidth
                name="description"
                label="Project description"
                id="description"
                value={values.description}
                onChange={onHandleChange}
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
