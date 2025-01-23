import { createFileRoute } from "@tanstack/react-router";
import PageLayout from "@/components/PageLayout";
import SideRouting from "@/components/pages/tools/activityLogs/SideRouting";
import OrderTable from "@/components/pages/tools/activityLogs/OrderTable";

export const Route = createFileRoute("/tools/activity-logs/")({
  component: RouteComponent,
  search: { type: "" },
});

function RouteComponent() {
  return (
    <PageLayout>
      <h2 className="text-xl">Bulk Build Log</h2>
      <div className="flex gap-2">
        <SideRouting />
        <OrderTable />
      </div>
    </PageLayout>
  );
}
