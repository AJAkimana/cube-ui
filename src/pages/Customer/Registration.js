import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Avatar,
  Button,
  CssBaseline,
  Grid,
  Typography,
  Container,
  Stepper,
  Step,
  StepButton,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import LoadingBox from "components/loading.component";
import { getUsersList, registerUser } from "redux/actions/user";
import { useStyles } from "./styles";
import {
  CustomerInfo,
  ContactInfo,
  LocationInfo,
  RoleInfo,
} from "./RegistrationSteps";

const initialState = {
  firstName: "",
  lastName: "",
  companyName: "",
  companyUrl: "",
  email: "",
  phoneNumber: "",
  address: "",
  country: "",
  state: "",
  city: "",
  role: "client",
};
const steps = ["User information", "Contact", "Location", "Permission"];

export const Registration = () => {
  const classes = useStyles();
  const [userInfo, setUserInfo] = useState(initialState);
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState(new Set());
  const [skipped, setSkipped] = React.useState(new Set());

  const userRegister = useSelector((state) => state.register);
  const { loading: registering, loaded: registered } = userRegister;

  useEffect(() => {
    if (registered) {
      getUsersList();
      setUserInfo(initialState);
    }
  }, [registered]);
  const onHandleChange = (e) => {
    e.preventDefault();
    const {
      target: { name, value },
    } = e;
    setUserInfo({ ...userInfo, [name]: value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    registerUser(userInfo);
  };
  const onPhoneChange = (value, country) => {
    setUserInfo({ ...userInfo, phoneNumber: value, country: country.name });
  };
  const totalSteps = () => steps.length;

  const isStepOptional = (step) => step === 1;

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const skippedSteps = () => {
    return skipped.size;
  };

  const completedSteps = () => {
    return completed.size;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps() - skippedSteps();
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !completed.has(i))
        : activeStep + 1;

    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = new Set(completed);
    newCompleted.add(activeStep);
    setCompleted(newCompleted);
    if (completed.size !== totalSteps() - skippedSteps()) {
      handleNext();
    }
  };

  const isStepSkipped = (step) => skipped.has(step);

  const isStepComplete = (step) => completed.has(step);
  const getStepContent = (step) => {
    const stepsContent = [
      {
        label: "Step 1: Fill customer information",
        component: <CustomerInfo />,
      },
      { label: "Step 2: Customer contacts", component: <ContactInfo /> },
      { label: "Step 3: Location", component: <LocationInfo /> },
      { label: "Step 4: Customer role", component: <RoleInfo /> },
    ];
    return stepsContent[step];
  };
  return (
    <Container component="main">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h4">
          REGISTER USER
        </Typography>
        <Stepper alternativeLabel nonLinear activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={index} {...stepProps}>
                <StepButton
                  onClick={handleStep(index)}
                  completed={isStepComplete(index)}
                >
                  {label}
                </StepButton>
              </Step>
            );
          })}
        </Stepper>
        {registering && <LoadingBox></LoadingBox>}
        <form className={classes.form} onSubmit={submitHandler}>
          <div>
            <Grid className={classes.instructions}>
              {getStepContent(activeStep).component}
            </Grid>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                Next
              </Button>
              {isStepOptional(activeStep) && !completed.has(activeStep) && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSkip}
                  className={classes.button}
                >
                  Skip
                </Button>
              )}

              {activeStep !== steps.length &&
                (completed.has(activeStep) ? (
                  <Typography variant="caption" className={classes.completed}>
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleComplete}
                  >
                    {completedSteps() === totalSteps() - 1
                      ? "Finish"
                      : "Complete Step"}
                  </Button>
                ))}
            </div>
          </div>
          {/* <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
            disabled={registering}
          >
            SUBMIT
          </Button> */}
        </form>
      </div>
    </Container>
  );
};
