import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { IMAGES_PATH } from "utils/constants";

const scales = ["auto", "fixed"];
const placements = ["floor", "wall"];
export const AREditor = ({ attName, attributes = {}, onInputChange }) => {
  return (
    <Collapse in={attName === "ar"}>
      <Card>
        <CardHeader title="AR Editor" />
        <CardContent>
          <FormControl fullWidth>
            <InputLabel shrink id="select-scale">
              AR scale
            </InputLabel>
            <Select
              labelId="select-scale"
              name="scale"
              value={attributes.scale}
              onChange={onInputChange}
            >
              {scales.map((scale, scaleIdx) => (
                <MenuItem value={scale} key={scaleIdx}>
                  {scale.toUpperCase()}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel shrink id="select-placement">
              AR placement
            </InputLabel>
            <Select
              labelId="select-placement"
              name="placement"
              value={attributes.placement}
              onChange={onInputChange}
            >
              {placements.map((pl, plIdx) => (
                <MenuItem value={pl} key={plIdx}>
                  {pl.toUpperCase()}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {attributes.imageFiles.filter((img) => img.imageType === "custom")
            .length > 0 && (
            <FormControl fullWidth>
              <InputLabel shrink id="select-ar-button-image">
                Images
              </InputLabel>
              <Select
                labelId="select-ar-button-image"
                name="arButtonImage"
                value={attributes.arButtonImage}
                onChange={onInputChange}
              >
                <MenuItem value="">Empty</MenuItem>
                {attributes.imageFiles
                  .filter((img) => img.imageType === "custom")
                  .map((img, imgIdx) => (
                    <MenuItem value={img.imageFileName} key={imgIdx}>
                      {img.imageFileName}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          )}
          {Boolean(attributes.arButtonImage) && (
            <CardMedia
              image={IMAGES_PATH + attributes.arButtonImage}
              component="img"
              height="140"
            />
          )}
        </CardContent>
      </Card>
    </Collapse>
  );
};
