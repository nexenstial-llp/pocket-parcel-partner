import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import ErrorFallback from "@/components/ui/ErrorFallback";
import UrlPagination from "@/components/ui/UrlPagination";
import {
  useDeleteAddress,
  useGetAllAddresses,
} from "@/features/address-management/address-management.query";
import { validatePagination } from "@/utils/validatePagination.util";
import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useSearch } from "@tanstack/react-router";
import { Modal } from "antd";
import { message } from "antd";
import { Button, Table } from "antd";

export const Route = createFileRoute(
  "/_authenticated/settings/address-management/"
)({
  component: RouteComponent,

  validateSearch: (search) => validatePagination(search),
});

function RouteComponent() {
  const { page, limit } = useSearch({ strict: false });
  const { data, isLoading, isError, error } = useGetAllAddresses({
    page,
    limit,
  });
  const queryClient = useQueryClient();
  const { mutate: deleteMutate, isLoading: isDeleteLoading } = useDeleteAddress(
    {
      onSuccess: () => {
        message.success("Address deleted successfully");
        queryClient.invalidateQueries({ queryKey: ["addresses"] });
      },
    }
  );

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Would you like to delete this address?",
      content:
        "The delete action will be permanent, and there will be no option to undo or reverse it.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => {
        deleteMutate(id);
      },
    });
  };
  const columns = [
    {
      title: "S.No.",
      render: (_, __, index) => page * limit - limit + index + 1,
    },
    {
      title: "Full Name",
      dataIndex: "full_name",
      key: "full_name",
    },
    {
      title: "Phone Number",
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Pincode",
      dataIndex: "pincode",
      key: "pincode",
    },
    {
      title: "Label",
      dataIndex: "label",
      key: "label",
    },
    {
      title: "Address Type",
      dataIndex: "address_type",
      key: "address_type",
    },
    {
      title: "Actions",
      render: (_, record) => (
        <div className="flex gap-2">
          <Button size="small" type="primary">
            Edit
          </Button>
          <Button
            onClick={() => handleDelete(record?.id)}
            size="small"
            type="primary"
            danger
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  if (isError) {
    return <ErrorFallback error={error} />;
  }
  return (
    <ResponsiveCard loading={isLoading} title="Address Management">
      <Table
        bordered
        size="small"
        dataSource={data?.data?.addresses}
        pagination={false}
        columns={columns}
        scroll={{ x: "max-content" }}
        loading={isLoading || isDeleteLoading}
      />

      <UrlPagination total={data?.data?.pagination?.total} />
    </ResponsiveCard>
  );
}
