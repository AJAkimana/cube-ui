import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import { CustomisedTable } from "components/CustomizedTable";
import { productAnalyticsColumns } from "components/columns";
import { useSelector } from "react-redux";
import { getProjects } from "redux/actions/project";
import { initialPaginate, paginate } from "utils/paginate";
import { getProdAnalytics } from "redux/actions/product";
import { ViewProductDialog } from "pages/ProjectDetail/ViewProductDialog";

const initialOptions = { project: "", time: "allTime" };
const btnFilters = [
  { id: "today", name: "Today" },
  { id: "7days", name: "Last 7 days" },
  { id: "30days", name: "Last 30 days" },
  { id: "allTime", name: "All time" },
];
export const AnalyticsPage = () => {
  const [options, setOptions] = useState(initialOptions);
  const [tableTitle, setTableTitle] = useState("All");
  const [paginator, setPaginator] = useState(initialPaginate());
  const [paginatedData, setPaginatedData] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);

  const appState = useSelector((state) => state);
  const {
    projectsGet: { projects },
    analyticsGet: { analytics, loading },
  } = appState;
  useEffect(() => {
    getProjects({});
  }, []);
  useEffect(() => {
    let project = "";
    if (Boolean(options.project)) {
      project = `PROJECT: ${
        projects.find((el) => el._id === options.project).name
      }. `;
    }
    setTableTitle(
      project + "TIME: " + btnFilters.find((el) => el.id === options.time).name
    );
    getProdAnalytics(options);
    // eslint-disable-next-line
  }, [options]);
  useEffect(() => {
    const { pageNumber, pageSize } = paginator;
    const paginatedData = paginate(analytics, pageNumber, pageSize);
    setPaginatedData(paginatedData);
  }, [analytics, paginator]);
  const onPageChange = ({ selected }) => {
    setPaginator({ ...paginator, pageNumber: selected + 1 });
  };
  const onClickItem = (item) => {
    setCurrentItem(item);
  };
  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        minHeight: "100%",
        py: 3,
      }}
    >
      <ViewProductDialog
        open={Boolean(currentItem)}
        setOpen={() => {
          setCurrentItem(null);
        }}
        productId={currentItem?.product?._id}
      />
      <Grid container spacing={1}>
        <Grid item lg={4} md={4} xl={6} xs={12}>
          <Card>
            <CardHeader title="Add filters" />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel id="select-project">Select project</InputLabel>
                    <Select
                      labelId="select-project"
                      name="project"
                      value={options.project}
                      onChange={({ target }) =>
                        setOptions((prev) => ({
                          ...prev,
                          project: target.value,
                        }))
                      }
                    >
                      <MenuItem value="">---</MenuItem>
                      {projects.map((project, projectIdx) => (
                        <MenuItem value={project._id} key={projectIdx}>
                          {project.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <ButtonGroup
                    variant="contained"
                    aria-label="outlined primary button group"
                  >
                    {btnFilters.map(({ id, name }, btnIdx) => (
                      <Button
                        key={btnIdx}
                        color={options.time === id ? "primary" : ""}
                        onClick={() =>
                          setOptions((prev) => ({ ...prev, time: id }))
                        }
                      >
                        {name}
                      </Button>
                    ))}
                  </ButtonGroup>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item lg={8} md={8} xl={6} xs={12}>
          <Typography variant="h4">Analytics page</Typography>
          <CustomisedTable
            tableTitle={`Filters: ${tableTitle}`}
            columns={productAnalyticsColumns(onClickItem)}
            loading={loading}
            data={paginatedData}
            withPagination
            dataCount={analytics.length}
            pageCount={Math.ceil(analytics.length / paginator.pageSize)}
            handlePageChange={onPageChange}
            page={paginator.pageNumber}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
