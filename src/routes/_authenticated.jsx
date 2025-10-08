// src/routes/_authenticated.jsx
import { createFileRoute, redirect, Outlet } from "@tanstack/react-router";
import React from "react";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import NotFound from "@/components/layout/NotFoundPage";
import ErrorPage from "@/components/layout/ErrorPage";

export const Route = createFileRoute("/_authenticated")({
  // The beforeLoad hook runs before navigation completes and before the component renders.
  beforeLoad: ({ context, location }) => {
    if (!context.auth || !context.auth.isAuthenticated) {
      throw redirect({
        to: "/auth/login",
        search: { redirect: location.href },
      });
    }
  },

  // This component will render the common layout/shell for all protected routes.
  // Assuming your 'PageLayout' component contains your Sidebar and Navbar.
  component: RootComponent,
  notFoundComponent: () => <NotFound />,
  errorComponent: ({ error }) => {
    return <ErrorPage error={error} />;
  },
});
function RootComponent() {
  const [collapsed, setCollapsed] = React.useState(true);
  const { auth } = Route.useRouteContext();
  return (
    <React.Fragment>
      <div className="flex">
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        <div
          style={{ scrollbarWidth: "thin" }}
          className="bg-gray-100 w-full min-h-screen max-h-screen overflow-auto scroll-smooth"
        >
          <Navbar
            auth={auth}
            collapsed={collapsed}
            setCollapsed={setCollapsed}
          />
          <div className="pp-container">
            <Outlet />
          </div>
        </div>
      </div>
      <TanStackRouterDevtools />
    </React.Fragment>
  );
}
