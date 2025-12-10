/* eslint-disable react/prop-types */
import { Descriptions, Tag, Typography, Divider, Space } from "antd";
import {
  CarOutlined,
  EnvironmentOutlined,
  FileTextOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";

const { Text, Title } = Typography;

const OrderDetailsCard = ({ data }) => {
  if (!data) return null;

  // Safely parse address snapshots if they are strings
  const pickupAddr = data.pickup_address_snapshot
    ? JSON.parse(data.pickup_address_snapshot)
    : data.pickup_address || {};
  const dropAddr = data.drop_address_snapshot
    ? JSON.parse(data.drop_address_snapshot)
    : data.drop_address || {};

  const getStatusColor = (status) => {
    const colors = {
      CONFIRMED: "blue",
      PENDING: "orange",
      DELIVERED: "green",
      CANCELLED: "red",
    };
    return colors[status] || "default";
  };

  return (
    <ResponsiveCard>
      {/* Header: Order ID & Status */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <Title level={5} className="mb-1!">
            Order #{data?.order_number}
          </Title>
          <Text type="secondary" className="text-xs">
            Placed on{" "}
            {data?.created_at
              ? new Date(data.created_at).toLocaleDateString()
              : "N/A"}
          </Text>
        </div>
        <Tag color={getStatusColor(data?.order_status)}>
          {data?.order_status || "UNKNOWN"}
        </Tag>
      </div>

      <Divider size="small" />

      {/* Shipment Info */}
      <Descriptions column={2} size="small" layout="vertical">
        <Descriptions.Item
          label={
            <Space>
              <FileTextOutlined /> Reference No.
            </Space>
          }
        >
          <Text copyable>{data?.reference_number || "-"}</Text>
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <Space>
              <CreditCardOutlined /> Payment
            </Space>
          }
        >
          {data?.payment_mode} • {data?.payment_status}
          {data?.total_amount && ` • ₹${data.total_amount}`}
        </Descriptions.Item>

        <Descriptions.Item
          label={
            <Space>
              <CarOutlined /> Courier
            </Space>
          }
        >
          {data?.courier_partner_name || "Partner Pending"}
          {data?.waybill_number && <div>Waybill: {data.waybill_number}</div>}
        </Descriptions.Item>

        <Descriptions.Item label="Shipment Weight">
          {data?.chargeable_weight ? `${data.chargeable_weight} kg` : "-"}
        </Descriptions.Item>
      </Descriptions>

      <Divider className="my-3!" />

      {/* Locations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pickup */}
        <div>
          <Text
            type="secondary"
            className="text-xs uppercase font-bold mb-1 block"
          >
            <EnvironmentOutlined className="mr-1" /> Pickup From
          </Text>
          <div className="text-sm">
            <Text strong>{pickupAddr?.pickup_name}</Text>
            <br />
            {pickupAddr?.pickup_city}, {pickupAddr?.pickup_state}
            <br />
            <Text type="secondary">{pickupAddr?.pickup_phone}</Text>
          </div>
        </div>

        {/* Delivery */}
        <div>
          <Text
            type="secondary"
            className="text-xs uppercase font-bold mb-1 block"
          >
            <EnvironmentOutlined className="mr-1" /> Deliver To
          </Text>
          <div className="text-sm">
            <Text strong>{dropAddr?.drop_name}</Text>
            <br />
            {dropAddr?.drop_city}, {dropAddr?.drop_state}
            <br />
            <Text type="secondary">{dropAddr?.drop_phone}</Text>
          </div>
        </div>
      </div>
    </ResponsiveCard>
  );
};

export default OrderDetailsCard;
