import PageLayout from "@/components/layout/PageLayout";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import { presetDateRanges } from "@/utils/date";
import { createFileRoute } from "@tanstack/react-router";
import { DatePicker, Tooltip } from "antd";
import { FaTruck } from "react-icons/fa";

export const Route = createFileRoute("/_authenticated/overview/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PageLayout>
      <ResponsiveCard title="Overview">
        <div className="flex flex-col gap-2 md:gap-4">
          <div className="flex gap-2 items-center">
            <DatePicker.RangePicker
              format={"DD-MM-YYYY"}
              presets={presetDateRanges}
              placeholder={"Created Date"}
            />
            <DatePicker.RangePicker
              format={"DD-MM-YYYY"}
              presets={presetDateRanges}
              placeholder={"Delivery Date"}
            />
            <DatePicker.RangePicker
              format={"DD-MM-YYYY"}
              presets={presetDateRanges}
              placeholder={"Pickup Date"}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-2 sm:gap-3 md:gap-4">
            <ResponsiveCard
              styles={{
                header: {
                  background: "#e4f9ff",
                },
              }}
              title={
                <div className="flex items-center gap-2 text-[#3b7f94]">
                  <FaTruck size={20} /> Total Dispatched{" "}
                  <Tooltip title="Total orders dispatched (Forward)"></Tooltip>
                </div>
              }
              size="small"
            >
              0 <br /> (0)
            </ResponsiveCard>
            <ResponsiveCard
              styles={{
                header: {
                  background: "#ddffe1",
                },
              }}
              title={
                <div className="flex items-center gap-2 text-[#55a55e]">
                  <FaTruck size={20} /> Total Delivered (Forward)
                </div>
              }
              size="small"
            >
              0 <br /> (0)
            </ResponsiveCard>
            <ResponsiveCard
              styles={{
                header: {
                  background: "#feeaeb",
                },
              }}
              title={
                <div className="flex items-center gap-2 text-[#9b705d]">
                  <FaTruck size={20} /> Total RTO
                </div>
              }
              size="small"
            >
              0 <br /> (0)
            </ResponsiveCard>
            <ResponsiveCard
              styles={{
                header: {
                  background: "#e4f9ff",
                },
              }}
              title={
                <div className="flex items-center gap-2 text-[#3b7f94]">
                  <FaTruck size={20} /> Total Revenue
                </div>
              }
              size="small"
            >
              0 <br /> (0)
            </ResponsiveCard>
          </div>
        </div>
      </ResponsiveCard>
    </PageLayout>
  );
}
