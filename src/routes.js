import React from "react";
import { Redirect } from "react-router-dom";
import { DashboardLayout } from "layouts/dashboard";
import SetPassword from "pages/set.password.page";
import { ProjectPage } from "pages/Project";
import { QuotePage } from "pages/Quote";
import { InvoicePage } from "pages/Invoice";
import { SubscriptionPage } from "pages/Subscription";
import { store } from "redux/store";
import { CustomerPage } from "pages/Customer";
import { UserProfile } from "./pages/UserProfile";
import { LoginPage } from "pages/Login";
import { ProjectDetailPage } from "pages/ProjectDetail";
import { ProductPage } from "pages/Product";

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
    path: "/set-password/:token/:action",
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
          const route = user.role !== "Client" ? "customers" : "projects";
          return <Redirect to={`/dashboard/${route}`} />;
        },
      },
      {
        path: "/dashboard/customers",
        exact: true,
        component: CustomerPage,
      },
      {
        path: "/dashboard/projects",
        exact: true,
        component: ProjectPage,
      },
      {
        path: "/dashboard/products",
        exact: true,
        component: ProductPage,
      },
      {
        path: "/dashboard/projects/:projectId",
        exact: true,
        component: ProjectDetailPage,
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
      {
        path: "/dashboard/profile",
        exact: true,
        component: UserProfile,
      },
    ],
  },
  {
    component: () => <Redirect to="/dashboard/home" />,
  },
];
export default routes;
