import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Typography,
  Container,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
} from "@material-ui/core";
import { ComputerOutlined } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { addNewProject, updateProject } from "redux/actions/project";
import { Loading } from "components/loading.component";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#8967fc",
  },
  input: {
    fontSize: 16,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(2),
    color: "black",
    fontSize: 16,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#8967fc",
    borderRadius: 5,
    float: "left",
    maxWidth: "100%",
    color: "white",
    fontSize: 16,
    "&:hover": {
      backgroundColor: "#8967fc",
      color: "#FFFFFF",
    },
  },
}));

const initialState = {
  name: "",
  status: "pending",
  description: "",
};
const projectStatuses = ["pending", "approved", "canceled"];
export const ProjectRegistration = ({ action = "add", currentItem = null }) => {
  const classes = useStyles();
  const [values, setValues] = useState(initialState);
  const projectState = useSelector((state) => state);

  const {
    projectAdd: { loading: adding, loaded: added },
    projectEdit: { loading: updating, loaded: updated },
  } = projectState;

  useEffect(() => {
    if (added || updated) {
      setValues(initialState);
    }
  }, [added, updated]);
  useEffect(() => {
    if (currentItem) {
      const { status, name, description } = currentItem;
      setValues({ name, status, description });
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
    <Container component="main">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <ComputerOutlined />
        </Avatar>
        <Typography component="h1" variant="h4">
          {currentItem
            ? `Update "${currentItem.name.toUpperCase()}" project`
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
                id="name"
                label="Project name"
                onChange={onHandleChange}
                value={values.name}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="project-status">Status</InputLabel>
                <Select
                  labelId="project-status"
                  value={values.status}
                  name="status"
                  onChange={onHandleChange}
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
        </form>
      </div>
    </Container>
  );
};
