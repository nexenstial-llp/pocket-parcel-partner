import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/international/overview/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/dashboard/international/overview/"!</div>;
}
