/* eslint-disable react/prop-types */
import { getStatusColor, removeUnderscores } from "@/utils/typography.util";
import { Card, Descriptions, Tag, Timeline } from "antd";
import moment from "moment-timezone";

export default function CustomerOrderDetails({ order }) {
  const pickup = order?.pickup_address;
  const drop = order?.drop_address;

  const latestStatus = order?.status_timeline;

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* ORDER SUMMARY */}
        <Descriptions bordered column={1} size="small">
          <Descriptions.Item label="Order Number">
            {order?.order_number}
          </Descriptions.Item>

          <Descriptions.Item label="Payment Status">
            <Tag color={order?.payment_status === "PAID" ? "green" : "red"}>
              {order?.payment_status}
            </Tag>
          </Descriptions.Item>

          <Descriptions.Item label="Order Status">
            <Tag color="blue">{order?.order_status}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Lifecycle Status">
            <Tag color="blue">{order?.lifecycle_status}</Tag>
          </Descriptions.Item>

          <Descriptions.Item label="Total Amount">
            ₹{order?.total_amount}
          </Descriptions.Item>

          <Descriptions.Item label="Package Details">
            {order?.length} × {order?.breadth} × {order?.height} cm
            <br />
            Weight: {order?.weight} kg
          </Descriptions.Item>
        </Descriptions>
        {/* STATUS TIMELINE */}
        <Card title="Latest Status">
          <Timeline
            items={latestStatus?.map((status) => ({
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
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* PICKUP ADDRESS */}
        <Card title="Pickup Address">
          <Descriptions bordered column={1} size="small">
            <Descriptions.Item label="Name">
              {pickup?.pickup_name}
            </Descriptions.Item>
            <Descriptions.Item label="Phone">
              {pickup?.pickup_phone}
            </Descriptions.Item>
            <Descriptions.Item label="Address">
              {pickup?.pickup_address}
            </Descriptions.Item>
            <Descriptions.Item label="Location">
              {pickup?.pickup_city}, {pickup?.pickup_state} -{" "}
              {pickup?.pickup_pincode}
            </Descriptions.Item>
          </Descriptions>
        </Card>

        {/* DELIVERY ADDRESS */}
        <Card title="Delivery Address">
          <Descriptions bordered column={1} size="small">
            <Descriptions.Item label="Name">
              {drop?.drop_name}
            </Descriptions.Item>
            <Descriptions.Item label="Phone">
              {drop?.drop_phone}
            </Descriptions.Item>
            <Descriptions.Item label="Address">
              {drop?.drop_address}
            </Descriptions.Item>
            <Descriptions.Item label="Location">
              {drop?.drop_city}, {drop?.drop_state} - {drop?.drop_pincode}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </div>
    </div>
  );
}
