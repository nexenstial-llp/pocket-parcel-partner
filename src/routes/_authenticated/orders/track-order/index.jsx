import PageLayout from "@/components/layout/PageLayout";
// import TrackOrder from "@/components/pages/orders/track-order/TrackOrder";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import ErrorFallback from "@/components/ui/ErrorFallback";
import PaginatedSelect from "@/components/ui/PaginatedSelect";
import { useGetOrderById } from "@/features/orders/orders.query";
import { useUrlParams } from "@/hooks/useUrlParams";
import { getStatusColor, removeUnderscores } from "@/utils/typography.util";
import { createFileRoute } from "@tanstack/react-router";
import { Empty } from "antd";
import { Timeline } from "antd";
import moment from "moment-timezone";

export const Route = createFileRoute("/_authenticated/orders/track-order/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { params, setParam } = useUrlParams();
  const { order_id } = params;

  const { data, isLoading, isError, error } = useGetOrderById(order_id);

  if (isError) {
    return <ErrorFallback error={error} />;
  }

  return (
    <PageLayout
      items={[
        { title: "Home", href: "/home" },
        { title: "Orders", href: "/orders" },
        { title: "Track Order" },
      ]}
    >
      <ResponsiveCard title="Track Order">
        <div className="flex flex-col gap-4">
          {/* <TrackOrder /> */}
          <ResponsiveCard size="small" title="Select Order">
            <PaginatedSelect
              style={{ width: "100%", maxWidth: "300px" }}
              fetchUrl="/v1/transit-warehouse/orders"
              labelField="order_number"
              valueField="id"
              queryKey="orders"
              dataPoint="orders"
              onChange={(value) => setParam("order_id", value)}
              value={order_id}
            />
          </ResponsiveCard>

          <ResponsiveCard
            loading={isLoading}
            size="small"
            title="Order Details"
          >
            {order_id ? (
              <div className="w-full pt-8 flex justify-center items-center">
                <Timeline
                  items={data?.order?.status_timeline?.map((status) => ({
                    color: getStatusColor(status?.to_status),
                    children: (
                      <>
                        <p className="font-medium">
                          {removeUnderscores(status?.to_status)}
                        </p>
                        <p className="text-sm text-gray-500">
                          {removeUnderscores(status?.notes)}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          <span className="mr-2 font-bold">
                            {moment(status?.created_at).format("DD-MM-YYYY")}
                          </span>
                          {moment(status?.created_at).fromNow()}
                        </p>
                      </>
                    ),
                  }))}
                />
              </div>
            ) : (
              <Empty description="Please select the order" />
            )}
          </ResponsiveCard>
        </div>
      </ResponsiveCard>
    </PageLayout>
  );
}
