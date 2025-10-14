import PageLayout from "@/components/layout/PageLayout";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import { presetDateRanges } from "@/utils/date";
import { createFileRoute } from "@tanstack/react-router";
import { DatePicker, Divider, Tooltip } from "antd";
import { FaBoxOpen, FaInfoCircle, FaTruck } from "react-icons/fa";
import { TbTruckReturn } from "react-icons/tb";
import { GiTakeMyMoney } from "react-icons/gi";
import TopCarriers from "@/components/pages/overview/TopCarriers";
import OrderStatus from "@/components/pages/overview/OrderStatus";
export const Route = createFileRoute("/_authenticated/overview/")({
  component: RouteComponent,
});
const overViewData = [
  {
    title: "Total Dispatched",
    value: 0,
    subtitle: "(0)",
    icon: <FaTruck size={20} />,
    iconColor: "#3b7f94",
    bgColor: "#e4f9ff",
    tooltip: "Total dispatched orders",
  },
  {
    title: "Total Delivered (Forward)",
    value: 0,
    subtitle: "(0)",
    icon: <FaBoxOpen size={20} />,
    iconColor: "#55a55e",
    bgColor: "#ddffe1",
    tooltip: "Total delivered orders",
  },
  {
    title: "Total RTO",
    value: 0,
    subtitle: "(0)",
    icon: <TbTruckReturn size={20} />,
    iconColor: "#9b705d",
    bgColor: "#feeaeb",
    tooltip: "Orders returned to origin",
  },
  {
    title: "Total Revenue",
    value: 0,
    subtitle: "(0)",
    icon: <GiTakeMyMoney size={20} />,
    iconColor: "#3b7f94",
    bgColor: "#e4f9ff",
    tooltip: "Value of delivered orders",
  },
];

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
            {overViewData.map((data, index) => (
              <ResponsiveCard
                key={index}
                styles={{
                  header: {
                    background: data.bgColor,
                  },
                }}
                title={
                  <div
                    className="flex items-center gap-2"
                    style={{ color: data.iconColor }}
                  >
                    {data.icon} {data.title}{" "}
                    <Tooltip title={data.tooltip}>
                      <FaInfoCircle size={10} />
                    </Tooltip>
                  </div>
                }
                size="small"
              >
                {data.value} <br /> {data.subtitle}
              </ResponsiveCard>
            ))}
          </div>
          <Divider style={{ margin: "12px 0px" }} />
          <TopCarriers />
          <OrderStatus />
        </div>
      </ResponsiveCard>
    </PageLayout>
  );
}
