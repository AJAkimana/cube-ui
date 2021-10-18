import React, { useState, useEffect } from "react";
import moment from "moment";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { useSelector } from "react-redux";
import NumberFormat from "react-number-format";
import { DraftEditor } from "components/DraftEditor";
import { EditorState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import { stateFromHTML } from "draft-js-import-html";
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
  FormControlLabel,
  Switch,
} from "@material-ui/core";
import { ComputerOutlined } from "@material-ui/icons";
import { addNewQuote, updateQuote } from "redux/actions/quote";
import { Loading } from "components/loading.component";
import { useStyles } from "styles/formStyles";
import { getProjects } from "redux/actions/project";

const initialState = {
  projectId: "",
  billingCycle: "Monthly",
  tax: "0",
  discount: "0",
  isFixed: false,
  expiryDate: moment().format("YYYY-MM-DD"),
  propasalText: "",
  customerNote: "",
};
const quoteCycles = ["Monthly", "Yearly", "OneTime"];
const qStatuses = ["Accepted", "Lost", "Dead"];
export const QuoteRegistration = ({ action = "add", currentItem = null }) => {
  const classes = useStyles();
  const [values, setValues] = useState(initialState);
  const [propTextState, setPropTextState] = useState(EditorState.createEmpty());
  const [noteState, setNoteState] = useState(EditorState.createEmpty());
  const quoteState = useSelector((state) => state);

  const {
    quoteAdd: { loading: adding, loaded: added },
    quoteEdit: { loading: updating, loaded: updated },
    projectsGet: { projects },
    login: {
      userInfo: { user },
    },
  } = quoteState;

  useEffect(() => {
    if (added || updated) {
      setValues(initialState);
      setPropTextState(EditorState.createEmpty());
      setNoteState(EditorState.createEmpty());
    }
  }, [added, updated]);
  useEffect(() => {
    getProjects({});
  }, []);
  useEffect(() => {
    if (currentItem) {
      const { project, user, updatedAt, createdAt, _id, __v, ...rest } =
        currentItem;
      const projectId = project._id;
      const expiryDate = moment(currentItem.expiryDate).format("YYYY-MM-DD");
      setValues({ ...rest, projectId, expiryDate });
      const propasalText = stateFromHTML(rest.propasalText);
      const customerNote = stateFromHTML(rest.customerNote);
      setPropTextState(EditorState.createWithContent(propasalText));
      setNoteState(EditorState.createWithContent(customerNote));
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
    values.propasalText = stateToHTML(propTextState.getCurrentContent());
    values.customerNote = stateToHTML(noteState.getCurrentContent());
    const { amount, amounts, ...quoteValues } = values;
    if (action !== "add" && currentItem) {
      updateQuote(quoteValues, currentItem._id);
    } else {
      addNewQuote(quoteValues);
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
            ? `Update "${currentItem.project.name.toUpperCase()}" proposal`
            : "Add a new proposal"}
        </Typography>
        {(adding || updating) && <Loading />}
        {((currentItem && action !== "items") ||
          (action === "add" && user.role !== "Client")) && (
          <form className={classes.form} onSubmit={submitHandler}>
            <Grid container spacing={1}>
              {(action === "add" || action === "edit") && (
                <Grid item xs={12}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel id="project">Project</InputLabel>
                    <Select
                      labelId="project"
                      value={values.projectId}
                      name="projectId"
                      onChange={onHandleChange}
                    >
                      <MenuItem value="">---</MenuItem>
                      {projects.map(({ _id, name, user }, choiceIdx) => (
                        <MenuItem value={_id} key={choiceIdx}>
                          {`${name} ---> ${user?.fullName}`}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              )}
              {(action === "add" || action === "edit") && (
                <Grid item xs={12}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel id="billing-cycle">Billing cycle</InputLabel>
                    <Select
                      labelId="billing-cycle"
                      value={values.billingCycle}
                      name="billingCycle"
                      onChange={onHandleChange}
                      disabled={action === "change"}
                    >
                      <MenuItem value="">---</MenuItem>
                      {quoteCycles.map((cyle, choiceIdx) => (
                        <MenuItem value={cyle} key={choiceIdx}>
                          {cyle.toUpperCase()}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              )}
              {(action === "add" || action === "edit") && (
                <>
                  <Grid item xs={12} sm={12} md={5} lg={5}>
                    <TextField
                      className={classes.input}
                      name="tax"
                      variant="outlined"
                      type="number"
                      fullWidth
                      label="Sales tax in %"
                      onChange={onHandleChange}
                      value={values.tax}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={5} lg={5}>
                    {values.isFixed ? (
                      <NumberFormat
                        className={classes.input}
                        value={values.discount}
                        onValueChange={({ floatValue }) =>
                          setValues({ ...values, discount: floatValue })
                        }
                        prefix="$"
                        thousandSeparator
                        customInput={TextField}
                        fullWidth
                        variant="outlined"
                        label="Discount(in USD)"
                      />
                    ) : (
                      <TextField
                        name="discount"
                        variant="outlined"
                        type="number"
                        fullWidth
                        label="Discount(in %)"
                        onChange={onHandleChange}
                        value={values.discount}
                      />
                    )}
                  </Grid>
                  <Grid item xs={12} sm={12} md={2} lg={2}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={values.isFixed}
                          onChange={({ target: { checked } }) =>
                            setValues({ ...values, isFixed: checked })
                          }
                        />
                      }
                      label="Is fixed"
                      labelPlacement="top"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        label="Expiry Date"
                        inputVariant="outlined"
                        value={values.expiryDate}
                        InputAdornmentProps={{ position: "start" }}
                        format="yyyy-MM-dd"
                        views={["year", "month", "date"]}
                        onChange={(dateValue) =>
                          setValues((prev) => ({
                            ...prev,
                            expiryDate: dateValue,
                          }))
                        }
                        minDate={new Date()}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h4">Propasal text</Typography>
                    <DraftEditor
                      editorState={propTextState}
                      setEditorState={setPropTextState}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h4">Customer note</Typography>
                    <DraftEditor
                      editorState={noteState}
                      setEditorState={setNoteState}
                    />
                  </Grid>
                </>
              )}
              {action === "change" && (
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
                      {qStatuses.map((status, choiceIdx) => (
                        <MenuItem value={status} key={choiceIdx}>
                          {status.toUpperCase()}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              )}
              {values.status && action === "change" && (
                <Grid item xs={12}>
                  <TextField
                    className={classes.input}
                    variant="outlined"
                    fullWidth
                    name="comment"
                    label="Add comment"
                    value={values.comment}
                    onChange={onHandleChange}
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
                  Update the quote
                </Button>
              )}
            </CardActions>
          </form>
        )}
      </div>
    </Card>
  );
};
