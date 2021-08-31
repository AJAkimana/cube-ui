import React from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Collapse,
} from "@material-ui/core";

export const Poster = ({ attName }) => {
  const imageViewer = document.querySelector("model-viewer#image3d-viewer");
  const onDownloadPoster = async () => {
    let posterUrl = "";
    imageViewer.fieldOfView = "auto";
    imageViewer.jumpCameraToGoal();
    await new Promise((resolve) => requestAnimationFrame(() => resolve()));
    const blob = await imageViewer.toBlob({
      mimeType: "image/png",
      idealAspect: true,
    });
    posterUrl = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = posterUrl;
    a.download = "poster.png";
    a.click();
  };
  return (
    <Collapse in={attName === "poster"}>
      <Card>
        <CardHeader title="Poster" />
        <CardContent>
          <Button color="primary" onClick={onDownloadPoster}>
            Download poster
          </Button>
        </CardContent>
      </Card>
    </Collapse>
  );
};
