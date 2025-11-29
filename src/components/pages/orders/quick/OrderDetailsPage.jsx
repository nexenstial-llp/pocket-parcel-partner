/* eslint-disable react/prop-types */
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import { Descriptions, Timeline, Divider } from "antd";

const getStatusColor = (status) => {
  if (!status) return "default";
  const s = status.toLowerCase();
  if (s === "cancelled" || s === "canceled") return "red";
  if (s === "delivered" || s === "completed") return "green";
  if (s === "pending" || s === "created") return "gold";
  if (s === "ongoing" || s === "running") return "blue";
  return "default";
};

const formatMinutes = (secondsLike) => {
  if (!secondsLike) return "-";
  const secs = parseFloat(secondsLike);
  if (Number.isNaN(secs)) return "-";
  const mins = Math.round(secs / 60);
  return `${mins} min`;
};

const formatDateTime = (iso) => {
  if (!iso) return "-";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString();
};

const OrderDetailsPage = ({ order }) => {
  //   const order = raw?.data?.data?.data;
  if (!order) {
    return (
      <ResponsiveCard className="shadow-md">
        <p className="text-slate-600">No order data available.</p>
      </ResponsiveCard>
    );
  }

  return (
    <div className=" flex flex-col gap-4">
      {/* Addresses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ResponsiveCard size={"small"} title="Pickup Address">
          <Descriptions column={1} size="small" colon={false} bordered>
            <Descriptions.Item label="Name">
              {order.from_address.name}
            </Descriptions.Item>
            <Descriptions.Item label="Phone">
              {order.from_address.phone}
            </Descriptions.Item>
            <Descriptions.Item label="House No.">
              {order.from_address.house_number}
            </Descriptions.Item>
            <Descriptions.Item label="Address">
              {order.from_address.address}
            </Descriptions.Item>
            <Descriptions.Item label="Locality">
              {order.from_address.locality}
            </Descriptions.Item>
            <Descriptions.Item label="Landmark">
              {order.from_address.landmark}
            </Descriptions.Item>
          </Descriptions>
        </ResponsiveCard>

        <ResponsiveCard size={"small"} title="Drop Address">
          <Descriptions column={1} size="small" colon={false} bordered>
            <Descriptions.Item label="Name">
              {order.to_address.name}
            </Descriptions.Item>
            <Descriptions.Item label="Phone">
              {order.to_address.phone}
            </Descriptions.Item>
            <Descriptions.Item label="House No.">
              {order.to_address.house_number}
            </Descriptions.Item>
            <Descriptions.Item label="Address">
              {order.to_address.address}
            </Descriptions.Item>
            <Descriptions.Item label="Locality">
              {order.to_address.locality}
            </Descriptions.Item>
            <Descriptions.Item label="Landmark">
              {order.to_address.landmark}
            </Descriptions.Item>
          </Descriptions>
        </ResponsiveCard>
      </div>

      <ResponsiveCard size={"small"} className="shadow-sm" title="Description">
        {order.description}
      </ResponsiveCard>

      {/* Top summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ResponsiveCard size={"small"} title="Shipment" className="shadow-sm">
          <Descriptions column={1} size="small" colon={false} bordered>
            <Descriptions.Item label="Distance">
              {order.distance} km
            </Descriptions.Item>
            <Descriptions.Item label="Weight Range">
              {order.weight_range} kg
            </Descriptions.Item>
            <Descriptions.Item label="ETA">
              {formatMinutes(order.estimated_time)}
            </Descriptions.Item>
          </Descriptions>
        </ResponsiveCard>

        <ResponsiveCard size={"small"} title="SLA" className="shadow-sm">
          <Descriptions column={1} size="small" colon={false} bordered>
            <Descriptions.Item label="Assignment SLA">
              {formatMinutes(order.assignment_sla)}
            </Descriptions.Item>
            <Descriptions.Item label="Pickup SLA">
              {formatMinutes(order.pickup_sla)}
            </Descriptions.Item>
          </Descriptions>
        </ResponsiveCard>
        <ResponsiveCard size={"small"} title="Pricing" className="shadow-sm">
          <Descriptions column={1} size="small" colon={false} bordered>
            <Descriptions.Item label="Delivery Amount">
              ₹{order.delivery_amount}
            </Descriptions.Item>
            <Descriptions.Item label="Total Amount">
              ₹{order.total_amount}
            </Descriptions.Item>
            {order.promo_code && (
              <Descriptions.Item label="Promo Code">
                {order.promo_code}
              </Descriptions.Item>
            )}
          </Descriptions>
        </ResponsiveCard>
      </div>

      {/* Instructions & Cancellation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ResponsiveCard
          size={"small"}
          title="Special Instructions"
          className="shadow-sm"
        >
          <p className="text-sm text-slate-600">
            {order.special_instruction || "No special instructions."}
          </p>
        </ResponsiveCard>

        {order.status?.toLowerCase() === "cancelled" && (
          <ResponsiveCard
            size={"small"}
            title="Cancellation Details"
            className="shadow-sm"
          >
            <Descriptions column={1} size="small" colon={false}>
              <Descriptions.Item label="Reason">
                {order.cancellation_reason || "-"}
              </Descriptions.Item>
              <Descriptions.Item label="Comment">
                {order.cancellation_comment || "-"}
              </Descriptions.Item>
            </Descriptions>
          </ResponsiveCard>
        )}
      </div>

      {/* Timeline */}
      <ResponsiveCard
        size={"small"}
        title="Order Timeline"
        className="shadow-sm"
      >
        {order.order_timeline && order.order_timeline.length > 0 ? (
          <Timeline className="mt-2">
            {order.order_timeline.map((item, idx) => (
              <Timeline.Item
                key={idx}
                color={getStatusColor(item.order_status)}
              >
                <div className="flex flex-col gap-0.5">
                  <span className="font-medium capitalize">
                    {item.order_status?.replace("_", " ")}
                  </span>
                  <span className="text-xs text-slate-500">
                    {formatDateTime(item.date_time)}
                  </span>
                  {item.km_covered != null && (
                    <span className="text-xs text-slate-500">
                      Km covered: {item.km_covered}
                    </span>
                  )}
                </div>
              </Timeline.Item>
            ))}
          </Timeline>
        ) : (
          <p className="text-sm text-slate-500 mt-1">
            No timeline events available.
          </p>
        )}
      </ResponsiveCard>

      {/* Rider info (only if assigned) */}
      {(order.rider_name || order.rider_phone) && (
        <ResponsiveCard size={"small"} className="shadow-sm">
          <h2 className="text-sm font-semibold text-slate-700 mb-3">
            Rider Details
          </h2>
          <Descriptions column={2} size="small" colon={false} bordered>
            <Descriptions.Item label="Name">
              {order.rider_name || "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Phone">
              {order.rider_phone || "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Delivery OTP">
              {order.otp || "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Pickup OTP">
              {order.pickup_otp || "-"}
            </Descriptions.Item>
          </Descriptions>
        </ResponsiveCard>
      )}

      {/* System meta */}
      <ResponsiveCard
        title="System Metadata"
        size={"small"}
        className="shadow-sm"
      >
        <Descriptions bordered column={3} size="small" colon={false}>
          <Descriptions.Item label="Order Key">
            {order.order_key}
          </Descriptions.Item>
          <Descriptions.Item label="Merchant Order ID">
            {order.merchant_order_id}
          </Descriptions.Item>
          <Descriptions.Item label="RTO Order">
            {order.rto_order ? "Yes" : "No"}
          </Descriptions.Item>
        </Descriptions>
        <Divider className="my-3" />
      </ResponsiveCard>
    </div>
  );
};

export default OrderDetailsPage;
