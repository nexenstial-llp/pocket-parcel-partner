import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import DashboardStatCard from "@/components/pages/dashboard/domestic/overview/DashboardStatCard";
import OperationsStatCard from "@/components/pages/dashboard/domestic/overview/OperationsStatCard";
import { createFileRoute } from "@tanstack/react-router";
import { Empty } from "antd";
import { TbFileTime } from "react-icons/tb";

export const Route = createFileRoute(
  "/_authenticated/dashboard/domestic/overview/"
)({
  component: RouteComponent,
});
const shipmentDetailsData = [
  { label: "Total Shipments", value: 0 },
  { label: "Pickup Pending", value: 0 },
  { label: "In-Transit", value: 0 },
  { label: "Delivered", value: 0 },
  { label: "NDR Pending", value: 0 },
  { label: "RTO", value: 0 },
];
const ndrDetailsData = [
  { label: "Total NDR", value: 0 },
  { label: "Your Reattempt Request", value: 0 },
  { label: "Buyer Reattempt Request", value: 0 },
  { label: "NDR Delivered", value: 0 },
];
const codStatusData = [
  { label: "Total COD (Last 30 Days)", value: 0 },
  { label: "COD Available", value: 0 },
  { label: "COD Pending (Greater than 8 days)", value: 0 },
  { label: "Last COD Remitted", value: 0 },
];
function RouteComponent() {
  return (
    <ResponsiveCard>
      <div className="grid grid-cols-12 gap-4">
        <DashboardStatCard
          title="Today's Orders"
          value={"0"}
          previousLabel="Yesterday"
          previousValue={0}
        />
        <OperationsStatCard
          title="Shipment Details"
          stats={shipmentDetailsData}
          icon={<TbFileTime />}
        />
        <DashboardStatCard
          title="Today's Revenue"
          value={"0"}
          previousLabel="Yesterday"
          previousValue={0}
        />
        <OperationsStatCard
          lg={6}
          md={12}
          sm={12}
          xs={12}
          title="NDR Details"
          stats={ndrDetailsData}
          icon={<TbFileTime />}
        />
        <DashboardStatCard
          title="Average Shipping Cost"
          value={"0"}
          extra={<span className="text-[12px]">Last 30 days</span>}
        />
        <OperationsStatCard
          lg={6}
          md={12}
          sm={12}
          xs={12}
          title="COD Status"
          stats={codStatusData}
          icon={<TbFileTime />}
        />
        <ResponsiveCard
          className="col-span-4"
          title="Couriers Split"
          size="small"
          extra={<span className="text-[12px]">Last 30 days</span>}
          styles={{
            header: { border: "none" },
          }}
        >
          <Empty />
        </ResponsiveCard>
      </div>
    </ResponsiveCard>
  );
}
