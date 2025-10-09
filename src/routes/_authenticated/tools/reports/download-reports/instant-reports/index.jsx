import ResponsiveTable from "@/components/ui/tables/ResponsiveTable";
import {
  createFileRoute,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";
import { Button, Select } from "antd";
import { useEffect, useState } from "react";
import { FaFileDownload } from "react-icons/fa";

const columns = [
  {
    title: "Module",
    dataIndex: "module",
    key: "module",
  },
  {
    title: "Report Type",
    dataIndex: "reportType",
    key: "reportType",
  },
  {
    title: "User",
    dataIndex: "user",
    key: "user",
  },
  {
    title: "Report Date Range",
    dataIndex: "dateRange",
    key: "dateRange",
  },
  {
    title: "Report Generated On",
    dataIndex: "generatedOn",
    key: "generatedOn",
  },
  {
    title: "Size",
    dataIndex: "size",
    key: "size",
  },
  {
    title: "Action",
    key: "action",
    render: () => (
      <Button type="link" icon={<FaFileDownload />}>
        Download
      </Button>
    ),
  },
];
export const Route = createFileRoute(
  "/_authenticated/tools/reports/download-reports/instant-reports/"
)({
  component: RouteComponent,
});

function RouteComponent() {
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
  return (
    <div className="mt-10">
      <div className="flex gap-4 mb-6">
        <Select
          style={{ width: 200 }}
          onChange={(value) => handleFilterChange("dateRange", value)}
          value={filters?.dateRange}
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
          style={{ width: 200 }}
          onChange={(value) => handleFilterChange("module", value)}
          value={filters?.module}
          options={[
            { value: "allModules", label: "All Modules" },
            { value: "sales", label: "Sales" },
            { value: "inventory", label: "Inventory" },
          ]}
        />
        <Select
          style={{ width: 200 }}
          onChange={(value) => handleFilterChange("reportType", value)}
          value={filters?.reportType}
          options={[
            { value: "allTypes", label: "All Report Types" },
            { value: "daily", label: "Daily Reports" },
            { value: "weekly", label: "Weekly Reports" },
          ]}
        />
      </div>

      <ResponsiveTable
        columns={columns}
        dataSource={[]}
        pagination={{
          total: 0,
          pageSize: 15,
          showSizeChanger: true,
          showTotal: (total) => `${total} items`,
        }}
      />
    </div>
  );
}
