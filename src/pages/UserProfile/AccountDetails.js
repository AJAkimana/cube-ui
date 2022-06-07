import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
} from "@material-ui/core";
import PhoneInput from "material-ui-phone-number";
import { ConfirmUpdate } from "./ConfirmUpdate";
import { updateProfile } from "redux/actions/user";

const useStyles = makeStyles(() => ({
  root: {},
}));

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
  password: "",
  postalCode: "",
  role: "client",
};
export const AccountDetails = ({ user, loading = false }) => {
  const [userInfo, setUserInfo] = useState(initialState);
  const [openConfirm, setOpenConfirm] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    if (user.role) {
      setUserInfo(user);
    }
  }, [user]);

  const handleChange = ({ target: { name, value } }) => {
    setUserInfo({ ...userInfo, [name]: value });
  };
  const onPhoneChange = (value, country) => {
    setUserInfo({ ...userInfo, phoneNumber: value, country: country.name });
  };

  return (
    <Card className={classes.root}>
      <form autoComplete="off" noValidate>
        <ConfirmUpdate
          open={openConfirm}
          setOpen={() => setOpenConfirm(false)}
          userInfo={userInfo}
          onChange={handleChange}
          onConfirm={() => {
            updateProfile(userInfo);
            setOpenConfirm(false);
          }}
        />
        <CardHeader subheader="The information can be edited" title="Profile" />
        {/* <Typography variant="h6" color="error" align="right">
          You will be logged out after successful update profile
        </Typography> */}
        <Divider />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="First name"
                margin="dense"
                name="firstName"
                onChange={handleChange}
                required
                value={userInfo.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Last name"
                margin="dense"
                name="lastName"
                onChange={handleChange}
                required
                value={userInfo.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Company name"
                margin="dense"
                name="companyName"
                onChange={handleChange}
                required
                value={userInfo.companyName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Company URL"
                margin="dense"
                name="companyUrl"
                onChange={handleChange}
                required
                value={userInfo.companyUrl}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                margin="dense"
                name="email"
                onChange={handleChange}
                disabled
                value={userInfo.email}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <PhoneInput
                variant="outlined"
                fullWidth
                autoComplete="phone number"
                label="Phone Number"
                defaultCountry="rw"
                margin="dense"
                countryCodeEditable={false}
                value={userInfo.phoneNumber}
                onChange={onPhoneChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="address"
                label="Your Address"
                margin="dense"
                autoComplete="address"
                value={userInfo.address}
                onChange={handleChange}
              />
            </Grid>
            <Grid item md={3} xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="City"
                name="city"
                margin="dense"
                autoComplete="city"
                value={userInfo.city}
                onChange={handleChange}
              />
            </Grid>
            <Grid item md={3} xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="State"
                name="state"
                margin="dense"
                autoComplete="state"
                value={userInfo.state}
                onChange={handleChange}
              />
            </Grid>
            <Grid item md={3} xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Postal code"
                name="postalCode"
                margin="dense"
                value={userInfo.postalCode}
                onChange={handleChange}
              />
            </Grid>
            <Grid item md={3} xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="country"
                margin="dense"
                autoComplete="country"
                value={userInfo.country}
                disabled
                onChange={handleChange}
                onClick={() => updateProfile(userInfo)}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            disabled={loading}
            onClick={() => updateProfile(userInfo)}
          >
            {loading ? "Updating" : "Save information"}
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};
