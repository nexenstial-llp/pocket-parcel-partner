import PageLayout from "@/components/layout/PageLayout";
import SearchPanelCard from "@/components/ui/cards/SearchPanelCard";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "antd";

export const Route = createFileRoute("/_authenticated/ndr/cases/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PageLayout>
      <SearchPanelCard
        searchTypeOptions={[
          { label: "AWB", value: "AWB" },
          { label: "Order ID", value: "order_id" },
        ]}
        extraButtons={[
          <Button size="small" key={"Generate Report"} type="primary">
            Generate Report
          </Button>,
          <Button size="small" key={"Report Status"}>
            Report Status
          </Button>,
        ]}
      />
    </PageLayout>
  );
}
