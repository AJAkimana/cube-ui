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
import ColorPicker from "material-ui-color-picker";
import { DropzoneDialog } from "material-ui-dropzone";
import NumberFormat from "react-number-format";
import { ComputerOutlined } from "@material-ui/icons";
import { useStyles } from "styles/formStyles";
import { initialState, productStatuses } from "./productConstants";
import { notifier } from "utils/notifier";
import {
  addNewProduct,
  getProducts,
  uploadProductImages,
} from "redux/actions/product";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export const ProductRegistration = () => {
  const classes = useStyles();
  const [values, setValues] = useState(initialState);
  const [openDz, setOpenDz] = useState(false);
  const appState = useSelector((state) => state);
  const {
    fileUpload: { loaded: uploaded, filePath },
    productAdd: { loading: adding, loaded: added },
  } = appState;
  const onHandleChange = (e) => {
    e.preventDefault();
    const {
      target: { name, value },
    } = e;
    setValues({ ...values, [name]: value });
  };
  useEffect(() => {
    if (uploaded) {
      setValues({ ...values, image: filePath });
    }
    // eslint-disable-next-line
  }, [uploaded, filePath]);
  useEffect(() => {
    if (added) {
      setValues(initialState);
      getProducts();
    }
  }, [added]);
  const submitHandler = (e) => {
    e.preventDefault();
    addNewProduct(values);
  };
  const onUploadImages = (files) => {
    if (files.length !== 2) {
      notifier.error("Sorry only two files are needed");
      return;
    }
    const formData = new FormData();
    for (const key of Object.keys(files)) {
      formData.append("productFiles", files[key]);
    }
    uploadProductImages(formData);
  };
  return (
    <Card component="main" className={classes.root}>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <ComputerOutlined />
        </Avatar>
        <Typography component="h1" variant="h4">
          Add a new product
        </Typography>
        <form className={classes.form} onSubmit={submitHandler}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                className={classes.input}
                name="name"
                variant="outlined"
                fullWidth
                label="Product name"
                onChange={onHandleChange}
                value={values.name}
              />
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={12}>
              <TextField
                className={classes.input}
                name="sku"
                variant="outlined"
                fullWidth
                label="Product SKU"
                onChange={onHandleChange}
                value={values.sku}
              />
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={12}>
              <ColorPicker
                defaultValue="Color"
                name="bgColor"
                floatingLabelText="Background color"
                onChange={(color) => setValues({ ...values, bgColor: color })}
                value={values.bgColor}
              />
            </Grid>
            <Grid item xs={12}>
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
                name="customer"
                label="Customer or company"
                value={values.customer}
                onChange={onHandleChange}
              />
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
            <Grid item xs={12}>
              <Button onClick={() => setOpenDz(true)}>
                Add Product Images
              </Button>
              <DropzoneDialog
                open={openDz}
                onSave={onUploadImages}
                acceptedFiles={[".glb", ".usdz"]}
                showPreviews={true}
                maxFileSize={5000000}
                filesLimit={2}
                onClose={() => setOpenDz(false)}
                clearOnUnmount={uploaded}
              />
            </Grid>
          </Grid>
          <CardActions>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
              disabled={adding}
            >
              Save
            </Button>
          </CardActions>
        </form>
      </div>
    </Card>
  );
};
