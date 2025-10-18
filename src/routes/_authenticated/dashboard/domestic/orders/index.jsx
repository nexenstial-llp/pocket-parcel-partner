import DashboardPage from "@/components/pages/dashboard/domestic/overview/orders/DashboardPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_authenticated/dashboard/domestic/orders/"
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <DashboardPage />
    </div>
  );
}
