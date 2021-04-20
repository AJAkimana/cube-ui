import React from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import _ from "lodash";
import { useTableStyles } from "./styles";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Paginate } from "../Paginate";
import { NoDisplayData } from "../NoDisplayData";
import { Loading } from "../loading.component";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#8967fc",
    color: theme.palette.common.white,
    fontSize: 16,
  },
  body: {
    fontSize: 16,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export const CustomisedTable = ({
  data = [],
  tableTitle = "",
  dataCount = 0,
  pageCount = 0,
  page = 1,
  columns = [],
  selectedData = [],
  loading = false,
  withPagination = true,
  handlePageChange,
  size = "medium",
}) => {
  const classes = useTableStyles();
  const renderCell = (item, column) => {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  };
  return (
    <div className={classes.root}>
      {/* <Typography color='textSecondary' gutterBottom variant='body2'>
				{dataCount} Records found. Page {page} of {pageCount}
			</Typography> */}
      <Card>
        <CardHeader title={tableTitle} />
        <Divider />
        <CardContent className={classes.tableContent}>
          {loading ? (
            <Loading />
          ) : data.length ? (
            <PerfectScrollbar>
              <Table size={size}>
                <TableHead>
                  <StyledTableRow>
                    {columns.map(({ label }, columnIdx) => (
                      <StyledTableCell key={columnIdx}>{label}</StyledTableCell>
                    ))}
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {data.map((item, itemIdx) => (
                    <StyledTableRow
                      className={classes.tableRow}
                      hover
                      key={itemIdx}
                      selected={selectedData.indexOf(item.id) !== -1}
                    >
                      {columns.map((cellColumn, cellColumnIdx) => (
                        <StyledTableCell key={cellColumnIdx}>
                          {renderCell(item, cellColumn)}
                        </StyledTableCell>
                      ))}
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </PerfectScrollbar>
          ) : (
            <NoDisplayData />
          )}
        </CardContent>
        {pageCount !== 0 && withPagination && (
          <CardActions className={classes.actions}>
            <Paginate
              marginPagesDisplayed={2}
              onPageChange={handlePageChange}
              pageCount={pageCount}
              pageRangeDisplayed={1}
            />
          </CardActions>
        )}
      </Card>
    </div>
  );
};
