import PageLayout from "@/components/layout/PageLayout";
import OrderDetailsPage from "@/components/pages/orders/quick/OrderDetailsPage";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import ErrorFallback from "@/components/ui/ErrorFallback";
import { useGetQwqerOrderById } from "@/features/orders/orders.query";
import { createFileRoute, useParams } from "@tanstack/react-router";
import { Skeleton, Tag } from "antd";

const getStatusColor = (status) => {
  if (!status) return "default";
  const s = status.toLowerCase();
  if (s === "cancelled" || s === "canceled") return "red";
  if (s === "delivered" || s === "completed") return "green";
  if (s === "pending" || s === "created") return "gold";
  if (s === "ongoing" || s === "running" || s === "scheduled" || s === "new")
    return "blue";
  return "default";
};

export const Route = createFileRoute("/_authenticated/orders/first-mile/$id/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = useParams({ strict: "false" });
  const { data, isLoading, isError, error } = useGetQwqerOrderById(id);
  const statusColor = getStatusColor(data?.data?.data?.status);

  const title = isLoading
    ? "Order Details"
    : `Order Details #${data?.data?.data?.order_key}`;

  const extra = isLoading ? (
    <Skeleton.Button size="small" active />
  ) : (
    <Tag color={statusColor}>{data?.data?.data?.status}</Tag>
  );
  if (isError) {
    return <ErrorFallback error={error} />;
  }
  return (
    <PageLayout
      items={[
        { title: "Home", href: "/home" },
        { title: "Orders", href: "/orders" },
        { title: "First Mile", href: "/orders/first-mile" },
        { title: "Order Details" },
      ]}
    >
      <ResponsiveCard loading={isLoading} title={title} extra={extra}>
        <OrderDetailsPage order={data?.data?.data} />
      </ResponsiveCard>
    </PageLayout>
  );
}
