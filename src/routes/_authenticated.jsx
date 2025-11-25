// src/routes/_authenticated.jsx
import { createFileRoute, redirect, Outlet } from "@tanstack/react-router";
import React from "react";
import { TanStackRouterDevtoolsPanel } from "@tanstack/router-devtools";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import NotFound from "@/components/layout/NotFoundPage";
import ErrorPage from "@/components/layout/ErrorPage";
// import { Spin } from "antd";
import Loader from "@/components/layout/Loader";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import { Grid } from "antd";

const { useBreakpoint } = Grid;

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
  pendingComponent: () => (
    <div className="flex items-center justify-center min-h-screen">
      <Loader />
    </div>
  ),
});
function RootComponent() {
  const stored = localStorage.getItem("sidebar_collapsed");
  const initialCollapsed = stored === "true";

  // console.log("sidebar_collapsed", sidebar_collapsed);
  const [collapsed, setCollapsed] = React.useState(initialCollapsed);
  const [drawerVisible, setDrawerVisible] = React.useState(false);

  const screens = useBreakpoint();
  const isMobile = !screens.md; // md (>=768px) treated as desktop/tablet
  return (
    <React.Fragment>
      <div className="flex">
        <Sidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          drawerVisible={drawerVisible}
          setDrawerVisible={setDrawerVisible}
          isMobile={isMobile}
        />
        <div
          style={{ scrollbarWidth: "thin" }}
          className="bg-gray-100 w-full min-h-screen max-h-screen overflow-auto scroll-smooth"
          // className="bg-linear-to-tr from-[#e8f3ff]  to-[#ffede8] w-full min-h-screen max-h-screen overflow-auto scroll-smooth"
        >
          <Navbar
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            drawerVisible={drawerVisible}
            setDrawerVisible={setDrawerVisible}
            isMobile={isMobile}
          />
          <div className="pp-container">
            <Outlet />
          </div>
        </div>
      </div>

      {import.meta.env.VITE_APP_ENV === "development" && (
        <TanStackDevtools
          plugins={[
            {
              name: "TanStack Query",
              render: <ReactQueryDevtoolsPanel />,
              defaultOpen: true,
            },
            {
              name: "TanStack Router",
              render: <TanStackRouterDevtoolsPanel />,
              defaultOpen: false,
            },
          ]}
        />
      )}
    </React.Fragment>
  );
}
