import React, { useState } from "react";
import moment from "moment";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Typography,
  Divider,
  Button,
  LinearProgress,
} from "@material-ui/core";
import { DropzoneDialog } from "material-ui-dropzone";
import { uploadProductImages } from "redux/actions/product";
import { useSelector } from "react-redux";
import { PROFILES_PATH } from "utils/constants";

const useStyles = makeStyles((theme) => ({
  root: {},
  details: {
    display: "flex",
  },
  avatar: {
    marginLeft: "auto",
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0,
  },
  progress: {
    marginTop: theme.spacing(2),
  },
  uploadButton: {
    marginRight: theme.spacing(2),
  },
}));

export const AccountProfile = ({ user }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const {
    profileImgAdd: { loading, loaded },
  } = useSelector((state) => state);

  return (
    <Card className={classes.root}>
      <CardContent>
        <div className={classes.details}>
          <div>
            <Typography gutterBottom variant="h2">
              {user.firstName} {user.lastName}
            </Typography>
            <Typography
              className={classes.locationText}
              color="textSecondary"
              variant="body1"
            >
              {user.city}, {user.country}
            </Typography>
            <Typography
              className={classes.dateText}
              color="textSecondary"
              variant="body1"
            >
              {moment().format("hh:mm A")} (
              {Intl.DateTimeFormat().resolvedOptions().timeZone})
            </Typography>
          </div>
          <Avatar
            className={classes.avatar}
            src={`${PROFILES_PATH}/${user.profileImage}`}
          />
        </div>
        <div className={classes.progress}>
          <Typography variant="body1">My profile</Typography>
          <LinearProgress value={100} variant="determinate" />
        </div>
        <DropzoneDialog
          acceptedFiles={["image/*"]}
          cancelButtonText={"cancel"}
          submitButtonText={loading ? "Uploading,..." : "Submit"}
          maxFileSize={5000000}
          clearOnUnmount={loaded}
          open={open}
          onClose={() => setOpen(false)}
          onSave={(files) =>
            uploadProductImages(files, "profile-img", { userId: user._id })
          }
          dialogTitle={`Upload profile image`}
        />
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          className={classes.uploadButton}
          color="primary"
          variant="text"
          onClick={() => setOpen(true)}
        >
          Upload picture
        </Button>
        <Button variant="text">Remove picture</Button>
      </CardActions>
    </Card>
  );
};
