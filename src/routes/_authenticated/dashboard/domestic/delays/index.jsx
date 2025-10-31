import OrderDelaysDashboard from "@/components/pages/dashboard/domestic/delays/OrderDelaysDashboard";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_authenticated/dashboard/domestic/delays/"
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <OrderDelaysDashboard />
    </div>
  );
}
