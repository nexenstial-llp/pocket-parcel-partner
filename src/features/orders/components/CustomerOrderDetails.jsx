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
  Badge,
} from "antd";
import {
  EnvironmentOutlined,
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  EditOutlined,
  InboxOutlined,
  DollarOutlined,
  CalendarOutlined,
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
    <Badge
      status={
        status?.includes("SUCCESS") || status?.includes("DELIVERED")
          ? "success"
          : status?.includes("PENDING") || status?.includes("PROCESSING")
          ? "processing"
          : status?.includes("CANCELLED") || status?.includes("FAILED")
          ? "error"
          : "default"
      }
      text={
        <span className="text-xs font-medium">
          {removeUnderscores(status)}
        </span>
      }
    />
  );

  const InfoRow = ({ icon, label, value }) => (
    <div className="flex items-start gap-3 py-2">
      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
        <span className="text-gray-600 text-sm">{icon}</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[10px] uppercase tracking-wider text-gray-500 mb-0.5">
          {label}
        </div>
        <div className="text-sm text-gray-900 font-medium break-words">
          {value}
        </div>
      </div>
    </div>
  );

  const AddressBlock = ({ title, data, typeLabel, extra }) => {
    if (!data) return null;

    return (
      <Card
        size="small"
        className="h-full rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 bg-white"
      >
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
              <EnvironmentOutlined className="text-gray-600 text-sm" />
            </div>
            <Text strong className="text-sm text-gray-900">
              {title}
            </Text>
          </div>

          <div className="flex items-center gap-2">
            {typeLabel && (
              <Tag
                bordered={false}
                color="default"
                className="rounded-full px-3 py-0.5 text-[10px] font-medium bg-gray-100 text-gray-700"
              >
                {typeLabel}
              </Tag>
            )}
            {extra}
          </div>
        </div>

        <Space direction="vertical" size={0} className="w-full">
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

          <div className="flex items-start gap-3 py-2">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
              <EnvironmentOutlined className="text-gray-600 text-sm" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] uppercase tracking-wider text-gray-500 mb-0.5">
                Address
              </div>
              <div className="text-sm text-gray-900 font-medium break-words">
                {data.pickup_address || data.drop_address || data.address}
              </div>
              <Text type="secondary" className="text-xs mt-1 block">
                {data.pickup_city || data.drop_city || data.city},{" "}
                {data.pickup_state || data.drop_state || data.state} -{" "}
                {data.pickup_pincode || data.drop_pincode || data.pincode}
              </Text>
            </div>
          </div>
        </Space>
      </Card>
    );
  };

  /* ---------------------------------- */
  /* Component Render                   */
  /* ---------------------------------- */
  return (
    <div className="flex flex-col gap-6">
      <EditAddressModal
        open={isModalVisible.open}
        onCancel={() => setIsModalVisible(initialState)}
        onOk={() => setIsModalVisible(initialState)}
        addressData={order}
        type={isModalVisible.type}
      />
      <Row gutter={[16, 16]}>
        {/* ================= HEADER ================= */}
        <Col xs={24} lg={14}>
          <Card
            className="rounded-xl border-0 shadow-sm hover:shadow-md transition-all duration-200 h-full"
            bodyStyle={{ padding: "24px" }}
          >
            <Row gutter={[24, 16]} align="middle">
              <Col xs={24} md={14}>
                <Space direction="vertical" size={4}>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                      <InboxOutlined className="text-gray-700 text-lg" />
                    </div>
                    <div>
                      <Text
                        type="secondary"
                        className="text-[10px] uppercase tracking-wider block"
                      >
                        Order Number
                      </Text>
                      <Title level={4} style={{ margin: 0 }} className="!text-lg">
                        {order.order_number}
                      </Title>
                    </div>
                  </div>
                  <div className="ml-12">
                    <Text type="secondary" className="text-xs">
                      Ref: <span className="text-gray-900">{order.reference_number}</span>
                    </Text>
                  </div>
                </Space>
              </Col>

              <Col xs={24} md={10}>
                <div className="text-right md:text-right text-left">
                  <div className="flex items-center justify-end gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                      <DollarOutlined className="text-gray-600" />
                    </div>
                    <div>
                      <Text type="secondary" className="text-[10px] uppercase tracking-wider block">
                        Total Amount
                      </Text>
                      <div className="text-2xl font-bold text-gray-900">
                        ₹{order.total_amount}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs space-y-1 bg-gray-50 rounded-lg p-3 mt-2">
                    <div className="flex justify-between items-center gap-4">
                      <span className="text-gray-500">Payment Mode:</span>
                      <span className="text-gray-900 font-semibold">
                        {order.payment_mode}
                      </span>
                    </div>
                    <div className="flex justify-between items-center gap-4">
                      <span className="text-gray-500">Gateway:</span>
                      <span className="text-gray-900 font-semibold">
                        {order.payment_gateway}
                      </span>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>

            <Divider className="my-4" />

            <Space size={[12, 12]} wrap>
              <StatusBadge status={order.payment_status} />
              <StatusBadge status={order.order_status} />
              <StatusBadge status={order.lifecycle_status} />
            </Space>
          </Card>
        </Col>
        {/* ================= PACKAGE DETAILS ================= */}
        <Col xs={24} lg={10}>
          <Card
            className="rounded-xl border-0 shadow-sm hover:shadow-md transition-all duration-200 h-full"
            bodyStyle={{ padding: "24px" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                <InboxOutlined className="text-gray-700 text-lg" />
              </div>
              <Text strong className="text-base">
                Package Details
              </Text>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-4">
              {[
                {
                  label: "Dimensions",
                  value: `${order.length} × ${order.breadth} × ${order.height} cm`,
                  highlight: false,
                },
                {
                  label: "Weight",
                  value: `${order.weight / 1000} kg`,
                  highlight: false,
                },
                {
                  label: "Volumetric",
                  value: `${order.volumetric_weight} kg`,
                  highlight: false,
                },
                {
                  label: "Chargeable",
                  value: `${order.chargeable_weight / 1000} kg`,
                  highlight: true,
                },
                {
                  label: "Declared Value",
                  value: `₹${order.declared_value}`,
                  highlight: false,
                },
                {
                  label: "Created Via",
                  value: removeUnderscores(order.created_via),
                  highlight: false,
                },
              ].map(({ label, value, highlight }) => (
                <div
                  key={label}
                  className={`${
                    highlight ? "col-span-2 bg-gray-50 rounded-lg p-3 border border-gray-200" : ""
                  }`}
                >
                  <div className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">
                    {label}
                  </div>
                  <div
                    className={`font-semibold ${
                      highlight ? "text-gray-900 text-base" : "text-gray-900 text-sm"
                    }`}
                  >
                    {value}
                  </div>
                </div>
              ))}
            </div>

            {/* Courier Partner Info */}
            {(order.cp_id || order.account_code || order.carrier_partner || order.courier_partner) && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-start gap-3">
                  {order.courier_logo && (
                    <div className="w-12 h-12 rounded-lg border border-gray-200 bg-white flex items-center justify-center p-1 flex-shrink-0">
                      <img 
                        src={order.courier_logo} 
                        alt="Courier Partner"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">
                      Courier Partner
                    </div>
                    {(order.courier_name || order.cp_name) && (
                      <div className="font-semibold text-sm text-gray-900 mb-2">
                        {order.courier_name || order.cp_name}
                      </div>
                    )}
                    <div className="grid grid-cols-2 gap-2">
                      {order.cp_id && (
                        <div>
                          <div className="text-[9px] uppercase tracking-wider text-gray-400">
                            CP ID
                          </div>
                          <div className="text-xs text-gray-700 font-medium">
                            {order.cp_id}
                          </div>
                        </div>
                      )}
                      {order.account_code && (
                        <div>
                          <div className="text-[9px] uppercase tracking-wider text-gray-400">
                            Account Code
                          </div>
                          <div className="text-xs text-gray-700 font-medium">
                            {order.account_code}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </Col>
      </Row>
      <Card
        className="rounded-xl border-0 shadow-sm hover:shadow-md transition-all duration-200"
        bodyStyle={{ padding: "24px" }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
            <CalendarOutlined className="text-gray-700 text-lg" />
          </div>
          <Text strong className="text-base">
            Status Timeline
          </Text>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Status Steps & Stats */}
          <div className="flex flex-col gap-6">
            <OrderStatusSteps orders={order} />
            
            {/* Timeline Stats Summary */}
            {statusTimeline.length > 0 && (
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <div className="text-[10px] text-gray-600 font-medium uppercase tracking-wide mb-1">
                    Total Updates
                  </div>
                  <div className="text-xl font-bold text-gray-900">
                    {statusTimeline.length}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <div className="text-[10px] text-gray-600 font-medium uppercase tracking-wide mb-1">
                    Current Status
                  </div>
                  <div className="text-xs font-bold text-gray-900 truncate">
                    {removeUnderscores(statusTimeline[statusTimeline.length - 1]?.to_status || "N/A")}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <div className="text-[10px] text-gray-600 font-medium uppercase tracking-wide mb-1">
                    Last Updated
                  </div>
                  <div className="text-xs font-bold text-gray-900">
                    {moment(statusTimeline[statusTimeline.length - 1]?.created_at).fromNow()}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Timeline Updates */}
          <div className="h-[500px] flex flex-col bg-white rounded-xl border border-gray-200">
            {statusTimeline.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
                  <CalendarOutlined className="text-gray-400 text-lg" />
                </div>
                <Text strong className="text-sm text-gray-900 block mb-1">
                  No status updates yet
                </Text>
                <Text type="secondary" className="text-xs block">
                  Status updates will appear here as your order progresses
                </Text>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto custom-scrollbar divide-y divide-gray-100">
                {[...statusTimeline].reverse().map((status, reversedIndex) => {
                  const reversedArray = [...statusTimeline].reverse();
                  const isLatest = reversedIndex === reversedArray.length - 1;
                  const isFirst = reversedIndex === 0;
                  const statusColor = getStatusColorForTimeline(status.to_status);
                  const prevStatus = reversedIndex > 0 ? reversedArray[reversedIndex - 1] : null;
                  const timeDiff = prevStatus 
                    ? moment(status.created_at).diff(moment(prevStatus.created_at), 'minutes')
                    : null;

                  return (
                    <div 
                      key={reversedIndex} 
                      className={`flex gap-3 p-3 hover:bg-gray-50 transition-colors ${
                        isLatest ? 'bg-gray-50' : ''
                      }`}
                    >
                      {/* Timeline Dot & Line */}
                      <div className="flex flex-col items-center pt-0.5">
                        <div 
                          className={`w-2.5 h-2.5 rounded-full border-2 border-white shadow-sm flex-shrink-0 ${
                            isLatest ? 'ring-2 ring-offset-1 ring-gray-300' : ''
                          }`}
                          style={{ 
                            backgroundColor: statusColor,
                          }}
                        />
                        {!isLatest && (
                          <div className="w-0.5 bg-gray-200 flex-1 mt-1" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0 pb-1">
                        {/* Header Row */}
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="text-xs font-semibold text-gray-900">
                                {removeUnderscores(status.to_status)}
                              </span>
                              {isLatest && (
                                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-medium bg-gray-900 text-white">
                                  Latest
                                </span>
                              )}
                            </div>
                            {status.from_status && (
                              <div className="text-[10px] text-gray-500 mt-0.5">
                                from {removeUnderscores(status.from_status)}
                              </div>
                            )}
                          </div>
                          
                          {/* Timestamp */}
                          <div className="text-right flex-shrink-0">
                            <div className="text-[10px] font-medium text-gray-900">
                              {moment(status.created_at).format("DD MMM, HH:mm")}
                            </div>
                            {timeDiff !== null && timeDiff > 0 && (
                              <div className="text-[9px] text-gray-500 mt-0.5">
                                +{timeDiff < 60 ? `${timeDiff}m` : `${Math.floor(timeDiff / 60)}h ${timeDiff % 60}m`}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Notes */}
                        {status.notes && (
                          <div className="mt-1.5 text-[11px] text-gray-600 bg-gray-50 rounded px-2.5 py-1.5 border border-gray-100">
                            {removeUnderscores(status.notes)}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </Card>
      {/* ================= ADDRESSES ================= */}
      <Card
        className="rounded-xl border-0 shadow-sm hover:shadow-md transition-all duration-200"
        bodyStyle={{ padding: "24px" }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
            <EnvironmentOutlined className="text-gray-700 text-lg" />
          </div>
          <Text strong className="text-base">
            Addresses
          </Text>
        </div>

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
                  type="primary"
                  className="!bg-gradient-to-r from-blue-500 to-blue-600 border-0 shadow-sm hover:shadow-md transition-all"
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
