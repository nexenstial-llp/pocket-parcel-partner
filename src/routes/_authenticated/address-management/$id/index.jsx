import PageLayout from "@/components/layout/PageLayout";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import ErrorFallback from "@/components/ui/ErrorFallback";
import ResponsiveButton from "@/components/ui/ResponsiveButton";
import { useGetAddressesById } from "@/features/address-management/address-management.query";
import AddressDetails from "@/features/address-management/components/AddressDetails";
import { EditOutlined } from "@ant-design/icons";
import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { Skeleton } from "antd";

export const Route = createFileRoute("/_authenticated/address-management/$id/")(
  {
    component: RouteComponent,
  }
);

function RouteComponent() {
  const { id } = Route.useParams();
  const { data, isLoading, isError, error, refetch } = useGetAddressesById(id);
  if (isError) {
    return <ErrorFallback error={error} onRetry={refetch} />;
  }

  return (
    <PageLayout
      items={[
        { title: "Home", href: "/home" },
        { title: "Addresses", href: "/address-management" },
        { title: "View" },
      ]}
    >
      <ResponsiveCard
        title="Address Details"
        loading={isLoading}
        extra={
          <Link to="edit">
            <ResponsiveButton type="primary" icon={<EditOutlined />}>
              Edit
            </ResponsiveButton>
          </Link>
        }
      >
        {isLoading ? <Skeleton active /> : <AddressDetails data={data} />}
      </ResponsiveCard>
    </PageLayout>
  );
}
