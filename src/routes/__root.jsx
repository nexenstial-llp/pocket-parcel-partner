import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";

import NotFound from "@/components/layout/NotFoundPage";
import ErrorPage from "@/components/layout/ErrorPage";

export const Route = createRootRouteWithContext()({
  component: () => <Outlet />,
  notFoundComponent: () => <NotFound />,
  errorComponent: ({ error }) => {
    return <ErrorPage error={error} />;
  },
});
