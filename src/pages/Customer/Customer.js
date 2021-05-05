import React, { useEffect, useState } from "react";
import { Registration } from "./Registration";
import { useSelector } from "react-redux";
import { Box, Grid } from "@material-ui/core";
import { getUsersList } from "redux/actions/user";
import { initialPaginate, paginate } from "utils/paginate";
import { CustomisedTable } from "components/CustomizedTable";
import { userColumns } from "components/columns/userColumns";

export const CustomerPage = () => {
  const [paginatedUsers, setPaginatedUsers] = useState([]);
  const [paginator, setPaginator] = useState(initialPaginate(10));
  const userList = useSelector((state) => state.userList);
  const { loading, users } = userList;
  useEffect(() => {
    // getUsersList();
  }, []);
  useEffect(() => {
    if (users.length > 0) {
      const { pageNumber, pageSize } = paginator;
      const paginatedUsers = paginate(users, pageNumber, pageSize);
      setPaginatedUsers(paginatedUsers);
    }
  }, [users, paginator]);
  const onPageChange = ({ selected }) => {
    setPaginator({ ...paginator, pageNumber: selected + 1 });
  };
  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        minHeight: "100%",
        py: 3,
      }}
    >
      <Grid container spacing={1}>
        <Grid item lg={4} md={4} xl={6} xs={12}>
          <Registration />
        </Grid>
        <Grid item lg={8} md={8} xl={6} xs={12}>
          <CustomisedTable
            tableTitle="All users"
            loading={loading}
            columns={userColumns()}
            dataCount={paginatedUsers.length}
            data={paginatedUsers}
            withPagination
            pageCount={Math.ceil(users.length / paginator.pageSize)}
            handlePageChange={onPageChange}
            page={paginator.pageNumber}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
