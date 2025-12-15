import PageLayout from "@/components/layout/PageLayout";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import ErrorFallback from "@/components/ui/ErrorFallback";
import ResponsiveTable from "@/components/ui/tables/ResponsiveTable";
import { useDeleteRack, useFetchRacks } from "@/features/racks/racks.query";
import { getSerialNumber } from "@/utils/serialNumber.util";
import { validatePagination } from "@/utils/validatePagination.util";
import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { Modal } from "antd";
import { message } from "antd";
import { Button, Tag } from "antd";
import { useCallback } from "react";
import { useMemo } from "react";

export const Route = createFileRoute("/_authenticated/rack/")({
  component: RouteComponent,
  validateSearch: validatePagination,
});

function RouteComponent() {
  const { page, limit } = useSearch({ strict: false });
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error } = useFetchRacks({ page, limit });
  const { mutate: deleteMutate, isPending: isDeletePending } = useDeleteRack({
    onSuccess: async () => {
      message.success("Rack deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["racks"] });
    },
  });
  const handleDelete = useCallback(
    (id) => {
      Modal.confirm({
        title: "Delete Rack",
        content: "Are you sure you want to delete this rack?",
        okText: "Yes",
        okType: "danger",
        onOk: () => {
          deleteMutate(id);
        },
      });
    },
    [deleteMutate]
  );
  const columns = useMemo(
    () => [
      {
        title: "S. No.",
        render: (_, __, index) => getSerialNumber({ page, limit, index }),
      },
      {
        title: "Rack Code",
        dataIndex: "rack_code",
      },
      {
        title: "Rack Name",
        dataIndex: "rack_name",
      },
      {
        title: "Location",
        dataIndex: "location",
      },
      {
        title: "Zone",
        dataIndex: "zone",
      },
      {
        title: "Capacity",
        dataIndex: "capacity",
      },
      {
        title: "Max Weight",
        dataIndex: "max_weight",
      },
      {
        title: "Status",
        dataIndex: "is_active",
        fixed: "right",
        render: (status) => (
          <Tag color={status ? "green" : "red"}>
            {status ? "Active" : "Inactive"}
          </Tag>
        ),
      },
      {
        title: "Actions",
        fixed: "right",
        render: (_, record) => (
          <div className="flex gap-2">
            <Link to={`${record.id}`}>
              <Button size="small" type="link">
                View
              </Button>
            </Link>
            <Link to={`${record.id}/edit`}>
              <Button size="small" type="link">
                Edit
              </Button>
            </Link>
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
    ],
    [page, limit, handleDelete]
  );

  if (isError) {
    return <ErrorFallback error={error} />;
  }
  return (
    <PageLayout items={[{ title: "Home", href: "/home" }, { title: "Rack" }]}>
      <ResponsiveCard
        title="Rack"
        extra={
          <Link to="create">
            <Button type="primary">Add Rack</Button>
          </Link>
        }
      >
        <ResponsiveTable
          loading={isLoading || isDeletePending}
          columns={columns}
          data={data?.data || []}
        />
      </ResponsiveCard>
    </PageLayout>
  );
}
