import PageLayout from "@/components/layout/PageLayout";
import FilterCard from "@/components/pages/ndr/FilterCard";
import SearchPanelCard from "@/components/ui/cards/SearchPanelCard";
import { createFileRoute } from "@tanstack/react-router";
import { Button, Table } from "antd";

export const Route = createFileRoute("/_authenticated/ndr/cases/")({
  component: RouteComponent,
});
const columns = [
  {
    title: "No.",
    dataIndex: "no",
    key: "no",
  },
  {
    title: "AWB",
    dataIndex: "awb",
    key: "awb",
  },
  {
    title: "Carrier",
    dataIndex: "cp",
    key: "cp",
  },
  {
    title: "NDR Reason",
    dataIndex: "ndr_reason",
    key: "ndr_reason",
  },
  {
    title: "Phone No",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Attempts",
    dataIndex: "attempts",
    key: "attempts",
  },
  {
    title: "Follow Ups",
    dataIndex: "follow_ups",
    key: "follow_ups",
  },
  {
    title: "Customer Feedback",
    dataIndex: "customer_feedback",
    key: "customer_feedback",
  },
  {
    title: "Current Status",
    dataIndex: "current_status",
    key: "current_status",
  },
  {
    title: "Action",
    render: () => {
      return (
        <div className="flex gap-2">
          <Button size="small">Edit</Button>
          <Button size="small">Delete</Button>
        </div>
      );
    },
  },
];
function RouteComponent() {
  return (
    <PageLayout>
      {/* 🔍 Search Bar */}
      <SearchPanelCard
        searchTypeOptions={[
          { label: "AWB", value: "AWB" },
          { label: "Order ID", value: "order_id" },
        ]}
        extraButtons={[
          <Button key="GenerateReport" size="small" type="primary">
            Generate Report
          </Button>,
          <Button key="ReportStatus" size="small">
            Report Status
          </Button>,
        ]}
      />

      {/* ⚙️ Filter Section */}
      <FilterCard />
      <Table columns={columns} dataSource={[]} />
    </PageLayout>
  );
}
