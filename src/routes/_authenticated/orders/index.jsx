import PageLayout from "@/components/layout/PageLayout";
import AWSImage from "@/components/ui/AWSImage";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import ErrorFallback from "@/components/ui/ErrorFallback";
import ResponsiveTable from "@/components/ui/tables/ResponsiveTable";
import UrlPagination from "@/components/ui/UrlPagination";
import { useGetOrders } from "@/features/orders/orders.query";
import { downloadWaybill } from "@/features/orders/orders.service";
import { usePdfHandler } from "@/hooks/usePdfHandler";
import { getSerialNumber } from "@/utils/serialNumber.util";
import { getStatusColor, removeUnderscores } from "@/utils/typography.util";
import { validatePagination } from "@/utils/validatePagination.util";
import { DownloadOutlined } from "@ant-design/icons";
import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { Tag, Button } from "antd";
import { useState } from "react";

export const Route = createFileRoute("/_authenticated/orders/")({
  component: RouteComponent,
  validateSearch: validatePagination,
});

function RouteComponent() {
  const { page, limit } = useSearch({ strict: false });
  const { data, isLoading, isError, error } = useGetOrders({ page, limit });
  const { processPdf, isProcessing } = usePdfHandler();
  const [loadingKey, setLoadingKey] = useState(null);

  const handleWaybill = async (id) => {
    try {
      setLoadingKey(id);

      await processPdf({
        pdfPromise: () => downloadWaybill(id),
        print: true,
        fileName: `waybill-${id}.pdf`,
        successMessage: "Waybill processed successfully",
      });
    } finally {
      setLoadingKey(null);
    }
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
      title: "Total (₹)",
      dataIndex: "total_amount",
      key: "total_amount",
    },
    {
      title: "Carrier Partner",
      dataIndex: "courier_partner",
      key: "courier_partner",
      render: (partner) => {
        return partner ? (
          <div className="flex gap-2 items-center">
            <AWSImage mode="avatar" size={30} s3Key={partner?.logo} />
            <span>{partner?.name}</span>
          </div>
        ) : (
          "N/A"
        );
      },
    },
    {
      title: "Order Status",
      dataIndex: "order_status",
      key: "order_status",
      render: (text) => {
        return (
          <Tag className="text-[10px]!" color={getStatusColor(text)}>
            {removeUnderscores(text)}
          </Tag>
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
          <Tag className="text-[10px]!" color={getStatusColor(text)}>
            {removeUnderscores(text)}
          </Tag>
        );
      },
      fixed: "right",
    },
    // {
    //   title: "Lifecycle Status",
    //   dataIndex: "lifecycle_status",
    //   key: "lifecycle_status",
    //   render: (text) => {
    //     return (
    //       <Tag className="text-[10px]!" color={getStatusColor(text)}>
    //         {removeUnderscores(text)}
    //       </Tag>
    //     );
    //   },
    //   fixed: "right",
    // },

    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-2">
          <Button
            loading={loadingKey === record.id && isProcessing}
            disabled={loadingKey === record.id && isProcessing}
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
