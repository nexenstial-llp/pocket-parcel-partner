import PageLayout from "@/components/layout/PageLayout";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import ErrorFallback from "@/components/ui/ErrorFallback";
import WarehouseDetails from "@/features/warehouses/components/WarehouseDetails";
import { useGetWarehouseById } from "@/features/warehouses/warehouses.query";
import { Link } from "@tanstack/react-router";
import { createFileRoute, useParams } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_authenticated/warehouses/$id/edit/index copy"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = useParams({ strict: false });
  const { data, isLoading, isError, error } = useGetWarehouseById(id);
  console.log(data);

  if (isError) {
    return <ErrorFallback error={error} />;
  }
  return (
    <PageLayout
      items={[
        { title: "Home", href: "/home" },
        { title: "Warehouses", href: "/warehouses" },
        { title: "Warehouse Details" },
      ]}
    >
      <ResponsiveCard
        data={isLoading}
        title="Warehouse Details"
        extra={<Link to="edit">Edit</Link>}
      >
        <WarehouseDetails data={data} />
      </ResponsiveCard>
    </PageLayout>
  );
}
