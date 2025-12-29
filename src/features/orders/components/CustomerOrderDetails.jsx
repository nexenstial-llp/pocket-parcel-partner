/* eslint-disable react/prop-types */
import { useState } from "react";
import { Card, Tag, Row, Col, Typography, Divider, Timeline } from "antd";
import {
  EnvironmentOutlined,
  UserOutlined,
  PhoneOutlined,
  InboxOutlined,
  DollarOutlined,
  CreditCardOutlined,
  ShopOutlined,
  ClockCircleOutlined,
  PushpinOutlined,
} from "@ant-design/icons";

import moment from "moment-timezone";
import {
  getStatusColor,
  getStatusColorForTimeline,
  removeUnderscores,
} from "@/utils/typography.util";
import EditAddressModal from "./EditAddressModal";

import OrderStatusSteps from "./OrderStatusSteps";
import { Empty } from "antd";
import AWSImage from "@/components/ui/AWSImage";
import { Link } from "@tanstack/react-router";

const { Title } = Typography;

const initialState = { open: false, type: null };

export default function CustomerOrderDetails({ order }) {
  const [isModalVisible, setIsModalVisible] = useState(initialState);

  const pickup = order?.pickup_address;
  const drop = order?.drop_address;
  const originalPickup = order?.customer_original_pickup_address;
  const statusTimeline = order?.status_timeline || [];
  // const isPendingPayment = order?.payment_status === "PENDING";

  /* ---------------------------------- */
  /* Reusable UI blocks                 */
  /* ---------------------------------- */
  const StatusBadge = ({ status, label }) => (
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">
        {label}:
      </span>
      <Tag
        color={getStatusColor(status)}
        className="rounded-md px-2 py-0.5 text-[11px] font-semibold uppercase border-0"
        style={{ lineHeight: "18px" }}
      >
        {removeUnderscores(status)}
      </Tag>
    </div>
  );

  const InfoRow = ({ icon, label, value }) => (
    <div className="flex items-start gap-3 py-1.5">
      <div className="mt-0.5 text-gray-400 text-sm shrink-0">{icon}</div>
      <div className="min-w-0 flex-1">
        <div className="text-[10px] uppercase tracking-wide text-gray-400 mb-0.5">
          {label}
        </div>
        <div className="text-sm text-gray-700 leading-snug wrap-break-word">
          {value || <span className="text-gray-300 italic">N/A</span>}
        </div>
      </div>
    </div>
  );

  const AddressBlock = ({ title, data, icon, typeLabel }) => {
    if (!data)
      return (
        <Card
          size="small"
          className="h-full bg-gray-50 border-dashed border-gray-200 shadow-none flex items-center justify-center"
        >
          <Empty
            description={
              <span className="text-xs text-gray-400">No {title}</span>
            }
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        </Card>
      );

    return (
      <Card
        size="small"
        className="h-full border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
        styles={{
          header: {
            borderBottom: "1px solid #f0f0f0",
            padding: "12px 16px",
            minHeight: "auto",
          },
          body: {
            padding: "16px",
          },
        }}
        title={
          <div className="flex items-center gap-2">
            {icon}
            <span className="text-sm font-semibold text-gray-800">{title}</span>
            {typeLabel && (
              <span
                className={`ml-auto text-[10px] font-medium bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full uppercase tracking-wide ${
                  typeLabel === "Source"
                    ? "bg-green-500 text-white"
                    : typeLabel === "Destination"
                    ? "bg-orange-500 text-white"
                    : ""
                }`}
              >
                {typeLabel}
              </span>
            )}
          </div>
        }
      >
        <div className="space-y-1">
          {(data.pickup_name || data.drop_name) && (
            <InfoRow
              icon={<UserOutlined />}
              label="Name"
              value={
                <span className="font-medium text-gray-900">
                  {data.pickup_name || data.drop_name}
                </span>
              }
            />
          )}

          {(data.pickup_phone || data.drop_phone) && (
            <InfoRow
              icon={<PhoneOutlined />}
              label="Phone"
              value={data.pickup_phone || data.drop_phone}
            />
          )}

          <div className="border-t border-gray-200">
            <InfoRow
              icon={<EnvironmentOutlined />}
              label="Address"
              value={
                <div>
                  <div className="mb-0.5">
                    {data.pickup_address || data.drop_address}
                  </div>
                  <div className="text-xs text-gray-500">
                    {data.pickup_city || data.drop_city},{" "}
                    {data.pickup_state || data.drop_state}{" "}
                    {data.drop_pincode && ` - ${data.drop_pincode}`}
                    {data.pickup_pincode && ` - ${data.pickup_pincode}`}
                  </div>
                </div>
              }
            />
          </div>
        </div>
      </Card>
    );
  };

  /* ---------------------------------- */
  /* Component Render                   */
  /* ---------------------------------- */
  return (
    <div className="flex flex-col gap-5 font-sans text-gray-800">
      <EditAddressModal
        open={isModalVisible.open}
        onCancel={() => setIsModalVisible(initialState)}
        onOk={() => setIsModalVisible(initialState)}
        addressData={order}
        type={isModalVisible.type}
      />
      {/* {isPendingPayment && (
        <Alert
          message="Payment Required"
          description={
            <div>
              <p className="m-0 text-xs">
                This order requires payment to be processed. Please complete the
                payment using the <strong>&quot;Pay Now&quot;</strong> button
                above.
              </p>
              <p className="m-0 mt-2">
                <strong>Amount Due: ₹{order?.total_amount}</strong>
              </p>
            </div>
          }
          type="warning"
          showIcon
          icon={<ExclamationCircleOutlined />}
          className="mb-4"
        />
      )} */}

      {/* ================= TOP SECTION: HEADER & SUMMARY ================= */}
      <Card
        styles={{
          body: {
            padding: 0,
          },
        }}
        className="border-gray-200 shadow-sm rounded-lg overflow-hidden"
      >
        <div className="p-5 md:p-6 bg-white">
          <Row gutter={[24, 24]} align="middle">
            {/* Order ID & Basic Info */}
            <Col xs={24} md={14}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                  <InboxOutlined className="text-xl" />
                </div>
                <div>
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <Title
                      copyable
                      level={4}
                      className="mb-0! text-gray-900! font-bold!"
                    >
                      {order?.order_number}
                    </Title>{" "}
                    <Link
                      to={`/orders/track-order`}
                      search={{
                        order_number: order?.order_number,
                      }}
                      className="text-xs"
                    >
                      Track Order
                    </Link>
                    <Tag className="m-0 bg-gray-100 border-gray-200 text-gray-500 font-mono text-xs px-2 rounded">
                      Ref: {order?.reference_number}
                    </Tag>
                  </div>

                  <div className="flex flex-wrap gap-2 divide-x mt-3">
                    <StatusBadge status={order?.order_status} label="Order" />

                    <StatusBadge
                      status={order?.payment_status}
                      label="Payment"
                    />

                    <StatusBadge
                      status={order?.lifecycle_status}
                      label="Lifecycle"
                    />
                  </div>
                </div>
              </div>
            </Col>

            {/* Price & Payment Details */}
            <Col xs={24} md={10}>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 flex flex-col md:items-end">
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                  Total Amount
                </div>
                <div className="text-2xl font-bold text-green-500 mb-2">
                  ₹{Number(order?.total_amount).toLocaleString("en-IN")}
                </div>

                <div className="flex items-center gap-3 text-xs text-gray-600">
                  <span className="flex items-center gap-1.5 bg-white px-2 py-1 rounded border border-gray-200">
                    <CreditCardOutlined className="text-orange-600!" />{" "}
                    {order?.payment_mode}
                  </span>
                  <span className="flex items-center gap-1.5 bg-white px-2 py-1 rounded border border-gray-200">
                    <DollarOutlined className="text-orange-600!" />{" "}
                    {order?.payment_gateway}
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </div>

        {/* Courier Info Footer (if available) */}
        {(order?.cp_id ||
          order?.courier_name ||
          order?.cp_name ||
          order?.waybill_number ||
          order?.clickpost_response) && (
          <div className="bg-gray-50 px-3 py-2 border-t border-gray-200 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            <span className="text-gray-500 font-medium text-xs uppercase tracking-wide">
              Carrier Partner:
            </span>

            <div className="flex items-center gap-2">
              {order?.courier_partner?.logo ? (
                <AWSImage
                  mode="avatar"
                  size={50}
                  s3Key={order?.courier_partner?.logo}
                  alt="Courier"
                  className="h-5 object-contain"
                />
              ) : (
                <ShopOutlined className="text-gray-400" />
              )}
              <span className="font-semibold text-gray-700">
                {order?.courier_partner?.name ||
                  order?.cp_name ||
                  order?.account_code ||
                  "Unknown Carrier"}
              </span>
            </div>

            {order?.account_code && (
              <span className="text-gray-500 text-xs">
                Acc:{" "}
                <span className="font-mono text-gray-700">
                  {order?.account_code}
                </span>
              </span>
            )}
            {order?.waybill_number && (
              <span className="text-gray-500 text-xs!">
                AWB No:{" "}
                <Typography.Text
                  copyable
                  className="font-mono text-gray-700! text-lg!"
                >
                  {order?.waybill_number}
                </Typography.Text>
              </span>
            )}
            {(order?.label_url || order?.clickpost_response?.result) && (
              <span className="text-gray-500 text-xs!">
                Download AWB :{" "}
                <a
                  target="_blank"
                  href={
                    order?.label_url || order?.clickpost_response?.result?.label
                  }
                >
                  Download
                </a>
              </span>
            )}
          </div>
        )}
      </Card>

      <Row gutter={[20, 20]}>
        {/* ================= LEFT COL: TIMELINE ================= */}
        <Col xs={24} lg={16}>
          <Card
            className="h-full shadow-sm border-gray-200 rounded-lg"
            title={
              <span className="text-sm font-semibold flex items-center gap-2">
                <ClockCircleOutlined /> Order Journey
              </span>
            }
            styles={{
              body: {
                padding: "0px",
              },
            }}
          >
            <div className="p-6">
              {/* Visual Stepper */}
              <div className="px-2">
                <OrderStatusSteps orders={order} />
              </div>

              <Divider className="my-6 border-gray-100" />

              {/* Granular Timeline */}
              <div className="rounded-lg p-4 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                    Activity Log
                  </span>
                  <span className="text-xs text-gray-400">
                    {statusTimeline.length} updates
                  </span>
                </div>

                <div className="max-h-[300px] overflow-y-auto p-2 custom-scrollbar">
                  {statusTimeline.length === 0 ? (
                    <Empty
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                      description="No updates yet"
                    />
                  ) : (
                    <Timeline
                      reverse
                      items={[...statusTimeline].map((status, idx) => {
                        const isLatest = idx === 0;
                        const statusColor = getStatusColorForTimeline(
                          status.to_status
                        );

                        return {
                          color: isLatest ? "blue" : "gray", // Or map 'statusColor' to accepted Antd colors if needed (blue, red, green, gray)
                          dot: (
                            <div
                              className={`w-2.5 h-2.5 rounded-full border-2 border-white ring-1 ring-gray-200 ${
                                isLatest
                                  ? "ring-blue-200 bg-blue-500"
                                  : "bg-gray-400"
                              }`}
                              style={{
                                backgroundColor: isLatest
                                  ? undefined
                                  : statusColor,
                              }}
                            />
                          ),
                          children: (
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 pb-2 bg-orange-50 hover:shadow-sm p-4 rounded-md">
                              <div>
                                <div
                                  className={`text-sm ${
                                    status.to_status === "CANCELLED"
                                      ? "font-bold text-red-600"
                                      : isLatest
                                      ? "font-bold text-gray-800"
                                      : "font-medium text-gray-600"
                                  }`}
                                >
                                  {removeUnderscores(status.to_status)}
                                </div>
                                {status.notes && (
                                  <div className="text-xs text-gray-500 mt-0.5 bg-white px-1.5 py-0.5 rounded border border-gray-200 inline-block">
                                    {removeUnderscores(status.notes)}
                                  </div>
                                )}
                              </div>
                              <div className="text-xs text-gray-400 font-mono whitespace-nowrap">
                                {moment(status.created_at).format(
                                  "DD MMM YY, HH:mm"
                                )}
                              </div>
                            </div>
                          ),
                        };
                      })}
                    />
                  )}
                </div>
              </div>
            </div>
          </Card>
        </Col>

        {/* ================= RIGHT COL: PACKAGE DETAILS ================= */}
        <Col xs={24} lg={8}>
          <Card
            className="h-full shadow-sm border-gray-200 rounded-lg"
            title={
              <span className="text-sm font-semibold flex items-center gap-2">
                <InboxOutlined /> Package Details
              </span>
            }
          >
            <div className="space-y-4">
              {/* Main Grid */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    label: "Dimensions",
                    value: `${order?.length}×${order?.breadth}×${order?.height} cm`,
                    full: true,
                  },
                  {
                    label: "Weight",
                    value: `${(order?.weight / 1000).toFixed(2)} kg`,
                    full: true,
                  },
                  {
                    label: "Volumetric",
                    value: `${order?.volumetric_weight} kg`,
                    full: true,
                  },
                  {
                    label: "Chargeable",
                    value: `${(order?.chargeable_weight / 1000).toFixed(2)} kg`,
                    highlight: true,
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded border ${
                      item.highlight
                        ? "bg-blue-50 border-blue-100 col-span-2"
                        : "bg-white border-gray-100"
                    } ${item.full ? "col-span-2" : ""}`}
                  >
                    <div
                      className={`text-[10px] uppercase tracking-wider mb-0.5 ${
                        item.highlight
                          ? "text-blue-600 font-semibold"
                          : "text-gray-400"
                      }`}
                    >
                      {item.label}
                    </div>
                    <div
                      className={`font-semibold ${
                        item.highlight
                          ? "text-blue-900 text-lg"
                          : "text-gray-700 text-sm"
                      }`}
                    >
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <div className="text-xs text-gray-400 mb-1">
                  Creation Source
                </div>
                <Tag className="m-0 bg-gray-50 text-gray-600 border-gray-200">
                  {removeUnderscores(order?.created_via || "Web Dashboard")}
                </Tag>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* ================= ADDRESSES ROW ================= */}
      <div className="mt-2">
        <h3 className="text-sm font-bold text-gray-600 mb-3 uppercase tracking-wider pl-1">
          Shipping Addresses
        </h3>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <AddressBlock
              title="Customer (Origin)"
              typeLabel="Source"
              icon={<UserOutlined className="text-blue-500" />}
              data={originalPickup}
            />
          </Col>

          <Col xs={24} md={8}>
            <AddressBlock
              title="Pickup Location"
              typeLabel="WAREHOUSE"
              icon={<ShopOutlined className="text-orange-500" />}
              data={pickup}
            />
          </Col>

          <Col xs={24} md={8}>
            <AddressBlock
              title="Delivery Location"
              typeLabel="Destination"
              icon={<PushpinOutlined className="text-green-500" />}
              data={drop}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
}
