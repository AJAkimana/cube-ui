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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import LoadingBox from "../loading.component";
import { getUsersList, registerUser } from "../../redux/actions/user";

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
  fullName: "",
  email: "",
  phoneNumber: "",
  role: "Client",
  companyName: "",
  address: "",
};
const userRoles = ["Client", "Manager"];
export default function Registration(props) {
  const classes = useStyles();
  const [userInfo, setUserInfo] = useState(initialState);

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
        {registering && <LoadingBox></LoadingBox>}
        <form className={classes.form} onSubmit={submitHandler}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                className={classes.input}
                autoComplete="fname"
                name="fullName"
                variant="outlined"
                fullWidth
                id="fullName"
                label="Full Name"
                onChange={onHandleChange}
                value={userInfo.fullName}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={userInfo.email}
                onChange={onHandleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="phoneNumber"
                label="Phone Number"
                type="phoneNumber"
                id="phoneNumber"
                autoComplete="phone number"
                value={userInfo.phoneNumber}
                onChange={onHandleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="user-role">Role</InputLabel>
                <Select
                  labelId="user-role"
                  value={userInfo.role}
                  name="role"
                  onChange={onHandleChange}
                >
                  <MenuItem value="">---</MenuItem>
                  {userRoles.map((role, roleIdx) => (
                    <MenuItem value={role} key={roleIdx}>
                      {role.toUpperCase()}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="companyName"
                label="Company Name"
                type="companyName"
                id="companyName"
                autoComplete="Company Name"
                value={userInfo.companyName}
                onChange={onHandleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="address"
                label="Your Address"
                type="address"
                id="address"
                autoComplete="address"
                value={userInfo.address}
                onChange={onHandleChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
            disabled={registering}
          >
            SUBMIT
          </Button>
        </form>
      </div>
    </Container>
  );
}
