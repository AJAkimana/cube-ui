import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { QuoteRegistration } from "./QuoteRegistration";
import { useSelector } from "react-redux";
import { getQuotes } from "redux/actions/quote";
import { initialPaginate, paginate } from "utils/paginate";
import { quoteColumns } from "components/columns/quoteColumns";
import { CustomisedTable } from "components/CustomizedTable";

export const QuotePage = () => {
  const quoteState = useSelector((state) => state);
  const [paginatedData, setPaginatedData] = useState([]);
  const [paginator, setPaginator] = useState(initialPaginate());
  const [currentItem, setCurrentItem] = useState(null);
  const [action, setAction] = useState("add");
  const {
    quotesGet: { loading, quotes },
    quoteAdd: { loaded: added },
    quoteEdit: { loaded: updated },
  } = quoteState;
  useEffect(() => {
    if (quotes.length > 0) {
      const { pageNumber, pageSize } = paginator;
      const paginatedData = paginate(quotes, pageNumber, pageSize);
      setPaginatedData(paginatedData);
    }
  }, [quotes, paginator]);
  useEffect(() => {
    getQuotes();
  }, []);
  useEffect(() => {
    if (added || updated) {
      setCurrentItem(null);
      setAction("add");
      getQuotes();
    }
  }, [added, updated]);
  const onPageChange = ({ selected }) => {
    setPaginator({ ...paginator, pageNumber: selected + 1 });
  };
  const onQuoteClick = (project = {}, action) => {
    setCurrentItem(project);
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
        <QuoteRegistration action={action} currentItem={currentItem} />
      </Grid>
      <Grid item xs={12} sm={8} md={8} lg={8}>
        <CustomisedTable
          tableTitle="All quotes"
          columns={quoteColumns(onQuoteClick)}
          loading={loading}
          data={paginatedData}
          withPagination
          dataCount={quotes.length}
          pageCount={Math.ceil(quotes.length / paginator.pageSize)}
          handlePageChange={onPageChange}
          page={paginator.pageNumber}
        />
      </Grid>
    </Grid>
  );
};
