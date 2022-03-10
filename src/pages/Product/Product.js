import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { CustomisedTable } from "components/CustomizedTable";
import { ProductRegistration } from "./ProductRegistraction";
import { useSelector } from "react-redux";
import { initialPaginate, paginate } from "utils/paginate";
import { productColumns } from "components/columns/productColumns";
import { deleteProduct, getProducts } from "redux/actions/product";
import { ImagePreview } from "./ImagePreview";
import { AlertConfirm } from "components/AlertConfirm";
import { notifier } from "utils/notifier";

export const ProductPage = () => {
  const [paginator, setPaginator] = useState(initialPaginate());
  const [paginatedData, setPaginatedData] = useState([]);
  const [openImgView, setOpenImgView] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [action, setAction] = useState("add");
  const [confirmDel, setConfirmDel] = useState(false);

  const appState = useSelector((state) => state);
  const {
    productsGet: { loading: fetching, products, loaded },
    productRm: { loading: deleting, loaded: deleted, message },
    login: {
      userInfo: { user },
    },
  } = appState;

  useEffect(() => {
    if (loaded) {
      const { pageNumber, pageSize } = paginator;
      const paginatedData = paginate(products, pageNumber, pageSize);
      setPaginatedData(paginatedData);
    }
  }, [products, paginator, loaded]);
  useEffect(() => {
    getProducts({});
  }, []);
  useEffect(() => {
    if (deleted) {
      notifier.success(message);
      setConfirmDel(false);
      getProducts({});
    }
  }, [deleted, message]);
  const onPageChange = ({ selected }) => {
    setPaginator({ ...paginator, pageNumber: selected + 1 });
  };
  const onProductClick = (product = {}, action) => {
    setCurrentItem(product);
    if (action === "preview") {
      setOpenImgView(true);
      return;
    }
    if (action === "delete") {
      setConfirmDel(true);
      return;
    }
    setAction(action);
  };
  return (
    <Grid container spacing={2} sx={{ py: 3 }}>
      <AlertConfirm
        loading={deleting}
        message={
          currentItem && `Are you sure you want to delete ${currentItem.name}`
        }
        onConfirmYes={() => deleteProduct(currentItem?._id)}
        open={confirmDel}
        setOpen={() => setConfirmDel(false)}
      />
      <ImagePreview
        open={openImgView}
        setOpen={() => setOpenImgView(false)}
        productId={currentItem?._id}
      />
      <Grid item xs={12} sm={4} md={4} lg={4}>
        <ProductRegistration
          action={action}
          currentItem={currentItem}
          setAction={setAction}
        />
      </Grid>
      <Grid item xs={12} sm={8} md={8} lg={8}>
        <CustomisedTable
          tableTitle="List of 3D assets"
          columns={productColumns(onProductClick, user)}
          loading={fetching}
          data={paginatedData}
          withPagination
          dataCount={products.length}
          pageCount={Math.ceil(products.length / paginator.pageSize)}
          handlePageChange={onPageChange}
          page={paginator.pageNumber}
        />
      </Grid>
    </Grid>
  );
};
