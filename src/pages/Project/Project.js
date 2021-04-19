import { Grid, Paper, TableContainer, Box } from "@material-ui/core";
import { CustomisedTable } from "components/CustomizedTable";
import { ProjectRegistration } from "./ProjectRegistration";

export const ProjectPage = () => {
  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        minHeight: "100%",
        py: 3,
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4} md={4} lg={4}>
          <ProjectRegistration />
        </Grid>
        <Grid item xs={12} sm={8} md={8} lg={8}>
          <TableContainer component={Paper}>
            <CustomisedTable tableTitle="List of projects" />
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
};
