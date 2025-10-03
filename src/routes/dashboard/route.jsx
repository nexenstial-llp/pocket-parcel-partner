import PageLayout from "@/components/layout/PageLayout";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { Select } from "antd";

const tabLinks = [
  {
    label: "Overview",
    to: "/dashboard/domestic/overview",
  },
  {
    label: "Orders",
    to: "/dashboard/domestic/orders",
  },
  {
    label: "Shipments",
    to: "/dashboard/domestic/shipments",
  },
  {
    label: "NDR",
    to: "/dashboard/domestic/ndr",
  },
  {
    label: "NDR",
    to: "/dashboard/domestic/ndr",
  },
  {
    label: "WhatsApp Comm",
    to: "/dashboard/domestic/whatsapp",
  },
  {
    label: "RTO",
    to: "/dashboard/domestic/rto",
  },
  {
    label: "Courier",
    to: "/dashboard/domestic/courier",
  },
  {
    label: "Delays",
    to: "/dashboard/domestic/delays",
  },
];
export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PageLayout>
      <div className="flex items-center gap-4">
        <h2 className="text-xl">Dashboard</h2>
        <Select
          className="w-32"
          defaultValue={"domestic"}
          options={[
            { label: "Domestic", value: "domestic" },
            { label: "International", value: "international" },
          ]}
        />
      </div>
      <div className="flex mt-4 text-lg gap-4 font-semibold text-gray-500">
        {tabLinks?.map((item) => (
          <Link
            activeProps={{ className: "text-indigo-500" }}
            to={item?.to}
            key={item?.label}
          >
            {({ isActive }) => {
              return (
                <div
                  className={`${isActive ? "border-b-2 border-indigo-400 " : ""} delay-150`}
                >
                  <span>{item?.label}</span>
                </div>
              );
            }}
          </Link>
        ))}
      </div>
      <Outlet />
    </PageLayout>
  );
}
