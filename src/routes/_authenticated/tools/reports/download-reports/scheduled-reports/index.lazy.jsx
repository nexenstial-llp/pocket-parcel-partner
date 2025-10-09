import ResponsiveTable from "@/components/ui/tables/ResponsiveTable";
import { createLazyFileRoute } from "@tanstack/react-router";
import { Select } from "antd";
const scheduleReportsColumn = [
  { title: "Report Type", dataIndex: "report_type", key: "report_type" },
  { title: "Sent Via", dataIndex: "sent_via", key: "sent_via" },
  { title: "Sent To", dataIndex: "sent_to", key: "sent_to" },
  {
    title: "Report Date Range",
    dataIndex: "report_date_range",
    key: "report_date_range",
  },
  {
    title: "Report Sent On",
    dataIndex: "report_sent_on",
    key: "report_sent_on",
  },
  { title: "Size", dataIndex: "size", key: "size" },
  { title: "Frequency", dataIndex: "frequency", key: "frequency" },
  { title: "ACtion", dataIndex: "action", key: "action" },
];
export const Route = createLazyFileRoute(
  "/_authenticated/tools/reports/download-reports/scheduled-reports/"
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="mt-10">
      <div className="flex gap-4 mb-6">
        <Select
          defaultValue="last30"
          style={{ width: 200 }}
          options={[
            { value: "today", label: "Today" },
            { value: "yesterday", label: "Yesterday" },
            { value: "last7", label: "Last 7 days" },
            { value: "last30", label: "Last 30 days" },
            { value: "thisMonth", label: "This Month" },
            { value: "lastMonth", label: "Last Month" },
          ]}
        />
        <Select
          defaultValue="sales"
          style={{ width: 200 }}
          options={[
            { value: "orders", label: "Orders" },
            { value: "sales", label: "Sales" },
            { value: "inventory", label: "Inventory" },
          ]}
        />
        <Select
          defaultValue="allTypes"
          style={{ width: 200 }}
          options={[
            { value: "allTypes", label: "All Report Types" },
            { value: "ndrReport", label: "NDR Report" },
            { value: "remittanceReport", label: "Remittance Report" },
            { value: "rtoOfdReport", label: "RTO OFD Report" },
          ]}
        />
      </div>

      <div className="overflow-x-auto">
        <ResponsiveTable
          columns={scheduleReportsColumn}
          dataSource={[]}
          className="min-w-[700px]"
          pagination={{
            total: 0,
            pageSize: 15,
            showSizeChanger: true,
            showTotal: (total) => `${total} items`,
          }}
        />
      </div>
    </div>
  );
}
