import PageLayout from "@/components/layout/PageLayout";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import ErrorFallback from "@/components/ui/ErrorFallback";
import UrlPagination from "@/components/ui/UrlPagination";
import { useFetchWarehouse } from "@/features/warehouses/warehouses.query";
import useIsMobile from "@/hooks/useIsMobile";
import { getSerialNumber } from "@/utils/serialNumber.util";
import { validatePagination } from "@/utils/validatePagination.util";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Tag } from "antd";
import { Button, Table } from "antd";

export const Route = createFileRoute("/_authenticated/warehouses/")({
  component: RouteComponent,
  validateSearch: (search) => validatePagination(search),
});

function RouteComponent() {
  // 👇 get page & limit from URL
  const { page, limit } = Route.useSearch();
  const isMobile = useIsMobile();
  const { data, isLoading, isError, error, refetch } = useFetchWarehouse({
    page,
    limit,
  });

  const columns = [
    {
      title: "S.No",
      render: (_, record, index) => getSerialNumber({ page, limit, index }),
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Contact Person",
      dataIndex: "contact_person",
      key: "contact_person",
    },
    {
      title: "Contact Person Email",
      dataIndex: "contact_email",
      key: "contact_email",
    },

    {
      title: "Phone Number",
      dataIndex: "contact_phone",
      key: "contact_phone",
    },
    {
      title: "Total Area",
      render: (_, record) =>
        record?.capacity_info?.total_area
          ? `${record?.capacity_info?.total_area}`
          : "N/A",
    },
    {
      title: "Storage Capacity",
      render: (_, record) =>
        record?.capacity_info?.storage_capacity
          ? `${record?.capacity_info?.storage_capacity}`
          : "N/A",
    },
    {
      title: "Status",
      dataIndex: "is_active",
      key: "is_active",
      fixed: isMobile ? false : "right",
      render: (status) => (
        <Tag className="uppercase" color={status ? "green" : "red"}>
          {status ? "Active" : "Inactive"}
        </Tag>
      ),
    },
    {
      title: "Action",
      fixed: isMobile ? false : "right",
      render: (_, record) => (
        <div className="flex gap-2">
          {record?.is_active && (
            <>
              <Link to={`/warehouses/${record.id}/edit`}>
                <Button size="small" type="link">
                  Edit
                </Button>
              </Link>
              <Link to={`/warehouses/${record.id}`}>
                <Button size="small" type="link">
                  View
                </Button>
              </Link>
            </>
          )}
        </div>
      ),
    },
  ];

  const total = data?.pagination?.total_items || 0;

  if (isError) {
    return <ErrorFallback onRetry={refetch} error={error} />;
  }
  console.log(data);

  return (
    <PageLayout
      items={[{ title: "Home", href: "/home" }, { title: "Warehouses" }]}
    >
      <ResponsiveCard
        title="Warehouses"
        extra={
          <Link to="/warehouses/create">
            <Button type="primary">Create</Button>
          </Link>
        }
      >
        <Table
          size="small"
          loading={isLoading}
          bordered
          columns={columns}
          dataSource={data?.data || []}
          pagination={false}
          scroll={{ x: "max-content" }}
        />
        <UrlPagination
          currentPage={page}
          pageSize={limit}
          total={total}
          align="end"
          className="mt-5"
        />
      </ResponsiveCard>
    </PageLayout>
  );
}
