/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Card,
  Timeline,
  Tag,
  Row,
  Col,
  Space,
  Typography,
  Button,
  Divider,
} from "antd";
import {
  EnvironmentOutlined,
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  EditOutlined,
} from "@ant-design/icons";

import moment from "moment-timezone";
import {
  getStatusColor,
  getStatusColorForTimeline,
  removeUnderscores,
} from "@/utils/typography.util";
import EditAddressModal from "./EditAddressModal";

import OrderStatusSteps from "./OrderStatusSteps";

const { Text, Title } = Typography;

const initialState = { open: false, type: null };

export default function CustomerOrderDetails({ order }) {
  const [isModalVisible, setIsModalVisible] = useState(initialState);

  const pickup = order?.pickup_address;
  const drop = order?.drop_address;
  const originalPickup = order?.customer_original_pickup_address;
  const statusTimeline = order?.status_timeline || [];

  /* ---------------------------------- */
  /* Reusable UI blocks                 */
  /* ---------------------------------- */

  const StatusBadge = ({ status }) => (
    <Tag
      color={getStatusColor(status)}
      style={{
        fontSize: 11,
        borderRadius: 999,
        padding: "2px 12px",
        fontWeight: 500,
      }}
    >
      {removeUnderscores(status)}
    </Tag>
  );

  const InfoRow = ({ icon, label, value }) => (
    <div className="flex gap-2 text-xs">
      <span className="text-gray-400 mt-0.5 text-xs">{icon}</span>
      <div>
        <div className="text-gray-500">{label}</div>
        <div className="text-gray-900 font-medium">{value}</div>
      </div>
    </div>
  );

  const AddressBlock = ({ title, data, typeLabel, extra }) => {
    if (!data) return null;

    return (
      <Card
        size="small"
        className="h-full rounded-lg border border-gray-200 bg-gray-50/40 "
      >
        <div className="flex justify-between items-start mb-3">
          <Text strong className="text-sm">
            {title}
          </Text>

          <div className="flex items-center gap-2">
            {typeLabel && (
              <Tag
                bordered={false}
                color={
                  typeLabel === "Pickup"
                    ? "blue"
                    : typeLabel === "Drop"
                    ? "green"
                    : "warning"
                }
                style={{
                  fontSize: 11,
                  borderRadius: 999,
                  padding: "1px 12px",
                  fontWeight: 500,
                }}
              >
                {typeLabel}
              </Tag>
            )}
            {extra}
          </div>
        </div>

        <Space direction="vertical" size={6}>
          {(data.pickup_name || data.drop_name) && (
            <InfoRow
              icon={<UserOutlined />}
              label="Name"
              value={data.pickup_name || data.drop_name}
            />
          )}

          {(data.pickup_phone || data.drop_phone) && (
            <InfoRow
              icon={<PhoneOutlined />}
              label="Phone"
              value={data.pickup_phone || data.drop_phone}
            />
          )}

          {(data.email || data.drop_email) && (
            <InfoRow
              icon={<MailOutlined />}
              label="Email"
              value={data.email || data.drop_email}
            />
          )}

          <InfoRow
            icon={<EnvironmentOutlined />}
            label="Address"
            value={data.pickup_address || data.drop_address || data.address}
          />

          <Text type="secondary" className="text-[11px]">
            {data.pickup_city || data.drop_city || data.city},{" "}
            {data.pickup_state || data.drop_state || data.state} -{" "}
            {data.pickup_pincode || data.drop_pincode || data.pincode}
          </Text>
        </Space>
      </Card>
    );
  };

  /* ---------------------------------- */
  /* Component Render                   */
  /* ---------------------------------- */
  return (
    <div className="flex flex-col gap-4">
      <EditAddressModal
        open={isModalVisible.open}
        onCancel={() => setIsModalVisible(initialState)}
        onOk={() => setIsModalVisible(initialState)}
        addressData={order}
        type={isModalVisible.type}
      />
      <Row gutter={[16, 16]}>
        {/* ================= HEADER ================= */}
        <Col xs={24} md={14}>
          <Card
            style={{ height: "100%" }}
            size="small"
            className="rounded-lg border border-gray-200 "
          >
            <Row gutter={[16, 8]} align="middle">
              <Col xs={24} md={16}>
                <Space direction="vertical" size={2}>
                  <Text
                    type="secondary"
                    className="text-[11px] uppercase tracking-wide"
                  >
                    Order Number
                  </Text>
                  <Title level={4} style={{ margin: 0 }}>
                    {order.order_number}
                  </Title>
                  <Text type="secondary" className="text-[11px]">
                    Ref: {order.reference_number}
                  </Text>
                </Space>
              </Col>

              <Col xs={24} md={8}>
                <div className="text-right">
                  <Text type="secondary" className="text-[11px] uppercase">
                    Total Amount
                  </Text>
                  <div className="text-2xl font-semibold text-green-700">
                    ₹{order.total_amount}
                  </div>
                  <div className="text-[11px] text-gray-500 flex flex-col justify-end mt-1">
                    <div className="flex gap-2">
                      <span className="text-gray-500">Payment Mode:</span>
                      <span className="text-gray-900 font-medium">
                        {order.payment_mode}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-500">Payment Gateway:</span>
                      <span className="text-gray-900 font-medium">
                        {order.payment_gateway}
                      </span>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>

            <Divider style={{ margin: "12px 0" }} />

            <Space size={[8, 8]} wrap>
              <StatusBadge status={order.payment_status} />
              <StatusBadge status={order.order_status} />
              <StatusBadge status={order.lifecycle_status} />
            </Space>
          </Card>
        </Col>
        {/* ================= STATUS + PACKAGE ================= */}
        <Col xs={24} md={10}>
          <Card
            style={{ height: "100%" }}
            size="small"
            title="Package Details"
            className=""
          >
            <div className="grid grid-cols-2 gap-4 text-xs">
              {[
                [
                  "Dimensions (cm)",
                  `${order.length} × ${order.breadth} × ${order.height}`,
                ],
                ["Weight", `${order.weight / 1000} kg`],
                ["Volumetric Weight", `${order.volumetric_weight} kg`],
                ["Chargeable Weight", `${order.chargeable_weight / 1000} kg`],
                ["Declared Value", `₹ ${order.declared_value}`],
                ["Created Via", removeUnderscores(order.created_via)],
              ].map(([label, value]) => (
                <div key={label}>
                  <div className="text-gray-500 uppercase text-[10px] tracking-wide mb-1">
                    {label}
                  </div>
                  <div className="font-medium text-gray-900">{value}</div>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>
      <Card
        size="small"
        title="Status Timeline"
        className="rounded-lg border border-gray-200 "
      >
        <div className="flex flex-col gap-8 p-4">
          <OrderStatusSteps orders={order} />
          <div className="max-h-[250px] overflow-y-scroll custom-scrollbar  p-4">
            {statusTimeline.length === 0 ? (
              <Text type="secondary" className="text-xs">
                No status updates yet.
              </Text>
            ) : (
              <div className="flex justify-center min-w-[300px]">
                <Timeline
                  className="min-w-[300px]"
                  reverse
                  mode="left"
                  items={statusTimeline.map((status) => ({
                    color: getStatusColorForTimeline(status.to_status),
                    label: moment(status.created_at).format(
                      "DD-MM-YYYY, HH:mm"
                    ),
                    children: (
                      <div className="space-y-0.5">
                        <div className="text-sm font-medium text-gray-900">
                          {removeUnderscores(status.to_status)}
                        </div>
                        {status.notes && (
                          <div className="text-xs text-gray-500">
                            {removeUnderscores(status.notes)}
                          </div>
                        )}
                        <div className="text-[11px] text-gray-400">
                          {moment(status.created_at).format(
                            "DD-MM-YYYY, HH:mm"
                          )}
                        </div>
                      </div>
                    ),
                  }))}
                />
              </div>
            )}
          </div>
        </div>
      </Card>
      {/* ================= ADDRESSES ================= */}
      <Card
        size="small"
        title="Addresses"
        className="rounded-lg border border-gray-200 "
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <AddressBlock
              title="Customer Pickup (Original)"
              typeLabel="Customer"
              data={originalPickup}
            />
          </Col>

          <Col xs={24} md={8}>
            <AddressBlock
              title="Pickup (Current)"
              typeLabel="Pickup"
              data={pickup}
            />
          </Col>

          <Col xs={24} md={8}>
            <AddressBlock
              title="Delivery Address"
              typeLabel="Drop"
              data={drop}
              extra={
                <Button
                  size="small"
                  type="link"
                  icon={<EditOutlined />}
                  onClick={() =>
                    setIsModalVisible({
                      type: "drop",
                      open: true,
                    })
                  }
                >
                  Edit
                </Button>
              }
            />
          </Col>
        </Row>
      </Card>
    </div>
  );
}
