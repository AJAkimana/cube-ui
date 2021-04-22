import React from "react";
import { Redirect } from "react-router-dom";
import { DashboardLayout } from "layouts/dashboard";
import LoginPage from "pages/login.page";
import HomePage from "pages/home.page";
import SetPassword from "pages/set.password.page";
import { ProjectPage } from "pages/Project";
import { QuotePage } from "pages/Quote";

const routes = [
  {
    path: "/",
    exact: true,
    component: LoginPage,
  },
  {
    path: "/set-password/:token",
    exact: true,
    component: SetPassword,
  },
  {
    path: "/dashboard",
    component: DashboardLayout,
    routes: [
      {
        path: "/dashboard/home",
        exact: true,
        component: HomePage,
      },
      {
        path: "/dashboard/projects",
        exact: true,
        component: ProjectPage,
      },
      {
        path: "/dashboard/quotes",
        exact: true,
        component: QuotePage,
      },
    ],
  },
  {
    component: () => <Redirect to="/dashboard/home" />,
  },
];
export default routes;
