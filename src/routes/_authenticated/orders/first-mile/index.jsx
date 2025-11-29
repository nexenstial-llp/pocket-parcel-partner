import PageLayout from "@/components/layout/PageLayout";
import CancelOrderModal from "@/components/pages/orders/quick/CancelOrderModal";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import ErrorFallback from "@/components/ui/ErrorFallback";
import UrlPagination from "@/components/ui/UrlPagination";

import {
  useCreateReverseOrder,
  useGetAllQwqerOrders,
} from "@/features/orders/orders.query";
import { truncateText } from "@/utils/typography.util";
import { EyeFilled } from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { message } from "antd";
import { Tag } from "antd";
import { Modal } from "antd";
import { Button, Table } from "antd";
import { useState } from "react";
import { GiCancel, GiReturnArrow } from "react-icons/gi";
import { MdEdit } from "react-icons/md";
const statusColorMapping = {
  pending: "blue",
  assigned: "orange",
  in_transit: "orange",
  delivered: "green",
  cancelled: "red",
};
import z from "zod";
const searchSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
});
export const Route = createFileRoute("/_authenticated/orders/first-mile/")({
  component: RouteComponent,
  validateSearch: (search) =>
    searchSchema.parse({
      page: search.page,
      limit: search.limit,
    }),
});

const initialCancelOrderState = {
  open: false,
  order_key: null,
};

function RouteComponent() {
  const { page, limit } = useSearch({ strict: false });
  const [CancelOrderModalData, setCancelOrderModalData] = useState(
    initialCancelOrderState
  );

  const queryClient = useQueryClient();

  const handleCancelOrder = (order_key) => {
    setCancelOrderModalData({ open: true, order_key });
  };

  const { data, isLoading, isError, error } = useGetAllQwqerOrders({
    page,
    limit,
  });

  // Create reverse order
  const { mutate: reverseOrderMutate, isPending: isReverseOrderPending } =
    useCreateReverseOrder({
      onSuccess: async () => {
        message.success("Created the reverse order successfully");
        await queryClient.invalidateQueries({
          queryKey: ["first-mile-orders"],
        });
      },
    });

  const handleCreateReverseOrder = (order_key) => {
    Modal.confirm({
      title: "Would you like to create a reverse order?",
      content:
        "The create action will be permanent, and there will be no option to undo or reverse it.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => {
        reverseOrderMutate({ order_key });
      },
      okButtonProps: {
        loading: isReverseOrderPending,
      },
      cancelButtonProps: {
        loading: isReverseOrderPending,
      },
      maskClosable: false,
    });
  };
  const columns = [
    {
      title: "S.No.",
      dataIndex: "sno",
      key: "sno",
      render: (_, record, index) => {
        return <span>{(page - 1) * limit + index + 1}</span>;
      },
    },
    // From Name
    {
      title: "From Name",
      dataIndex: "from_name",
      key: "from_name",
    },
    // From Address
    {
      title: "From Address",
      dataIndex: "from_address",
      key: "from_address",
      render: (text) => <span title={text}>{truncateText(text, 30)}</span>,
    },
    // To Name
    {
      title: "To Name",
      dataIndex: "to_name",
      key: "to_name",
    },
    // To Address
    {
      title: "To Address",
      dataIndex: "to_address",
      key: "to_address",
      render: (text) => <span title={text}>{truncateText(text, 30)}</span>,
    },
    // Weight
    {
      title: "Weight",
      dataIndex: "weight",
      key: "weight",
    },
    // Status
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag className="uppercase" color={statusColorMapping[status]}>
          {status}
        </Tag>
      ),
      fixed: "right",
    },
    {
      title: "Action",
      fixed: "right",
      render: (_, record) => (
        <div className="flex gap-2">
          <Link to={`/orders/first-mile/${record.order_key}`}>
            <Button icon={<EyeFilled />} type="link" size="small">
              View
            </Button>
          </Link>

          {record?.status != "cancelled" && (
            <>
              <Link to={`/orders/first-mile/${record.order_key}/edit`}>
                <Button icon={<MdEdit />} type="link" size="small">
                  Edit
                </Button>
              </Link>
              <Button
                title="cancel"
                type="primary"
                danger
                icon={<GiCancel />}
                size="small"
                onClick={() => handleCancelOrder(record?.order_key)}
              >
                Cancel
              </Button>
              <Button
                title="Reverse Order"
                type="primary"
                icon={<GiReturnArrow />}
                size="small"
                onClick={() => handleCreateReverseOrder(record?.order_key)}
              >
                Reverse Order
              </Button>
            </>
          )}
        </div>
      ),
    },
  ];
  if (isError) {
    return <ErrorFallback error={error} />;
  }
  return (
    <PageLayout
      items={[
        { title: "Home", href: "/home" },
        { title: "Orders", href: "/orders" },
        { title: "First Mile Orders" },
      ]}
    >
      <CancelOrderModal
        open={CancelOrderModalData.open}
        onCancel={() => setCancelOrderModalData(initialCancelOrderState)}
        order_key={CancelOrderModalData.order_key}
      />
      <ResponsiveCard
        size="small"
        extra={
          <Link to="/orders/first-mile/create">
            <Button type="primary" size="small">
              Create
            </Button>
          </Link>
        }
        title="First Mile Orders"
      >
        <Table
          loading={isLoading}
          bordered
          size="small"
          columns={columns}
          dataSource={data?.orders}
          pagination={false}
          scroll={{ x: "max-content" }}
          rowKey={"id"}
        />

        <UrlPagination total={data?.pagination?.totalItems} />
      </ResponsiveCard>
    </PageLayout>
  );
}
