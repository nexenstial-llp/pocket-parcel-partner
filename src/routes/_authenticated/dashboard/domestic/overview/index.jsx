import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import DashboardStatCard from "@/components/pages/dashboard/domestic/overview/DashboardStatCard";
import OperationsStatCard from "@/components/pages/dashboard/domestic/overview/OperationsStatCard";
import { createFileRoute } from "@tanstack/react-router";
import { Divider, Empty } from "antd";
import { TbFileTime } from "react-icons/tb";
import DefaultExtraContent from "@/components/pages/dashboard/domestic/overview/DefaultExtraContent";

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

const cardStyle = {
  header: { border: "none" },
};
function RouteComponent() {
  return (
    <>
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
      </div>
      <div className="grid grid-cols-12 gap-4">
        <ResponsiveCard
          shadow
          title="Couriers Split"
          size="small"
          extra={<span className="text-[12px]">Last 30 days</span>}
          styles={cardStyle}
          className="col-span-12 sm:col-span-6 md:col-span-4"
        >
          <Empty />
        </ResponsiveCard>
        <ResponsiveCard
          shadow
          title="Overall Shipment Status"
          size="small"
          styles={cardStyle}
          className="col-span-12 sm:col-span-6 md:col-span-4"
          extra={<DefaultExtraContent />}
        >
          <Empty description="No Shipment in last 30 days" />
        </ResponsiveCard>
        <ResponsiveCard
          shadow
          title="Delivery Performance"
          size="small"
          styles={cardStyle}
          className="col-span-12 sm:col-span-6 md:col-span-4"
          extra={<DefaultExtraContent />}
        >
          <Empty description="No Shipment in last 30 days" />
        </ResponsiveCard>
        <ResponsiveCard
          shadow
          title="Shipments - Zone Distribution"
          size="small"
          styles={cardStyle}
          className="col-span-12 sm:col-span-6 md:col-span-4"
          extra={"Last 30 days"}
        >
          <Empty description="No Shipment in last 30 days" />
        </ResponsiveCard>
        <ResponsiveCard
          shadow
          title="Revenue"
          size="small"
          styles={cardStyle}
          className=" col-span-12 sm:col-span-6 md:col-span-4"
          extra={"Last 30 days"}
        >
          <div>
            <div className="flex justify-between ">
              <span className="font-semibold">Last 90 Days</span>
              <span className="text-[12px]">₹0</span>
            </div>
            <Divider size="small" />
            <div className="flex justify-between ">
              <span className="font-semibold">This Week</span>
              <span className="text-[12px]">₹0</span>
            </div>
            <Divider size="small" />
            <div className="flex justify-between ">
              <span className="font-semibold">This Month</span>
              <span className="text-[12px]">₹0</span>
            </div>
            <Divider size="small" />
            <div className="flex justify-between ">
              <span className="font-semibold">This Quarter</span>
              <span className="text-[12px]">₹0</span>
            </div>
          </div>
        </ResponsiveCard>
        <ResponsiveCard
          shadow
          title="Shipment Overview by Courier"
          size="small"
          styles={cardStyle}
          className="col-span-12"
          extra={<DefaultExtraContent />}
        >
          <Empty description="No Shipment in last 30 days" />
        </ResponsiveCard>
      </div>
    </>
  );
}
