import CourierWiseShipmentsChart from "@/components/pages/dashboard/domestic/overview/shipments/CourierWiseShipmentsChart";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_authenticated/dashboard/domestic/shipments/"
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <CourierWiseShipmentsChart />
    </div>
  );
}
