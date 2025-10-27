import RTODashboard from "@/components/pages/dashboard/domestic/rto/RTODashboard";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/dashboard/domestic/rto/")(
  {
    component: RouteComponent,
  }
);

function RouteComponent() {
  return (
    <div>
      <RTODashboard />
    </div>
  );
}
