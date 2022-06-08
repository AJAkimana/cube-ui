import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";
import { AccountProfile } from "./AccountProfile";
import { AccountDetails } from "./AccountDetails";
import { useSelector } from "react-redux";
import { USER_INFO } from "utils/constants";
import { notifier } from "utils/notifier";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
}));

export const UserProfile = () => {
  const classes = useStyles();
  const {
    login: { userInfo },
    profileEdit: { loading, loaded, userInfo: updatedInfo },
    profileImgAdd: { loaded: profileUpdated, fileName },
    profileImgRm: { loaded: rmLoaded },
  } = useSelector((state) => state);

  useEffect(() => {
    if (loaded || profileUpdated || rmLoaded) {
      notifier.success("Your account has been successfully updated.");
      if (updatedInfo) {
        localStorage.setItem(USER_INFO, JSON.stringify(updatedInfo));
      }
      if (profileUpdated || rmLoaded) {
        const currentInfo = { ...userInfo };
        currentInfo.user.profileImage = fileName || "";
        localStorage.setItem(USER_INFO, JSON.stringify(currentInfo));
      }
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, profileUpdated, rmLoaded, updatedInfo]);
  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item lg={4} md={6} xl={4} xs={12}>
          <AccountProfile user={userInfo.user} />
        </Grid>
        <Grid item lg={8} md={6} xl={8} xs={12}>
          <AccountDetails user={userInfo.user} loading={loading} />
        </Grid>
      </Grid>
    </div>
  );
};
