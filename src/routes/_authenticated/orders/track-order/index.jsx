import PageLayout from "@/components/layout/PageLayout";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import { useTrackOrder } from "@/features/track-order/track-order.query";
import { useUrlParams } from "@/hooks/useUrlParams";
import { createFileRoute } from "@tanstack/react-router";
import { Input, Empty } from "antd";
import { useState } from "react";
import { Package } from "lucide-react";
import TrackOrderPage from "@/features/track-order/components/TrackOrderPage";

export const Route = createFileRoute("/_authenticated/orders/track-order/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { params, setParam } = useUrlParams();
  const { order_number } = params;
  const [orderNumber, setOrderNumber] = useState(order_number);

  const handleOrderNumberChange = (e) => {
    setOrderNumber(e.target.value);
  };

  const { data, isLoading } = useTrackOrder({ order_number });

  return (
    <PageLayout
      items={[
        { title: "Home", href: "/home" },
        { title: "Orders", href: "/orders" },
        { title: "Track Order" },
      ]}
    >
      <div className="flex flex-col gap-4">
        {/* Search Section */}
        <ResponsiveCard>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Package className="text-2xl text-blue-500" />
              <h2 className="text-xl font-semibold m-0">Track Your Order</h2>
            </div>
            <Input.Search
              value={orderNumber}
              onChange={handleOrderNumberChange}
              placeholder="Enter order number (e.g., PP-XXXXXXXX-XXXXX)"
              onSearch={(value) => setParam("order_number", value)}
              enterButton="Track Order"
              loading={isLoading}
            />
          </div>
        </ResponsiveCard>

        {/* Order Details Section */}
        {order_number && !isLoading && data?.data && (
          <TrackOrderPage data={data} />
        )}

        {/* Empty State */}
        {order_number && !isLoading && !data?.data && (
          <ResponsiveCard>
            <Empty
              description={
                <div className="flex flex-col gap-2">
                  <span className="text-lg font-semibold">
                    No tracking information found
                  </span>
                  <span className="text-gray-500">
                    Please check the order number and try again
                  </span>
                </div>
              }
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          </ResponsiveCard>
        )}

        {/* Initial State */}
        {!order_number && !isLoading && (
          <ResponsiveCard>
            <Empty
              description={
                <div className="flex flex-col gap-2">
                  <span className="text-lg font-semibold">
                    Enter an order number to track
                  </span>
                  <span className="text-gray-500">
                    Use the search box above to get started
                  </span>
                </div>
              }
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          </ResponsiveCard>
        )}
      </div>
    </PageLayout>
  );
}
