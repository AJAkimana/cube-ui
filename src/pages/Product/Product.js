import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { CustomisedTable } from "components/CustomizedTable";
import { ProductRegistration } from "./ProductRegistraction";
import { useSelector } from "react-redux";
import { initialPaginate, paginate } from "utils/paginate";
import { productColumns } from "components/columns/productColumns";
import { getProducts } from "redux/actions/product";
import { ImagePreview } from "./ImagePreview";

export const ProductPage = () => {
  const [paginator, setPaginator] = useState(initialPaginate());
  const [paginatedData, setPaginatedData] = useState([]);
  const [openImgView, setOpenImgView] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [action, setAction] = useState("add");

  const appState = useSelector((state) => state);
  const {
    productsGet: { loading: fetching, products },
  } = appState;

  useEffect(() => {
    if (products.length > 0) {
      const { pageNumber, pageSize } = paginator;
      const paginatedData = paginate(products, pageNumber, pageSize);
      setPaginatedData(paginatedData);
    }
  }, [products, paginator]);
  useEffect(() => {
    getProducts({});
  }, []);
  const onPageChange = ({ selected }) => {
    setPaginator({ ...paginator, pageNumber: selected + 1 });
  };
  const onProductClick = (product = {}, action) => {
    setCurrentItem(product);
    if (action === "preview") {
      setOpenImgView(true);
      return;
    }
    setAction(action);
  };
  return (
    <Grid container spacing={2} sx={{ py: 3 }}>
      <ImagePreview
        open={openImgView}
        setOpen={() => setOpenImgView(false)}
        productId={currentItem?._id}
      />
      <Grid item xs={12} sm={4} md={4} lg={4}>
        <ProductRegistration action={action} currentItem={currentItem} />
      </Grid>
      <Grid item xs={12} sm={8} md={8} lg={8}>
        <CustomisedTable
          tableTitle="List of products"
          columns={productColumns(onProductClick)}
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
