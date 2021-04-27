import React, { useEffect } from "react";
import { renderRoutes } from "react-router-config";
import { Container, Divider, Grid } from "@material-ui/core";
import { useSelector } from "react-redux";
import Invoices from "../components/dashboard/invoices.component";
import TotalCustomers from "../components/dashboard/customers.component";
import TotalProjects from "../components/dashboard/count.projects.component";
import TotalQuotes from "../components/dashboard/quotes.component";
import { signout } from "../redux/actions/user";
import { Link } from "react-router-dom";
import { USER_INFO } from "../utils/constants";
import { getDashboardCounts } from "redux/actions/project";
import Loading from "components/loading.component";

export const DashboardLayout = ({ route, history }) => {
  const dashboardState = useSelector((state) => state);
  const {
    login: { userInfo },
    dashboard: { loading, counts },
  } = dashboardState;

  useEffect(() => {
    if (!userInfo.user.fullName) {
      localStorage.removeItem(USER_INFO);
      history.replace("/");
    }
  }, [userInfo, history]);
  useEffect(() => {
    getDashboardCounts();
  }, []);
  return (
    <div className="App">
      <header className="App-Header">
        <h2>Augmented Reality Innovations</h2>
        {userInfo ? (
          <div className="dropdown">
            <Link to="#">
              {userInfo.user.fullName} <i className="fa fa-caret-down"></i>{" "}
            </Link>
            <ul className="dropdown-content">
              <li>
                <Link to="/dashboard/projects">Projects</Link>
              </li>
              <li>
                <Link to="/dashboard/quotes">Quotes</Link>
              </li>
              <li>
                <Link to="/dashboard/invoices">Invoices</Link>
              </li>
              <li>
                <Link to="/dashboard/subscriptions">Subscriptions</Link>
              </li>
              <li>
                <Divider />
              </li>
              <li>
                <Link to="#" onClick={() => signout()}>
                  Sign Out
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/">Home</Link>
        )}
      </header>
      <main>
        <Container maxWidth={false}>
          {loading ? (
            <Loading />
          ) : (
            <Grid container spacing={3}>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <Invoices counts={counts.invoicesAmount || 0} />
              </Grid>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <TotalCustomers counts={counts.users || 0} />
              </Grid>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <TotalProjects counts={counts.projects || 0} />
              </Grid>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <TotalQuotes
                  sx={{ height: "100%" }}
                  counts={counts.quotes || 0}
                />
              </Grid>
            </Grid>
          )}
          {renderRoutes(route.routes)}
        </Container>
      </main>
    </div>
  );
};
