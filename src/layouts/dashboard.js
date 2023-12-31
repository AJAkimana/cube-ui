import React, { useEffect } from "react";
import { renderRoutes } from "react-router-config";
import { Container, Grid } from "@material-ui/core";
import { useSelector } from "react-redux";
import Subscriptions from "components/dashboard/subscriptions.component";
import TotalCustomers from "components/dashboard/customers.component";
import TotalProjects from "components/dashboard/count.projects.component";
import TotalQuotes from "components/dashboard/quotes.component";
import { Link } from "react-router-dom";
import { USER_INFO } from "../utils/constants";
import { getDashboardCounts } from "redux/actions/project";
import Loading from "components/loading.component";
import { AppHeader } from "components/AppHeader";

const countsSize = (role) => {
  const sizes = {
    Admin: { lg: 3, sm: 6, xl: 3, xs: 12 },
    Manager: { lg: 3, sm: 6, xl: 3, xs: 12 },
    Client: { lg: 4, sm: 6, xl: 4, xs: 12 },
  };
  return role ? sizes[role] : sizes.Client;
};
export const DashboardLayout = ({ route, history }) => {
  const dashboardState = useSelector((state) => state);
  const {
    login: {
      userInfo: { user },
    },
    dashboard: { loading, counts },
  } = dashboardState;

  useEffect(() => {
    if (!user.fullName) {
      localStorage.removeItem(USER_INFO);
      history.replace("/");
    }
  }, [user, history]);
  useEffect(() => {
    getDashboardCounts();
  }, []);
  return (
    <AppHeader>
      <Container maxWidth={false}>
        {loading ? (
          <Loading />
        ) : (
          <Grid container spacing={3}>
            {user.role !== "Client" && (
              <Grid
                item
                lg={countsSize(user.role).lg}
                sm={countsSize(user.role).sm}
                xl={countsSize(user.role).xl}
                xs={countsSize(user.role).xs}
                component={Link}
                to="/dashboard/customers"
              >
                <TotalCustomers counts={counts.users || 0} />
              </Grid>
            )}
            <Grid
              item
              lg={countsSize(user.role).lg}
              sm={countsSize(user.role).sm}
              xl={countsSize(user.role).xl}
              xs={countsSize(user.role).xs}
              component={Link}
              to="/dashboard/projects"
            >
              <TotalProjects counts={counts.projects || 0} />
            </Grid>
            <Grid
              item
              lg={countsSize(user.role).lg}
              sm={countsSize(user.role).sm}
              xl={countsSize(user.role).xl}
              xs={countsSize(user.role).xs}
              component={Link}
              to="/dashboard/quotes"
            >
              <TotalQuotes
                sx={{ height: "100%" }}
                counts={counts.quotes || 0}
              />
            </Grid>
            <Grid
              item
              lg={countsSize(user.role).lg}
              sm={countsSize(user.role).sm}
              xl={countsSize(user.role).xl}
              xs={countsSize(user.role).xs}
              component={Link}
              to="/dashboard/subscriptions"
            >
              <Subscriptions counts={counts.subscriptions || 0} />
            </Grid>
          </Grid>
        )}
        {renderRoutes(route.routes)}
      </Container>
    </AppHeader>
  );
};
