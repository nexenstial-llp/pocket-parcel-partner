import PageLayout from "@/components/layout/PageLayout";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import ErrorFallback from "@/components/ui/ErrorFallback";
import UrlPagination from "@/components/ui/UrlPagination";
import {
  useDeleteAddress,
  useGetAllAddresses,
} from "@/features/address-management/address-management.query";
import { validatePagination } from "@/utils/validatePagination.util";
import { DeleteOutlined, EyeFilled } from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { createFileRoute, useSearch } from "@tanstack/react-router";
import { Button, Table, Modal, message } from "antd";
import { useCallback, useMemo } from "react";
import { MdModeEditOutline } from "react-icons/md";

export const Route = createFileRoute("/_authenticated/address-management/")({
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
      onSuccess: async () => {
        message.success("Address deleted successfully");
        await queryClient.invalidateQueries({ queryKey: ["addresses"] });
      },
    }
  );

  const handleDelete = useCallback(
    (id) => {
      Modal.confirm({
        title: "Would you like to delete this address?",
        content:
          "The delete action will be permanent, and there will be no option to undo or reverse it.",
        okText: "Yes",
        okType: "danger",
        cancelText: "No",
        onOk: () => deleteMutate(id),
      });
    },
    [deleteMutate]
  );
  const columns = useMemo(
    () => [
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
            <Link to={`${record.id}/edit`}>
              <Button
                icon={<MdModeEditOutline />}
                size="small"
                type="primary"
                title="Edit"
              />
            </Link>
            <Link to={`${record?.id}`}>
              <Button
                icon={<EyeFilled />}
                size="small"
                title="View"
                type="primary"
              />
            </Link>
            <Button
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record?.id)}
              size="small"
              type="primary"
              danger
              title="Delete"
            />
          </div>
        ),
      },
    ],
    [limit, page, handleDelete]
  );

  if (isError) {
    return <ErrorFallback error={error} />;
  }
  return (
    <PageLayout
      items={[
        { title: "Home", link: "/home" },
        { title: "Address Management" },
      ]}
    >
      <ResponsiveCard
        loading={isLoading}
        title="Address Management"
        extra={
          <Link to="create">
            <Button type="primary">Add Address</Button>
          </Link>
        }
      >
        <Table
          sticky
          bordered
          size="small"
          dataSource={data?.data}
          pagination={false}
          columns={columns}
          scroll={{ x: "max-content" }}
          loading={isLoading || isDeleteLoading}
          rowKey={"id"}
        />

        <UrlPagination total={data?.pagination?.total} />
      </ResponsiveCard>
    </PageLayout>
  );
}
