import PageLayout from "@/components/layout/PageLayout";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import ErrorFallback from "@/components/ui/ErrorFallback";
import CustomerOrderDetails from "@/features/orders/components/CustomerOrderDetails";
import { useGetOrderById, usePackOrder } from "@/features/orders/orders.query";
import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useParams } from "@tanstack/react-router";
import { Button, message } from "antd";

export const Route = createFileRoute("/_authenticated/orders/$id/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = useParams({ strict: false });
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error } = useGetOrderById(id);
  const { mutateAsync: packOrder, isLoading: isPacking } = usePackOrder({
    onSuccess: () => {
      message.success("Order packed successfully");
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
  });
  if (isError) {
    return <ErrorFallback error={error} />;
  }
  console.log("RECEIVED", data?.order?.lifecycle_status);

  return (
    <PageLayout
      items={[
        { title: "Home", href: "/home" },
        { title: "Orders", href: "/orders" },
        { title: "Order Details" },
      ]}
    >
      <ResponsiveCard
        loading={isLoading}
        title="Order Details"
        extra={
          (data?.order?.lifecycle_status === "RECEIVED" ||
            data?.order?.lifecycle_status === "IN_TRANSIT") && (
            <Button
              type="primary"
              onClick={() => packOrder(id)}
              loading={isPacking}
            >
              Verify & Pack Order
            </Button>
          )
        }
      >
        <CustomerOrderDetails order={data?.order} />
      </ResponsiveCard>
    </PageLayout>
  );
}
