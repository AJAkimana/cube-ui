import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  FormControl,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  Select,
} from "@material-ui/core";
import { Delete as DeleteIcon } from "@material-ui/icons";
import { DropzoneDialog } from "material-ui-dropzone";
import { useSelector } from "react-redux";
import { resetUploadAttrImg, uploadAttrImage } from "redux/actions/product";

const imageTypes = [
  { id: "skybox", name: "Skybox & environment" },
  { id: "custom", name: "Custom AR" },
];
export const ManageImages = ({
  attName,
  attributes = {},
  setAttributes,
  productId,
}) => {
  const [imgType, setImgType] = useState(imageTypes[0].id);
  const [open, setOpen] = useState(false);

  const {
    attrImg: { loading, loaded, fileName },
  } = useSelector((state) => state);

  useEffect(() => {
    if (loaded) {
      const newAttribs = { ...attributes };
      newAttribs.imageFiles?.push({ [imgType]: fileName });
      setAttributes(newAttribs);
      setOpen(false);
      resetUploadAttrImg();
    }
    // eslint-disable-next-line
  }, [loaded, fileName]);
  const onSelectChange = ({ target }) => {
    setImgType(target.value);
  };
  const onUploadImage = (files) => {
    let formData = new FormData();
    formData.append("image", files[0]);
    uploadAttrImage(formData, imgType, productId);
  };
  return (
    <Collapse in={attName === "manage_images"}>
      <Card>
        <CardHeader title="Manage images" />
        <CardContent>
          <FormControl fullWidth>
            <InputLabel shrink id="select-image-type">
              Image type
            </InputLabel>
            <Select
              labelId="select-image-type"
              name="imageType"
              value={imgType}
              onChange={onSelectChange}
            >
              {imageTypes.map((type, typeIdx) => (
                <MenuItem value={type.id} key={typeIdx}>
                  {type.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            onClick={() => setOpen(true)}
          >{`Upload ${imgType} image`}</Button>
          <DropzoneDialog
            acceptedFiles={["image/*"]}
            cancelButtonText={"cancel"}
            submitButtonText={loading ? "Uploading,..." : "Submit"}
            maxFileSize={5000000}
            clearOnUnmount={loaded}
            open={open}
            onClose={() => setOpen(false)}
            onSave={onUploadImage}
            dialogTitle={`Upload ${imgType.toUpperCase()} image`}
          />
          <List dense>
            {attributes?.imageFiles
              ?.filter((img) => img.imageType === imgType)
              .map(() => (
                <ListItem>
                  <ListItemText primary="Single-line item" />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
          </List>
        </CardContent>
      </Card>
    </Collapse>
  );
};
