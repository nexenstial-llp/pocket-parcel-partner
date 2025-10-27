import { createFileRoute } from "@tanstack/react-router";
import { Table } from "antd";
import { useState } from "react";
import NewPickupLocation from "../../../../components/pages/settings/pickup-locations/NewPickupLocation";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
const columns = [
  {
    title: "Pickup Location",
    key: "pickup-location",
    dataIndex: "pickup-location",
  },
  {
    title: "Created On",
    key: "created-on",
    dataIndex: "created-on",
  },
  {
    title: "Status",
    key: "status",
    dataIndex: "status",
  },
  {
    title: "City",
    key: "city",
    dataIndex: "city",
  },
  {
    title: "State",
    key: "state",
    dataIndex: "state",
  },
];
export const Route = createFileRoute(
  "/_authenticated/settings/pickup-locations/"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const [data, setData] = useState([]);
  return (
    <ResponsiveCard
      title="Pickup Locations"
      extra={<NewPickupLocation data={data} setData={setData} />}
    >
      <Table bordered columns={columns} dataSource={data} />
    </ResponsiveCard>
  );
}
