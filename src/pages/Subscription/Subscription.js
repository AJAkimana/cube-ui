import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { CustomisedTable } from "components/CustomizedTable";
import { useSelector } from "react-redux";
import { getGetSubscriptions } from "redux/actions/subscription";
import { subscriptionColumns } from "components/columns";
import { initialPaginate, paginate } from "utils/paginate";

export const SubscriptionPage = () => {
  const [paginatedData, setPaginatedData] = useState([]);
  const [paginator, setPaginator] = useState(initialPaginate());
  const { loading, subscriptions } = useSelector(
    ({ subscriptionsGet }) => subscriptionsGet
  );
  useEffect(() => {
    if (subscriptions.length > 0) {
      const { pageNumber, pageSize } = paginator;
      const paginatedData = paginate(subscriptions, pageNumber, pageSize);
      setPaginatedData(paginatedData);
    }
  }, [subscriptions, paginator]);
  useEffect(() => {
    getGetSubscriptions();
  }, []);
  const onPageChange = ({ selected }) => {
    setPaginator({ ...paginator, pageNumber: selected + 1 });
  };
  return (
    <Grid
      container
      spacing={2}
      sx={{
        py: 3,
      }}
    >
      <Grid item xs={12} sm={8} md={8} lg={8}>
        <CustomisedTable
          tableTitle="List of subscriptions"
          columns={subscriptionColumns()}
          loading={loading}
          data={paginatedData}
          withPagination
          dataCount={subscriptions.length}
          pageCount={Math.ceil(subscriptions.length / paginator.pageSize)}
          handlePageChange={onPageChange}
          page={paginator.pageNumber}
        />
      </Grid>
    </Grid>
  );
};
