import FilterSection from "@/components/pages/dashboard/domestic/FilterSection";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import { createFileRoute } from "@tanstack/react-router";
import { Empty } from "antd";

export const Route = createFileRoute(
  "/_authenticated/dashboard/domestic/courier/"
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <FilterSection />
      <ResponsiveCard title="Carrier">
        <Empty description="No data for selected filter, please change filter" />
      </ResponsiveCard>
    </>
  );
}
