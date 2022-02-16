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
  IconButton,
} from "@material-ui/core";
import {
  ComputerOutlined,
  Cancel as CancelIcon,
  Edit as EditIcon,
} from "@material-ui/icons";
import { addNewQuote, updateQuote } from "redux/actions/quote";
import { Loading } from "components/loading.component";
import { useStyles } from "styles/formStyles";
import { getProjects } from "redux/actions/project";
import { getUsersList } from "redux/actions/user";
import { toHtml } from "utils/helper";

const initialState = {
  projectId: "",
  billingCycle: "Monthly",
  taxes: [],
  discount: "0",
  isFixed: false,
  expiryDate: moment().format("YYYY-MM-DD"),
  propasalText: "",
  customerNote: "",
  customer: "",
};
const taxInitials = { title: "", amount: "" };
const quoteCycles = ["Monthly", "Yearly", "OneTime"];
const qStatuses = ["Accepted", "Declined"];
export const QuoteRegistration = ({ action = "add", currentItem = null }) => {
  const classes = useStyles();
  const [values, setValues] = useState(initialState);
  const [tax, setTax] = useState(taxInitials);
  const [propTextState, setPropTextState] = useState(EditorState.createEmpty());
  const [noteState, setNoteState] = useState(EditorState.createEmpty());
  const quoteState = useSelector((state) => state);

  const {
    quoteAdd: { loading: adding, loaded: added },
    quoteEdit: { loading: updating, loaded: updated },
    projectsGet: { projects },
    userList: { users },
    login: {
      userInfo: { user },
    },
  } = quoteState;

  useEffect(() => {
    getUsersList("Client");
  }, []);
  useEffect(() => {
    if (values.customer) {
      getProjects({ clientId: values.customer });
    }
  }, [values.customer]);
  useEffect(() => {
    if (added || updated) {
      setValues(initialState);
      setPropTextState(EditorState.createEmpty());
      setNoteState(EditorState.createEmpty());
    }
  }, [added, updated]);
  useEffect(() => {
    if (currentItem) {
      const { project, user, updatedAt, createdAt, _id, __v, ...rest } =
        currentItem;
      const projectId = project._id;
      const customer = user._id;
      const expiryDate = moment(currentItem.expiryDate).format("YYYY-MM-DD");
      setValues({ ...rest, projectId, expiryDate, customer });
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
    setValues((prev) => {
      const newValues = { ...prev, [name]: value };
      if (name === "customer") {
        newValues.projectId = "";
      }
      return newValues;
    });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    values.propasalText = toHtml(propTextState);
    values.customerNote = toHtml(noteState);
    const { amount, customer, ...quoteValues } = values;
    if (action !== "add" && currentItem) {
      updateQuote(quoteValues, currentItem._id);
    } else {
      addNewQuote(quoteValues);
    }
  };
  const onSetSeen = (e) => {
    const {
      target: { checked },
    } = e;
    setValues({ ...values, status: checked ? "Pending" : "Draft" });
  };
  const onAddTax = () => {
    const taxes = [...values.taxes];
    const index = taxes.findIndex((i) => i.title === tax.title);
    if (index < 0) {
      taxes.push(tax);
    } else {
      taxes[index].title = tax.title;
      taxes[index].amount = tax.amount;
    }
    setValues((prev) => ({ ...prev, taxes }));
    setTax(taxInitials);
  };
  const onDeleteTax = (taxTitle) => {
    const newTaxes = values.taxes.filter((t) => t.title !== taxTitle);
    setValues((prev) => ({ ...prev, taxes: newTaxes }));
  };
  const onChangeTax = ({ target: { name, value } }) => {
    setTax((prev) => ({ ...prev, [name]: value }));
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
                <>
                  <Grid item xs={12}>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel id="customer-or-comp">
                        Customer or company
                      </InputLabel>
                      <Select
                        labelId="customer-or-comp"
                        value={values.customer}
                        name="customer"
                        onChange={onHandleChange}
                        disabled={user.role === "Client"}
                      >
                        <MenuItem value="">---</MenuItem>
                        {users.map((user, userIdx) => (
                          <MenuItem value={user._id} key={userIdx}>
                            {user.fullName}, {user.companyName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel id="select-project">
                        Select project
                      </InputLabel>
                      <Select
                        labelId="select-project"
                        value={values.projectId}
                        name="projectId"
                        onChange={onHandleChange}
                        disabled={!Boolean(values.customer)}
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
                </>
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
                  <Grid item xs={12}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        label="Expiry Date"
                        inputVariant="outlined"
                        fullWidth
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
                  <Grid item xs={12} sm={12} md={8} lg={8}>
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
                  <Grid item xs={12} sm={12} md={4} lg={4}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={values.isFixed}
                          onChange={({ target: { checked } }) =>
                            setValues({ ...values, isFixed: checked })
                          }
                        />
                      }
                      label="Is fixed?"
                      labelPlacement="top"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={5} lg={5}>
                    <TextField
                      name="title"
                      variant="outlined"
                      fullWidth
                      label="Tax title"
                      size="small"
                      onChange={onChangeTax}
                      value={tax.title}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={5} lg={5}>
                    <TextField
                      name="amount"
                      variant="outlined"
                      type="number"
                      fullWidth
                      label="Tax(in %)"
                      size="small"
                      onChange={onChangeTax}
                      value={tax.amount}
                      disabled={!Boolean(tax.title)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={2} lg={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={!Boolean(tax.amount)}
                      onClick={() => onAddTax()}
                    >
                      Add
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <ul>
                      {values.taxes.map((t, tIndex) => (
                        <li key={tIndex}>
                          <strong>{t.title}: </strong>
                          {`${t.amount}%`}
                          <IconButton size="small" onClick={() => setTax(t)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => onDeleteTax(t.title)}
                          >
                            <CancelIcon />
                          </IconButton>
                        </li>
                      ))}
                    </ul>
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
              {action === "edit" && currentItem.items?.length > 0 && (
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={values.status !== "Draft"}
                        onChange={onSetSeen}
                      />
                    }
                    disabled={
                      values.status !== "Draft" && values.status !== "Pending"
                    }
                    label="Send proposal"
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
                  Update the proposal
                </Button>
              )}
            </CardActions>
          </form>
        )}
      </div>
    </Card>
  );
};
