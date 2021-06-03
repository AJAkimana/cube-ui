import React, { useState, useEffect } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { 
  KeyboardDatePicker, 
  MuiPickersUtilsProvider } from '@material-ui/pickers';
import { useSelector } from "react-redux";
import NumberFormat from "react-number-format";
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
import {
  initialState,
  projectStatuses,
  projectTypes,
} from "./projectConstants";

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
    getUsersList("Manager");
  }, []);
  useEffect(() => {
    if (added || updated) {
      let states = { ...initialState };
      setValues(states);
      setEditorState(EditorState.createEmpty());
    }
  }, [added, updated, user]);
  useEffect(() => {
    if (currentItem && action !== "view") {
      const {
        status,
        name,
        description,
        type,
        nOfItems,
        startDate,
        dueDate,
        budget,
        manager,
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
        managerId: manager,
      });
      setEditorState(EditorState.createWithContent(contentState));
    }
  }, [currentItem, action]);
  const onHandleChange = (e) => {
    e.preventDefault();
    const {
      target: { name, value },
    } = e;
    setValues({ ...values, [name]: value });
  };

  const changeStartDate = (value) => {
    setValues({...values, startDate: value})
  }

  const changeDueDate = (value) => {
    setValues({...values, dueDate: value})
  }

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
          {currentItem && action !== "view"
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
                disabled={user.role !== "Client"}
              />
            </Grid>
            {user.role === "Admin" && action === "changePm" && (
              <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="project-manager">Project manager</InputLabel>
                  <Select
                    labelId="project-manager"
                    value={values.managerId}
                    name="managerId"
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
                  disabled={user.role !== "Client"}
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
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker 
                  label= "Start Date"
                  inputVariant="outlined"
                  value={values.startDate}
                  InputAdornmentProps={{ position: "start" }}
                  format="yyyy-MM-dd"
                  views={["year", "month", "date"]}
                  onChange={changeStartDate}
                  disabled={user.role !== "Client"}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item lg={6} md={6} xl={6} xs={12}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker 
                  label= "Due Date"
                  inputVariant="outlined"
                  value={values.dueDate} 
                  InputAdornmentProps={{ position: "start" }}
                  format="yyyy-MM-dd"
                  views={["year", "month", "date"]}
                  disabled={user.role !== "Client"}
                  onChange={changeDueDate}
                />
              </MuiPickersUtilsProvider>
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
                disabled={user.role !== "Client"}
              />
            </Grid>
            <Grid item lg={8} md={8} xl={8} xs={12}>
              <NumberFormat
                className={classes.input}
                value={values.budget}
                onValueChange={({ floatValue }) =>
                  setValues({ ...values, budget: floatValue })
                }
                prefix="$"
                thousandSeparator
                customInput={TextField}
                fullWidth
                variant="outlined"
                label="Budget(in USD)"
                disabled={user.role !== "Client"}
              />
            </Grid>
            {user.role === "Client" && (
              <Grid item xs={12}>
                <DraftEditor
                  editorState={editorState}
                  setEditorState={setEditorState}
                />
              </Grid>
            )}
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
