import React from "react";
import { Redirect } from "react-router-dom";
import { DashboardLayout } from "layouts/dashboard";
import LoginPage from "pages/login.page";
import HomePage from "pages/home.page";
import SetPassword from "pages/set.password.page";
import { ProjectPage } from "pages/Project";
import { QuotePage } from "pages/Quote";
import { InvoicePage } from "pages/Invoice";
import { SubscriptionPage } from "./pages/Subscription";
import { store } from "redux/store";

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
        component: () => {
          const {
            login: {
              userInfo: { user },
            },
          } = store.getState();
          const route = user.role === "Manager" ? "customers" : "projects";
          return <Redirect to={`/dashboard/${route}`} />;
        },
      },
      {
        path: "/dashboard/customers",
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
      {
        path: "/dashboard/invoices",
        exact: true,
        component: InvoicePage,
      },
      {
        path: "/dashboard/subscriptions",
        exact: true,
        component: SubscriptionPage,
      },
    ],
  },
  {
    component: () => <Redirect to="/dashboard/home" />,
  },
];
export default routes;
