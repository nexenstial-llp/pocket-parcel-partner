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
import { DownloadOutlined, SearchOutlined } from "@ant-design/icons";
import {
  createFileRoute,
  Link,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";
import { Space } from "antd";
import { Tag, Button, Input } from "antd";
import { useState } from "react";

// Define your route with the updated validator
export const Route = createFileRoute("/_authenticated/orders/")({
  component: RouteComponent,
  validateSearch: (search) => ({
    page: Number(search?.page) || 1,
    limit: Number(search?.limit) || 10,

    search: search?.search?.trim() || undefined,
    order_number: search?.order_number || undefined,
    reference_number: search?.reference_number || undefined,

    status: search?.status || undefined,
    lifecycle_status: search?.lifecycle_status || undefined,
    payment_status: search?.payment_status || undefined,
    customer_phone: search?.customer_phone || undefined,

    order_type: search?.order_type || undefined,
    payment_mode: search?.payment_mode || undefined,
    direction: search?.direction || undefined,

    courier_partner: search?.courier_partner || undefined,

    sort_by: search?.sort_by,
    sort_order: search?.sort_order,
  }),
});

const getColumnSearchProps = (dataIndex, placeholder) => ({
  filterDropdown: ({
    setSelectedKeys,
    selectedKeys,
    confirm,
    clearFilters,
  }) => (
    <div style={{ padding: 8 }}>
      <Input
        placeholder={placeholder}
        value={selectedKeys[0]}
        onChange={(e) =>
          setSelectedKeys(e.target.value ? [e.target.value] : [])
        }
        onPressEnter={() => confirm()}
        style={{ marginBottom: 8, display: "block" }}
      />
      <Space>
        <Button
          type="primary"
          size="small"
          onClick={() => confirm()}
          icon={<SearchOutlined />}
        >
          Search
        </Button>
        <Button
          size="small"
          onClick={() => {
            clearFilters();
            confirm();
          }}
        >
          Reset
        </Button>
      </Space>
    </div>
  ),
  filterIcon: (filtered) => (
    <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
  ),
});

function RouteComponent() {
  const searchParams = useSearch({ strict: false });
  const navigate = useNavigate();
  const {
    page,
    limit,
    search,
    status,
    payment_status,
    // order_type,
    sort_by,
    sort_order,
  } = searchParams;

  // Pass all params to the query hook
  const { data, isLoading, isError, error } = useGetOrders(searchParams);

  const { processPdf, isProcessing } = usePdfHandler();
  const [loadingKey, setLoadingKey] = useState(null);

  // Helper to update filters in URL
  const handleTableChange = (_, filters, sorter) => {
    navigate({
      search: (prev) => ({
        ...prev,
        page: 1,
        status: filters.order_status?.[0],
        lifecycle_status: filters.lifecycle_status?.[0],
        payment_status: filters.payment_status?.[0],
        order_type: filters.order_type?.[0],
        payment_mode: filters.payment_mode?.[0],
        direction: filters.direction?.[0],
        courier_partner: filters.courier_partner?.[0],
        order_number: filters.order_number?.[0],
        reference_number: filters.reference_number?.[0],
        customer_phone: filters.customer_phone?.[0],
        customer_email: filters.customer_email?.[0],
        sort_by: sorter?.field || "created_at",
        sort_order:
          sorter?.order === "ascend"
            ? "asc"
            : sorter?.order === "descend"
            ? "desc"
            : "desc",
      }),
    });
  };

  // General Search Handler
  const onSearch = (field, value) => {
    navigate({
      search: (prev) => ({ ...prev, [field]: value || undefined, page: 1 }),
    });
  };

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
      width: 60,
      render: (_, record, index) => getSerialNumber({ page, limit, index }),
    },
    {
      title: "Order Number",
      dataIndex: "order_number",
      key: "order_number",
      ...getColumnSearchProps("order_number", "Search Order No"),

      filteredValue: searchParams.order_number
        ? [searchParams.order_number]
        : null,
    },
    // Phone
    {
      title: "Customer Phone",
      dataIndex: ["customer_original_pickup_address", "pickup_phone"],
      key: "customer_phone",
      render: (_, record) =>
        record?.customer_original_pickup_address?.pickup_phone ?? "—",

      // ...getColumnSearchProps("customer_phone", "Search Phone"),

      // filteredValue: searchParams.customer_phone
      //   ? [searchParams.customer_phone]
      //   : null,
    },
    // {
    //   title: "Order Type",
    //   dataIndex: "order_type",
    //   key: "order_type",
    //   filters: [
    //     { text: "Forward", value: "FORWARD" },
    //     { text: "Reverse", value: "REVERSE" },
    //   ],
    //   filteredValue: order_type ? [order_type] : null,
    //   filterMultiple: false,
    // },
    {
      title: "Total (₹)",
      dataIndex: "total_amount",
      key: "total_amount",
      render: (text) => <span className="font-bold">{text}</span>,
      sorter: true, // IMPORTANT
      sortOrder:
        sort_by === "total_amount"
          ? sort_order === "asc"
            ? "ascend"
            : "descend"
          : null,
    },

    {
      title: "Carrier Partner",
      dataIndex: "courier_partner",
      key: "courier_partner",
      render: (partner) =>
        partner ? (
          <div className="flex gap-2 items-center">
            <AWSImage mode="avatar" size={30} s3Key={partner?.logo} />
            <span>{partner?.name}</span>
          </div>
        ) : (
          "N/A"
        ),
    },
    {
      title: "Order Status",
      dataIndex: "order_status",
      key: "order_status",
      filters: [
        { text: "PENDING PAYMENT", value: "PENDING_PAYMENT" },
        { text: "PAYMENT FAILED", value: "PAYMENT_FAILED" },
        { text: "PROCESSING", value: "PROCESSING" },
        { text: "PICKUP SCHEDULED", value: "PICKUP_SCHEDULED" },
        { text: "PICKUP PENDING", value: "PICKUP_PENDING" },
        { text: "PICKED UP", value: "PICKED_UP" },
        { text: "IN TRANSIT", value: "IN_TRANSIT" },
        { text: "OUT_FOR DELIVERY", value: "OUT_FOR_DELIVERY" },
        { text: "DELIVERED", value: "DELIVERED" },
        { text: "DELIVERY FAILED", value: "DELIVERY_FAILED" },
        { text: "RTO INITIATED", value: "RTO_INITIATED" },
        { text: "RTO IN TRANSIT", value: "RTO_IN_TRANSIT" },
        { text: "RTO DELIVERED", value: "RTO_DELIVERED" },
        { text: "CANCELLED", value: "CANCELLED" },
        { text: "LOST", value: "LOST" },
        { text: "DAMAGED", value: "DAMAGED" },
      ],
      filteredValue: status ? [status] : null,
      filterMultiple: false, // API seems to take single status, set true if array supported
      render: (text) => (
        <Tag className="text-[10px]!" color={getStatusColor(text)}>
          {removeUnderscores(text)}
        </Tag>
      ),
      fixed: "right",
    },
    {
      title: "Payment Status",
      dataIndex: "payment_status",
      key: "payment_status",
      filters: [
        { text: "Pending", value: "PENDING" },
        { text: "Completed", value: "COMPLETED" },
        { text: "Failed", value: "FAILED" },
      ],
      filteredValue: payment_status ? [payment_status] : null,
      filterMultiple: false,
      render: (text) => (
        <Tag className="text-[10px]!" color={getStatusColor(text)}>
          {removeUnderscores(text)}
        </Tag>
      ),
      fixed: "right",
    },
    {
      title: "Lifecycle",
      dataIndex: "lifecycle_status",
      key: "lifecycle_status",
      filters: [
        { text: "PENDING", value: "PENDING" },
        { text: "RECEIVED", value: "RECEIVED" },
        { text: "PACKED", value: "PACKED" },
        { text: "IN TRANSIT", value: "IN_TRANSIT" },
        { text: "DELIVERED", value: "DELIVERED" },
      ],
      filteredValue: searchParams.lifecycle_status
        ? [searchParams.lifecycle_status]
        : null,
      filterMultiple: false,
      render: (text) => (
        <Tag className="text-[10px]!" color={getStatusColor(text)}>
          {removeUnderscores(text)}
        </Tag>
      ),
    },
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
          <div className="flex gap-2">
            {/* <Input.Search
              placeholder="Search Carrier Partner..."
              onSearch={(value) => onSearch("courier_partner", value)}
              defaultValue={search}
              allowClear
              style={{ width: 250 }}
            /> */}
            <Input.Search
              placeholder="Search orders..."
              onSearch={(value) => onSearch("search", value)}
              defaultValue={search}
              allowClear
              style={{ width: 250 }}
            />
            <Link to="/orders/create">
              <Button type="primary">Create</Button>
            </Link>
          </div>
        }
        title="Orders"
      >
        <div className="flex flex-col gap-2">
          <ResponsiveTable
            size={"small"}
            loading={isLoading}
            columns={columns}
            dataSource={data?.orders}
            pagination={false} // We use UrlPagination, so disable internal table pagination
            onChange={handleTableChange} // Captures filter changes
          />
          <UrlPagination total={data?.pagination?.totalItems} />
        </div>
      </ResponsiveCard>
    </PageLayout>
  );
}
