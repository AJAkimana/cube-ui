import React, { useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { useDispatch, useSelector } from 'react-redux';
import { listUsers } from '../../actions/login.actions';
import LoadingBox from '../loading.component';
import MessageBox from '../message.component';
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#8967fc',
    color: theme.palette.common.white,
    fontSize: 16,
  },
  body: {
    fontSize: 16,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const StyleButton = withStyles((theme) => ({
  root: {
    color: '#8967fc',
    float: 'right',
    fontSize: 14,
    '&:hover': {
      backgroundColor: 'none',
      color: 'none',
      BorderColor: 'none'
    },
  },
}))(Button);


const useStyles = makeStyles({
  table: {
    width: '100%',
  },
});

export default function Users() {
  const classes = useStyles();
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch]);
  return (
    <TableContainer component={Paper}>
      <h1>Users</h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
          <Table className={classes.table} aria-label="customized table">
              <TableHead>
                  <TableRow>
                      <StyledTableCell>NAME</StyledTableCell>
                      <StyledTableCell>EMAIL</StyledTableCell>
                      <StyledTableCell>TELEPHONE</StyledTableCell>
                      <StyledTableCell>COMPANY NAME</StyledTableCell>
                  </TableRow>
              </TableHead>
              <TableBody>
                  {users.data.slice(0, 5).map((user) => (
                  <StyledTableRow key={user._id} sortDirection="desc">
                      <StyledTableCell>{user.fullName}</StyledTableCell>
                      <StyledTableCell>{user.email}</StyledTableCell>
                      <StyledTableCell>{user.phoneNumber}</StyledTableCell>
                      <StyledTableCell>{user.companyName}</StyledTableCell>
                  </StyledTableRow>
                  ))}
              </TableBody>
          </Table>
      )}
      <Box sx={{
            p: 2,
          }}>
          <StyleButton endIcon={<ArrowRightIcon />}>
            View All
          </StyleButton>
      </Box>
    </TableContainer>
  );
}
