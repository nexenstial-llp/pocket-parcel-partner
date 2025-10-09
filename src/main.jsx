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
          // Seed Token
          colorPrimary: "#6366f1",
        },
        components: {
          Menu: {
            collapsedWidth: "70px",
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
