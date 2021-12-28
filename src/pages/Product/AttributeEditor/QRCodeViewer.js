import React from "react";
import { Card, CardContent, CardHeader, Collapse } from "@material-ui/core";
import { useEffect } from "react";
import { generateQR } from "redux/actions/product";
import { useSelector } from "react-redux";
import Loading from "components/loading.component";

export const QRCodeViewer = ({ attName, productId }) => {
  const {
    qrGenerate: { loading, loaded, qr },
  } = useSelector((state) => state);
  useEffect(() => {
    if (productId) {
      generateQR(productId);
    }
  }, [productId]);

  return (
    <Collapse in={attName === "qr-code"}>
      <Card>
        <CardHeader title="QR Code Viewer" />
        <CardContent>
          {loading && <Loading />}
          {loaded && (
            // <h1>Image loaded</h1>
            <img src={qr} alt="QR code" loading="lazy" />
          )}
        </CardContent>
      </Card>
    </Collapse>
  );
};
