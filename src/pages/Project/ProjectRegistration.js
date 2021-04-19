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
import { getUsersList, registerUser } from "redux/actions/user";
import Loading from "components/loading.component";

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
  status: "",
  description: "",
};
const projectStatuses = ["pending", "approved", "canceled"];
export const ProjectRegistration = (props) => {
  const classes = useStyles();
  const [values, setValues] = useState(initialState);

  const userRegister = useSelector((state) => state.register);
  const { loading: registering, loaded: registered } = userRegister;

  useEffect(() => {
    if (registered) {
      getUsersList();
      setValues(initialState);
    }
  }, [registered]);
  const onHandleChange = (e) => {
    e.preventDefault();
    const {
      target: { name, value },
    } = e;
    setValues({ ...values, [name]: value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    registerUser(values);
  };
  return (
    <Container component="main">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <ComputerOutlined />
        </Avatar>
        <Typography component="h1" variant="h4">
          Add a new project
        </Typography>
        {registering && <Loading />}
        <form className={classes.form} onSubmit={submitHandler}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                className={classes.input}
                name="name"
                variant="outlined"
                fullWidth
                id="name"
                label="Project name"
                onChange={onHandleChange}
                value={values.fullName}
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
          >
            Save
          </Button>
        </form>
      </div>
    </Container>
  );
};
