import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { ConfigProvider } from "antd";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import NotFound from "@/components/layout/NotFoundPage";
import ErrorPage from "@/components/layout/ErrorPage";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => <NotFound />,
  errorComponent: ({ error }) => {
    return <ErrorPage error={error} />;
  },
});

function RootComponent() {
  const [collapsed, setCollapsed] = React.useState(true);
  return (
    <React.Fragment>
      <ConfigProvider
        theme={{
          token: {
            // Seed Token
            colorPrimary: "#6366f1",
          },
        }}
      >
        <div className="flex">
          <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
          <div
            style={{ scrollbarWidth: "thin" }}
            className="bg-gray-100 w-full min-h-screen max-h-screen overflow-auto scroll-smooth"
          >
            <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />
            <div className="pp-container">
              <Outlet />
            </div>
          </div>
        </div>
      </ConfigProvider>
      <TanStackRouterDevtools />
    </React.Fragment>
  );
}
