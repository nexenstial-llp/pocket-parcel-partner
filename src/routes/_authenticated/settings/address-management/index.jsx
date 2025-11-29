import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import ErrorFallback from "@/components/ui/ErrorFallback";
import UrlPagination from "@/components/ui/UrlPagination";
import {
  useDeleteAddress,
  useGetAllAddresses,
} from "@/features/address-management/address-management.query";
import AddressDetailsDrawer from "@/features/address-management/components/AddressDetailsDrawer";
import AddressModal from "@/features/address-management/components/AddressModal";
import EditAddressModal from "@/features/address-management/components/EditAddressModal";
import { validatePagination } from "@/utils/validatePagination.util";
import { DeleteOutlined, EyeFilled } from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useSearch } from "@tanstack/react-router";
import { Modal } from "antd";
import { message } from "antd";
import { Button, Table } from "antd";
import { useCallback } from "react";
import { useMemo } from "react";
import { useState } from "react";
import { MdModeEditOutline } from "react-icons/md";

export const Route = createFileRoute(
  "/_authenticated/settings/address-management/"
)({
  component: RouteComponent,

  validateSearch: (search) => validatePagination(search),
});

function RouteComponent() {
  const [isModal, setIsModal] = useState({
    type: null,
    open: false,
    id: null,
  });
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
  // Memoize callbacks
  const handleOpenModal = useCallback((type, id) => {
    setIsModal({ type, open: true, id });
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModal({ type: null, open: false, id: null });
  }, []);

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
            <Button
              icon={<MdModeEditOutline />}
              onClick={() => handleOpenModal("edit", record?.id)}
              size="small"
              type="primary"
              title="Edit"
            />
            <Button
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record?.id)}
              size="small"
              type="primary"
              danger
              title="Delete"
            />
            <Button
              icon={<EyeFilled />}
              onClick={() => handleOpenModal("view", record?.id)}
              size="small"
              title="View"
              type="primary"
            />
          </div>
        ),
      },
    ],
    [handleDelete, handleOpenModal, limit, page]
  );

  if (isError) {
    return <ErrorFallback error={error} />;
  }
  return (
    <ResponsiveCard
      loading={isLoading}
      title="Address Management"
      extra={
        <Button type="primary" onClick={() => handleOpenModal("add", null)}>
          Add Address
        </Button>
      }
    >
      {isModal?.open && isModal?.type === "view" && (
        <AddressDetailsDrawer
          open={isModal?.open && isModal?.type === "view"}
          onClose={handleCloseModal}
          id={isModal?.id}
        />
      )}
      {isModal?.open && isModal?.type === "add" && (
        <AddressModal
          open={isModal?.open && isModal?.type === "add"}
          onClose={handleCloseModal}
        />
      )}
      {isModal?.open && isModal?.type === "edit" && (
        <EditAddressModal modalData={isModal} onClose={handleCloseModal} />
      )}
      <Table
        bordered
        size="small"
        dataSource={data?.data?.addresses}
        pagination={false}
        columns={columns}
        scroll={{ x: "max-content" }}
        loading={isLoading || isDeleteLoading}
        rowKey={"id"}
      />

      <UrlPagination total={data?.data?.pagination?.total} />
    </ResponsiveCard>
  );
}
