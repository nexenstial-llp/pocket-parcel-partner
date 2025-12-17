import PageLayout from "@/components/layout/PageLayout";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import ErrorFallback from "@/components/ui/ErrorFallback";
import RackDetailsCard from "@/features/rack/components/RackDetailsCard";
import { useFetchRackById } from "@/features/rack/racks.query";
import { createFileRoute, useParams } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/rack/$id/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = useParams({ strict: false });
  const { data, isLoading, isError, error } = useFetchRackById(id);
  if (isError) {
    return <ErrorFallback error={error} />;
  }
  return (
    <PageLayout
      items={[
        { title: "Home", href: "/home" },
        { title: "Rack", href: "/rack" },
        { title: "Rack Details" },
      ]}
    >
      <ResponsiveCard loading={isLoading} title="Rack Details">
        <RackDetailsCard data={data?.data} />
      </ResponsiveCard>
    </PageLayout>
  );
}
