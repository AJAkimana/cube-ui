import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { CustomisedTable } from "components/CustomizedTable";
import { ProductRegistration } from "./ProductRegistraction";
import { useSelector } from "react-redux";
import { initialPaginate, paginate } from "utils/paginate";
import { productColumns } from "components/columns/productColumns";
import { getProducts } from "redux/actions/product";

export const ProductPage = () => {
  const [paginator, setPaginator] = useState(initialPaginate());
  const [paginatedData, setPaginatedData] = useState([]);

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
    getProducts();
  }, []);
  const onPageChange = ({ selected }) => {
    setPaginator({ ...paginator, pageNumber: selected + 1 });
  };
  return (
    <Grid container spacing={2} sx={{ py: 3 }}>
      <Grid item xs={12} sm={4} md={4} lg={4}>
        <ProductRegistration />
      </Grid>
      <Grid item xs={12} sm={8} md={8} lg={8}>
        <CustomisedTable
          tableTitle="List of products"
          columns={productColumns}
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
