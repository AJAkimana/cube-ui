import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { CustomisedTable } from "components/CustomizedTable";
import { useSelector } from "react-redux";
import { ProjectRegistration } from "./ProjectRegistration";
import { getProjects } from "redux/actions/project";
import { projectColumns } from "components/columns";
import { initialPaginate, paginate } from "utils/paginate";
import { ProjectModel } from "./ProjectModal";

export const ProjectPage = () => {
  const projectState = useSelector((state) => state);
  const [paginatedData, setPaginatedData] = useState([]);
  const [paginator, setPaginator] = useState(initialPaginate());
  const [currentItem, setCurrentItem] = useState(null);
  const [action, setAction] = useState("add");
  const [openView, setOpenView] = useState(false);
  const {
    projectsGet: { loading, projects },
    projectAdd: { loaded: added },
    projectEdit: { loaded: updated },
    login: {
      userInfo: { user },
    },
  } = projectState;
  useEffect(() => {
    if (projects.length > 0) {
      const { pageNumber, pageSize } = paginator;
      const paginatedData = paginate(projects, pageNumber, pageSize);
      setPaginatedData(paginatedData);
    }
  }, [projects, paginator]);
  useEffect(() => {
    getProjects({});
  }, []);
  useEffect(() => {
    if (added || updated) {
      setCurrentItem(null);
      setAction("add");
      getProjects({});
    }
  }, [added, updated]);
  const onPageChange = ({ selected }) => {
    setPaginator({ ...paginator, pageNumber: selected + 1 });
  };
  const onProjectClick = (project = {}, action) => {
    setCurrentItem(project);
    if (action === "view") {
      setOpenView(true);
      return;
    }
    setAction(action);
  };
  return (
    <Grid container spacing={2} sx={{ py: 3 }}>
      <ProjectModel
        open={openView}
        setOpen={() => setOpenView(false)}
        currentItem={currentItem}
      />
      <Grid item xs={12} sm={4} md={4} lg={4}>
        <ProjectRegistration action={action} currentItem={currentItem} />
      </Grid>
      <Grid item xs={12} sm={8} md={8} lg={8}>
        <CustomisedTable
          tableTitle="List of projects"
          columns={projectColumns(onProjectClick, user)}
          loading={loading}
          data={paginatedData}
          withPagination
          dataCount={projects.length}
          pageCount={Math.ceil(projects.length / paginator.pageSize)}
          handlePageChange={onPageChange}
          page={paginator.pageNumber}
        />
      </Grid>
    </Grid>
  );
};
