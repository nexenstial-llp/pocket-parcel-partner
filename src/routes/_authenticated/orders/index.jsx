import PageLayout from "@/components/layout/PageLayout";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import ErrorFallback from "@/components/ui/ErrorFallback";
import ResponsiveTable from "@/components/ui/tables/ResponsiveTable";
import UrlPagination from "@/components/ui/UrlPagination";
import { useGetOrders } from "@/features/orders/orders.query";
import {
  downloadInvoice,
  downloadWaybill,
} from "@/features/orders/orders.service";
import { usePdfHandler } from "@/hooks/usePdfHandler";
import { getSerialNumber } from "@/utils/serialNumber.util";
import { getStatusColor, removeUnderscores } from "@/utils/typography.util";
import { validatePagination } from "@/utils/validatePagination.util";
import { DownloadOutlined } from "@ant-design/icons";
import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { Tag } from "antd";
import { Button } from "antd";

export const Route = createFileRoute("/_authenticated/orders/")({
  component: RouteComponent,
  validateSearch: validatePagination,
});

function RouteComponent() {
  const { page, limit } = useSearch({ strict: false });
  const { data, isLoading, isError, error } = useGetOrders({ page, limit });
  const { processPdf, isProcessing } = usePdfHandler();

  const handleWaybill = async (id) => {
    const blob = await downloadWaybill(id);

    processPdf({
      blob,
      print: true,
      fileName: `waybill-${id}.pdf`,
      successMessage: "Waybill processed successfully",
    });
  };

  const handleInvoice = async (id) => {
    const blob = await downloadInvoice(id);

    processPdf({
      blob,
      print: true,
      fileName: `invoice-${id}.pdf`,
      successMessage: "Invoice processed successfully",
    });
  };

  const columns = [
    {
      title: "S. No",
      render: (_, record, index) => getSerialNumber({ page, limit, index }),
    },
    {
      title: "Reference Number",
      dataIndex: "reference_number",
      key: "reference_number",
    },
    {
      title: "Order Number",
      dataIndex: "order_number",
      key: "order_number",
    },
    {
      title: "Order Type",
      dataIndex: "order_type",
      key: "order_type",
    },
    {
      title: "Total Amount",
      dataIndex: "total_amount",
      key: "total_amount",
    },
    {
      title: "Payment Mode",
      dataIndex: "payment_mode",
      key: "payment_mode",
    },
    {
      title: "Order Status",
      dataIndex: "order_status",
      key: "order_status",
      render: (text) => {
        return (
          <Tag color={getStatusColor(text)}>{removeUnderscores(text)}</Tag>
        );
      },
      fixed: "right",
    },
    {
      title: "Payment Status",
      dataIndex: "payment_status",
      key: "payment_status",
      render: (text) => {
        return (
          <Tag color={getStatusColor(text)}>{removeUnderscores(text)}</Tag>
        );
      },
      fixed: "right",
    },
    {
      title: "Life Cycle Status",
      dataIndex: "lifecycle_status",
      key: "lifecycle_status",
      render: (text) => {
        return (
          <Tag color={getStatusColor(text)}>{removeUnderscores(text)}</Tag>
        );
      },
      fixed: "right",
    },

    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-2">
          {/* <Button
            onClick={() => handleInvoice(record.id)}
            icon={<DownloadOutlined />}
            type="primary"
            size="small"
          >
            Invoice
          </Button> */}
          <Button
            loading={isProcessing}
            onClick={() => handleWaybill(record.id)}
            icon={<DownloadOutlined />}
            type="primary"
            size="small"
          >
            Invoice
          </Button>
          <Link to={`/orders/${record.id}`}>View</Link>
        </div>
      ),
      fixed: "right",
    },
  ];

  if (isError) {
    return <ErrorFallback error={error} />;
  }
  return (
    <PageLayout items={[{ title: "Home", href: "/home" }, { title: "Orders" }]}>
      {/* <SearchPanelCard
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
      /> */}
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
          {/* <div className="flex gap-2 items-center overflow-x-auto">
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
            <Select
              options={[
                { label: "FORWARD", value: "FORWARD" },
                { label: "REVERSE", value: "REVERSE" },
              ]}
              placeholder="Delivery Type"
              allowClear
            />
            <DatePicker.RangePicker placeholder={"Created Date"} />
          </div> */}
          <ResponsiveTable
            size={"small"}
            loading={isLoading}
            columns={columns}
            dataSource={data?.orders}
          />
          <UrlPagination total={data?.pagination?.totalItems} />
        </div>
      </ResponsiveCard>
    </PageLayout>
  );
}
