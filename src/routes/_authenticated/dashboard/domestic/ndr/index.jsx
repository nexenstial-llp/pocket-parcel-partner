import NDRDashboard from "@/components/pages/dashboard/domestic/ndr/NDRDashboard";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/dashboard/domestic/ndr/")(
  {
    component: RouteComponent,
  }
);

function RouteComponent() {
  return (
    <div>
      <NDRDashboard />
    </div>
  );
}
