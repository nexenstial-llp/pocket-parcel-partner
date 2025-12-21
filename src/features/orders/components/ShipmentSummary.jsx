/* eslint-disable react/prop-types */
import { Card, Tag } from "antd";
import {
  EnvironmentOutlined,
  PhoneOutlined,
  CodeSandboxOutlined,
} from "@ant-design/icons";

const ShipmentSummary = ({ data }) => {
  if (!data) return null;

  const { pickup_info, drop_info, shipment_details } = data;

  return (
    <Card
      size="small"
      className="w-full shadow-sm"
      bodyStyle={{ padding: 14 }}
      title="Shipment Summary"
    >
      {/* PICKUP → DROP */}
      <div className="grid grid-cols-2 gap-4 text-sm mb-3">
        <div>
          <div className="text-xs text-gray-500 flex items-center gap-1 mb-1">
            <EnvironmentOutlined /> Pickup
          </div>
          <div className="font-medium truncate">
            {pickup_info?.pickup_city}, {pickup_info?.pickup_state}
          </div>
          <div className="text-xs text-gray-500 truncate">
            {pickup_info?.pickup_pincode}
          </div>
          <div className="text-xs text-gray-500 flex items-center gap-1">
            <PhoneOutlined /> {pickup_info?.pickup_phone}
          </div>
        </div>

        <div>
          <div className="text-xs text-gray-500 flex items-center gap-1 mb-1">
            <EnvironmentOutlined /> Drop
          </div>
          <div className="font-medium truncate">
            {drop_info?.drop_city}, {drop_info?.drop_state}
          </div>
          <div className="text-xs text-gray-500 truncate">
            {drop_info?.drop_pincode}
          </div>
          <div className="text-xs text-gray-500 flex items-center gap-1">
            <PhoneOutlined /> {drop_info?.drop_phone}
          </div>
        </div>
      </div>

      {/* PACKAGE INFO */}
      <div className="flex justify-between items-center bg-gray-50 rounded-md px-3 py-2 text-sm">
        <div className="flex items-center gap-2 text-gray-600">
          <CodeSandboxOutlined />
          <span>
            {shipment_details?.length} ×{shipment_details?.breadth} ×
            {shipment_details?.height} cm
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-medium">
            {shipment_details?.weight / 1000} kg
          </span>
          <Tag color="green" className="m-0">
            {shipment_details?.delivery_type}
          </Tag>
        </div>
      </div>
    </Card>
  );
};

export default ShipmentSummary;
