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
import { addNewQuote, updateQuote } from "redux/actions/quote";
import { Loading } from "components/loading.component";
import { useStyles } from "styles/formStyles";
import { getProjects } from "redux/actions/project";

const initialState = {
  projectId: "",
  billingCycle: "Monthly",
  amount: "",
};
const quoteCycles = ["Monthly", "Yearly"];
export const QuoteRegistration = ({ action = "add", currentItem = null }) => {
  const classes = useStyles();
  const [values, setValues] = useState(initialState);
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
    }
  }, [added, updated]);
  useEffect(() => {
    getProjects({ status: "approved" });
  }, []);
  useEffect(() => {
    if (currentItem) {
      const { project, billingCycle, amount } = currentItem;
      setValues({ projectId: project._id, billingCycle, amount });
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
      updateQuote(values, currentItem._id);
    } else {
      addNewQuote(values);
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
            ? `Update "${currentItem.project.name.toUpperCase()}" quote`
            : "Add a new quote"}
        </Typography>
        {(adding || updating) && <Loading />}
        {(currentItem || (action === "add" && user.role === "Manager")) && (
          <form className={classes.form} onSubmit={submitHandler}>
            <Grid container spacing={2}>
              {action === "add" ? (
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
                      {projects.map(({ _id, name }, choiceIdx) => (
                        <MenuItem value={_id} key={choiceIdx}>
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              ) : null}
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
              <Grid item xs={12}>
                <TextField
                  className={classes.input}
                  variant="outlined"
                  fullWidth
                  name="amount"
                  label="Amount"
                  type="number"
                  value={values.amount}
                  onChange={onHandleChange}
                  disabled={action === "change"}
                />
              </Grid>
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
                      {["approved", "declined"].map((status, choiceIdx) => (
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
