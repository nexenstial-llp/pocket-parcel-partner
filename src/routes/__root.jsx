import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import Sidebar from "../components/Sidebar/index";
import Navbar from "../components/Navbar";
import { ConfigProvider } from "antd";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
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
          <Sidebar />
          <div
            style={{ scrollbarWidth: "thin" }}
            className="bg-gray-100 w-full min-h-screen max-h-screen overflow-auto scroll-smooth"
          >
            <Navbar />
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
