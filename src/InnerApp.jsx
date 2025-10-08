import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";
import { useAuth } from "./lib/auth/useAuth";

const InnerApp = () => {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
};

export default InnerApp;
