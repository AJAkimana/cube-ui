import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
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
