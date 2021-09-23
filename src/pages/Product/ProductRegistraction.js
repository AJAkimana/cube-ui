import React, { useState } from "react";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { DropzoneDialog } from "material-ui-dropzone";
import NumberFormat from "react-number-format";
import { ComputerOutlined } from "@material-ui/icons";
import { useStyles } from "styles/formStyles";
import { initialState, productStatuses } from "./productConstants";
import { notifier } from "utils/notifier";
import {
  addNewProduct,
  editProduct,
  getProducts,
  uploadProductImages,
} from "redux/actions/product";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getUsersList } from "redux/actions/user";

export const ProductRegistration = ({ action = "add", currentItem = null }) => {
  const classes = useStyles();
  const [values, setValues] = useState(initialState);
  const [openDz, setOpenDz] = useState(false);
  const appState = useSelector((state) => state);
  const {
    fileUpload: { loaded: uploaded, loading: uploading, filePath },
    productAdd: { loading: adding, loaded: added },
    productEdit: { loading: editing, loaded: edited },
    userList: { users },
  } = appState;
  useEffect(() => {
    getUsersList("Client");
  }, []);
  const onHandleChange = (e) => {
    e.preventDefault();
    const {
      target: { name, value },
    } = e;
    setValues({ ...values, [name]: value });
  };
  useEffect(() => {
    if (uploaded && filePath) {
      setValues({ ...values, image: filePath });
      setOpenDz(false);
      notifier.success("Images uploaded");
    }
    // eslint-disable-next-line
  }, [uploaded, filePath]);
  useEffect(() => {
    if (added || edited) {
      setValues(initialState);
      getProducts();
    }
  }, [added, edited]);
  useEffect(() => {
    if (currentItem && action === "edit") {
      const { createdAt, updatedAt, image, itemNumber, ...rest } = currentItem;
      setValues(rest);
    }
  }, [action, currentItem]);
  const submitHandler = (e) => {
    e.preventDefault();
    if (action === "add") {
      addNewProduct(values);
    }
    if (action === "edit") {
      editProduct(values);
    }
  };
  const onUploadImages = (files) => {
    if (files.length !== 2) {
      notifier.error("Sorry only two files are needed");
      return;
    }

    uploadProductImages(files);
  };
  return (
    <Card component="main" className={classes.root}>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <ComputerOutlined />
        </Avatar>
        <Typography component="h1" variant="h4">
          {action === "edit"
            ? `Update ${currentItem?.name.toUpperCase()}`
            : "Add a new 3D asset"}
        </Typography>
        <form className={classes.form} onSubmit={submitHandler}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                className={classes.input}
                name="name"
                variant="outlined"
                fullWidth
                label="3D Asset name"
                onChange={onHandleChange}
                value={values.name}
              />
            </Grid>
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
            <Grid item lg={6} md={6} sm={6} xs={12}>
              <TextField
                className={classes.input}
                name="sku"
                variant="outlined"
                fullWidth
                label="SKU"
                onChange={onHandleChange}
                value={values.sku}
              />
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={12}>
              <NumberFormat
                className={classes.input}
                value={values.price}
                onValueChange={({ floatValue }) =>
                  setValues({ ...values, price: floatValue })
                }
                prefix="$"
                thousandSeparator
                customInput={TextField}
                fullWidth
                variant="outlined"
                label="Price(in USD)"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="product-status">Status</InputLabel>
                <Select
                  labelId="product-status"
                  value={values.status}
                  name="status"
                  onChange={onHandleChange}
                >
                  <MenuItem value="">---</MenuItem>
                  {productStatuses.map((status, choiceIdx) => (
                    <MenuItem value={status} key={choiceIdx}>
                      {status}
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
                name="description"
                label="Description"
                rows={3}
                rowsMax={4}
                value={values.description}
                onChange={onHandleChange}
              />
            </Grid>
            {action === "add" && (
              <Grid item xs={12}>
                <Button onClick={() => setOpenDz(true)}>
                  Add the 3D asset files
                </Button>
                <DropzoneDialog
                  open={openDz}
                  onSave={onUploadImages}
                  acceptedFiles={[".glb", ".usdz"]}
                  showPreviews={true}
                  maxFileSize={50000000}
                  filesLimit={2}
                  onClose={() => setOpenDz(false)}
                  clearOnUnmount={uploaded}
                  submitButtonText={
                    uploading
                      ? "Uploading files, please wait,..."
                      : "Save files"
                  }
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
                disabled={editing}
              >
                Update the asset
              </Button>
            )}
          </CardActions>
        </form>
      </div>
    </Card>
  );
};
