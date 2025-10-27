import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { ConfigProvider } from "antd";
import InnerApp from "./InnerApp";
import { AuthProvider } from "./lib/auth/AuthProvider";

const queryClient = new QueryClient();

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

// ✅ Reuse existing root during hot reloads
const existingRoot = rootElement._reactRootContainer?._internalRoot
  ?.containerInfo
  ? null
  : rootElement._reactRoot;

const root = existingRoot || createRoot(rootElement);

root.render(
  <StrictMode>
    <ConfigProvider
      theme={{
        token: {
          // colorPrimary: "#3883FF",
          // colorPrimary: "#6366f1", //Purple
          colorPrimary: "#2b358e", // Orange
          // motionDurationSlow: "0.15s",
        },
        components: {
          Menu: {
            // colorPrimaryActive: "#f4592b",
            // colorPrimaryBg: "#f4592b",
            // itemActiveBg: "#f4592b",

            collapsedWidth: "70px",
            darkItemBg: "#001529",
            darkItemHoverBg: "#f4592b",
            darkItemHoverColor: "#fff",
            darkItemSelectedBg: "#f4592b",
            darkItemSelectedColor: "#fff",
            darkSubMenuItemBg: "#001529",

            // Light
            itemHoverBg: "#f4592b",
            itemSelectedBg: "#f4592b",
            itemSelectedColor: "#fff",
            // subMenuItemBg: "#001529",
          },
          Button: {
            fontSize: "12px",
          },
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <InnerApp />
        </AuthProvider>
        <Toaster />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ConfigProvider>
  </StrictMode>
);
