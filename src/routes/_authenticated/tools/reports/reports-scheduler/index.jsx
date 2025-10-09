import ScheduleReportsDrawer from "@/components/pages/tools/reports/drawer/ScheduleReportsDrawer";
import ResponsiveTable from "@/components/ui/tables/ResponsiveTable";
import {
  createFileRoute,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";
import { Button, Drawer, Select, Switch, Tabs } from "antd";
import { useEffect, useState } from "react";

const columns = [
  {
    title: "Report Type",
    dataIndex: "report_type",
    key: "report_type",
  },
  {
    title: "Sent Via",
    dataIndex: "sent_via",
    key: "sent_via",
  },
  {
    title: "Sent TO",
    dataIndex: "sent_to",
    key: "sent_to",
  },
  {
    title: "Frequency",
    dataIndex: "frequency",
    key: "frequency",
    render: (_, record) => {
      return (
        <div className=" bg-gray-200 rounded-md w-fit px-4 py-1 text-gray-500 ">
          {record.frequency}
        </div>
      );
    },
  },

  {
    title: "Action",
    key: "action",
    render: () => <Switch defaultChecked />,
  },
];
const dataSource = [
  {
    report_type: "Remittance Report",
    sent_via: "Email",
    sent_to: "vikas@gmail.com",
    frequency: "Daily",
  },
];

export const Route = createFileRoute(
  "/_authenticated/tools/reports/reports-scheduler/"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(dataSource);
  const navigate = useNavigate();
  const searchParams = useSearch({
    from: Route.fullPath,
  });
  const [filters, setFilters] = useState({
    dateRange: searchParams.dateRange || "last30",
    module: searchParams.module || "allModules",
    reportType: searchParams.reportType || "allTypes",
  });
  const handleFilterChange = (key, value) => {
    const updatedSearchParams = { ...searchParams, [key]: value };
    setFilters((prev) => ({ ...prev, [key]: value }));
    navigate({ search: updatedSearchParams });
  };
  useEffect(() => {
    setFilters(searchParams);
  }, [searchParams?.dateRange, searchParams?.module, searchParams?.reportType]);
  useEffect(() => {
    const updatedParams = {};
    if (!searchParams?.dateRange) {
      updatedParams.dateRange = "last30";
    }
    if (!searchParams?.module) {
      updatedParams.module = "allModules";
    }
    if (!searchParams?.reportType) {
      updatedParams.reportType = "allTypes";
    }
    navigate({ search: { ...searchParams, ...updatedParams } });
  }, []);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <div className="mt-10">
      <div className="flex gap-4 justify-between items-center">
        <div className="flex gap-4 mb-6">
          <Select
            size="large"
            style={{ width: 200 }}
            onChange={(value) => handleFilterChange("type", value)}
            value={filters?.dateRange}
            options={[
              { value: "allReportType", label: "All Report Type" },
              { value: "ndrReport", label: "NDR Report" },
              { value: "remittanceReport", label: "Remittance Report" },
              { value: "rtoOfdReport", label: "RTO OFD Report" },
              {
                value: "shipmentSummaryReport",
                label: "Shipment Summary Report",
              },
              {
                value: "weightDiscrepancyReport",
                label: "Weight Discrepancy Report",
              },
            ]}
          />
          <Select
            size="large"
            style={{ width: 200 }}
            onChange={(value) => handleFilterChange("medium", value)}
            value={filters?.module}
            options={[
              { value: "email", label: "EMail" },
              { value: "webHook", label: "Web Hook" },
              { value: "whatsapp", label: "Whatsapp" },
            ]}
          />
          <Select
            size="large"
            style={{ width: 200 }}
            onChange={(value) => handleFilterChange("frequency", value)}
            value={filters?.reportType}
            options={[
              { value: "daily", label: "Daily" },
              { value: "monthly", label: "Monthly" },
              { value: "weekly", label: "Weekly" },
            ]}
          />
        </div>
        <Button size="large" type="primary" onClick={showDrawer}>
          Schedule Report
        </Button>
      </div>

      <ResponsiveTable
        columns={columns}
        dataSource={data}
        pagination={{
          total: 0,
          pageSize: 15,
          showSizeChanger: true,
          showTotal: (total) => `${total} items`,
        }}
      />
      <ScheduleReportsDrawer onClose={onClose} open={open} setData={setData} />
    </div>
  );
}
