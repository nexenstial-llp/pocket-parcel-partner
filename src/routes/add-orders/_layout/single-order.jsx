import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/add-orders/_layout/single-order")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/add-orders/_layout/single-order"!</div>;
}
