import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  Collapse,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Typography,
} from "@material-ui/core";
import { IMAGES_PATH } from "utils/constants";

export const Lighting = ({
  attName,
  attributes,
  onSliderChange,
  onLightningCheck,
  onLighteningSelect,
}) => {
  return (
    <Collapse in={attName === "lighting"}>
      <Card>
        <CardHeader title="Image lighting" />
        <CardContent>
          <Typography variant="h4" id="exposure" gutterBottom>
            Exposure
          </Typography>
          <Slider
            aria-labelledby="exposure"
            min={0}
            step={0.01}
            max={2}
            valueLabelDisplay="on"
            name="exposure"
            value={attributes.exposure}
            onChange={(e, value) => onSliderChange("exposure", value)}
          />
          <Typography variant="h4" id="shadow-intensity" gutterBottom>
            Shadow intensity
          </Typography>
          <Slider
            aria-labelledby="shadow-intensity"
            min={0}
            step={0.1}
            max={1}
            valueLabelDisplay="on"
            name="shadowIntensity"
            value={attributes.shadowIntensity}
            onChange={(e, value) => onSliderChange("shadowIntensity", value)}
          />
          <Typography variant="h4" id="shadow-softness" gutterBottom>
            Shadow softness
          </Typography>
          <Slider
            aria-labelledby="shadow-softness"
            min={0}
            step={0.1}
            max={1}
            valueLabelDisplay="on"
            name="shadowSoftness"
            value={attributes.shadowSoftness}
            onChange={(e, value) => onSliderChange("shadowSoftness", value)}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={attributes.skyboxImage?.active}
                onChange={({ target }) =>
                  onLightningCheck(target, "skyboxImage")
                }
              />
            }
            label="Skybox image"
          />
          {attributes.skyboxImage?.active && (
            <FormControl fullWidth>
              <InputLabel shrink id="select-skybox-image">
                Images
              </InputLabel>
              <Select
                labelId="select-skybox-image"
                name="skyboxImage"
                value={attributes.skyboxImage?.image}
                onChange={({ target }) =>
                  onLighteningSelect(target, "skyboxImage")
                }
              >
                {attributes.imageFiles.map((img, imgIdx) => (
                  <MenuItem value={img.imageFileName} key={imgIdx}>
                    {img.imageFileName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          {Boolean(attributes.skyboxImage?.image) && (
            <CardMedia
              image={IMAGES_PATH + attributes.skyboxImage?.image}
              component="img"
              height="140"
            />
          )}
          <FormControlLabel
            control={
              <Checkbox
                checked={attributes.environmentImage?.active}
                onChange={({ target }) =>
                  onLightningCheck(target, "environmentImage")
                }
              />
            }
            label="Environment image"
          />
          {attributes.environmentImage?.active && (
            <FormControl fullWidth>
              <InputLabel shrink id="select-environment-image">
                Images
              </InputLabel>
              <Select
                labelId="select-environment-image"
                name="environmentImage"
                value={attributes.environmentImage?.image}
                onChange={({ target }) =>
                  onLighteningSelect(target, "environmentImage")
                }
              >
                {attributes.imageFiles.map((img, imgIdx) => (
                  <MenuItem value={img.imageFileName} key={imgIdx}>
                    {img.imageFileName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          {Boolean(attributes.environmentImage?.image) && (
            <CardMedia
              image={IMAGES_PATH + attributes.environmentImage?.image}
              component="img"
              height="140"
            />
          )}
        </CardContent>
      </Card>
    </Collapse>
  );
};
