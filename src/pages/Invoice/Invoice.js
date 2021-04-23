import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { CustomisedTable } from "components/CustomizedTable";
import { useSelector } from "react-redux";
import { InvoiceRegistration } from "./InvoiceRegistration";
import { getInvoices } from "redux/actions/invoice";
import { invoiceColumns } from "components/columns";
import { initialPaginate, paginate } from "utils/paginate";

export const InvoicePage = () => {
  const invoiceState = useSelector((state) => state);
  const [paginatedData, setPaginatedData] = useState([]);
  const [paginator, setPaginator] = useState(initialPaginate());
  const [currentItem, setCurrentItem] = useState(null);
  const [action, setAction] = useState("add");
  const {
    invoicesGet: { loading, invoices },
    invoiceEdit: { loaded: updated },
  } = invoiceState;
  useEffect(() => {
    if (invoices.length > 0) {
      const { pageNumber, pageSize } = paginator;
      const paginatedData = paginate(invoices, pageNumber, pageSize);
      setPaginatedData(paginatedData);
    }
  }, [invoices, paginator]);
  useEffect(() => {
    getInvoices({});
  }, []);
  useEffect(() => {
    if (updated) {
      setCurrentItem(null);
      setAction("add");
      getInvoices({});
    }
  }, [updated]);
  const onPageChange = ({ selected }) => {
    setPaginator({ ...paginator, pageNumber: selected + 1 });
  };
  const onInvoiceClick = (invoice = {}, action) => {
    setCurrentItem(invoice);
    setAction(action);
  };
  return (
    <Grid
      container
      spacing={2}
      sx={{
        py: 3,
      }}
    >
      <Grid item xs={12} sm={4} md={4} lg={4}>
        <InvoiceRegistration action={action} currentItem={currentItem} />
      </Grid>
      <Grid item xs={12} sm={8} md={8} lg={8}>
        <CustomisedTable
          tableTitle="List of invoices"
          columns={invoiceColumns(onInvoiceClick)}
          loading={loading}
          data={paginatedData}
          withPagination
          dataCount={invoices.length}
          pageCount={Math.ceil(invoices.length / paginator.pageSize)}
          handlePageChange={onPageChange}
          page={paginator.pageNumber}
        />
      </Grid>
    </Grid>
  );
};
