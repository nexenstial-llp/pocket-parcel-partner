import PageLayout from "@/components/layout/PageLayout";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import SearchPanelCard from "@/components/ui/cards/SearchPanelCard";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumb, Button, DatePicker, Select, Table } from "antd";

export const Route = createFileRoute("/_authenticated/orders/")({
  component: RouteComponent,
});

const columns = [
  {
    title: "Reference Number",
    dataIndex: "reference_number",
    key: "reference_number",
  },
  {
    title: "AWB",
    dataIndex: "awb",
    key: "awb",
  },
  {
    title: "Order ID",
    dataIndex: "order_id",
    key: "order_id",
  },
  {
    title: "Carrier",
    dataIndex: "carrier",
    key: "carrier",
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",
  },
  {
    title: "Pick Date",
    dataIndex: "pick_date",
    key: "pick_date",
  },
  {
    title: "Order Status",
    dataIndex: "order_status",
    key: "order_status",
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
  },
];

function RouteComponent() {
  return (
    <PageLayout>
      <Breadcrumb items={[{ title: "Home" }, { title: "Orders" }]} />
      <SearchPanelCard
        searchTypeOptions={[
          { label: "AWB", value: "AWB" },
          { label: "Order ID", value: "order_id" },
          { label: "Reference Number", value: "reference_number" },
          { label: "Phone No", value: "phone" },
        ]}
        extraButtons={[
          <Button size="small" key={"Report Status"}>
            Report Status
          </Button>,
          <Button size="small" key={"Generate Report"} type="primary">
            Generate Report
          </Button>,
        ]}
      />
      <ResponsiveCard
        size="small"
        extra={
          <Link to="/orders/create">
            <Button type="primary" size="small">
              Create
            </Button>
          </Link>
        }
        title="Orders"
      >
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center overflow-x-auto">
            <Select
              style={{ minWidth: 150 }}
              options={[
                { label: "SELF - Self Demo", value: "self" },
                { label: "Bluedart - Bluedart", value: "BLUEDART" },
                { label: "DTDC - PP <> DTDC", value: "DTDC" },
              ]}
              placeholder="Carrier Partner"
              allowClear
            />
            <Select
              options={[
                { label: "SUCCESS", value: "SUCCESS" },
                { label: "IN PROGRESS", value: "IN PROGRESS" },
                { label: "FAILURE", value: "FAILURE" },
              ]}
              placeholder="Order Status"
              allowClear
            />
            {/* Delivery Type */}
            <Select
              options={[
                { label: "FORWARD", value: "FORWARD" },
                { label: "REVERSE", value: "REVERSE" },
              ]}
              placeholder="Delivery Type"
              allowClear
            />
            {/* Created Date */}
            <DatePicker.RangePicker placeholder={"Created Date"} />
          </div>
          <Table bordered size="small" columns={columns} />
        </div>
      </ResponsiveCard>
    </PageLayout>
  );
}
