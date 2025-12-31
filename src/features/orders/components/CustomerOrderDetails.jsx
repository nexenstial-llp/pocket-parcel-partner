/* eslint-disable react/prop-types */
import { useState } from "react";
import { Card, Tag, Row, Col, Typography, Button } from "antd";
import {
  EnvironmentOutlined,
  UserOutlined,
  InboxOutlined,
  DollarOutlined,
  CreditCardOutlined,
  ShopOutlined,
  ClockCircleOutlined,
  PushpinOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

import { getStatusColor, removeUnderscores } from "@/utils/typography.util";
import EditAddressModal from "./EditAddressModal";
import { Empty } from "antd";
import AWSImage from "@/components/ui/AWSImage";
import { Link } from "@tanstack/react-router";
import { AiOutlineTruck } from "react-icons/ai";
import { FaRoute } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";
import { useTrackOrder } from "@/features/track-order/track-order.query";
import TrackOrderTimeline from "@/features/track-order/components/TrackOrderTimeline";
import { Space } from "antd";
import moment from "moment-timezone";
import {
  CarOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  CustomerServiceOutlined,
  DropboxOutlined,
  FileTextOutlined,
  HomeOutlined,
  QuestionCircleOutlined,
  RocketOutlined,
  RollbackOutlined,
  SafetyCertificateOutlined,
  SwapOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import AddressBlock from "./AddressBlock";

const { Title } = Typography;

const initialState = { open: false, type: null };
const getClickpostStatusConfig = (statusCode) => {
  switch (statusCode) {
    // Happy Path
    case 1:
    case 28:
      return { color: "blue", icon: <FileTextOutlined /> };
    case 2:
    case 25:
      return { color: "cyan", icon: <ClockCircleOutlined /> };
    case 4:
      return { color: "cyan", icon: <DropboxOutlined /> };
    case 5:
    case 1005:
    case 1006:
      return { color: "geekblue", icon: <CarOutlined /> };
    case 1004:
      return { color: "geekblue", icon: <EnvironmentOutlined /> };
    case 6:
      return { color: "purple", icon: <RocketOutlined /> };
    case 8:
      return { color: "green", icon: <CheckCircleOutlined /> };

    // Issues
    case 3:
      return { color: "orange", icon: <ExclamationCircleOutlined /> };
    case 9:
    case 7:
    case 10:
      return { color: "red", icon: <CloseCircleOutlined /> };

    // RTO
    case 11:
    case 12:
    case 21:
      return { color: "volcano", icon: <RollbackOutlined /> };
    case 13:
      return { color: "volcano", icon: <RocketOutlined /> };
    case 14:
      return { color: "volcano", icon: <HomeOutlined /> };
    case 15:
      return { color: "red", icon: <WarningOutlined /> };

    // Delays/Exceptions
    case 16:
    case 17:
      return { color: "red", icon: <SafetyCertificateOutlined /> };
    case 18:
    case 27:
    case 20:
    case 23:
      return { color: "gold", icon: <ClockCircleOutlined /> };
    case 19:
    case 26:
      return { color: "magenta", icon: <CustomerServiceOutlined /> };

    // Exchange
    case 30:
    case 31:
    case 32:
      return { color: "green", icon: <SwapOutlined /> };

    default:
      return { color: "default", icon: <QuestionCircleOutlined /> };
  }
};
const { Text } = Typography;

export default function CustomerOrderDetails({ order }) {
  const [isModalVisible, setIsModalVisible] = useState(initialState);

  const pickup = order?.pickup_address;
  const drop = order?.drop_address;
  const originalPickup = order?.customer_original_pickup_address;
  // const statusTimeline = order?.status_timeline || [];

  const { data, isLoading, isError, error } = useTrackOrder({
    order_number: order?.order_number,
  });
  const orderDetails = data?.data?.order_details;
  const trackingData =
    data?.data?.tracking_data?.result?.[orderDetails?.waybill_number];
  const latestStatus = trackingData?.latest_status;
  const scans = trackingData?.scans || [];
  const additional = trackingData?.additional;

  const statusConfig = getClickpostStatusConfig(
    latestStatus?.clickpost_status_code
  );
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
        styles={{ body: { padding: 0 } }}
        className="border border-gray-200 rounded-xl shadow-sm overflow-hidden bg-white"
      >
        {/* ================= TOP: ORDER & LOGISTICS ================= */}
        <div className="p-5 md:p-6">
          <Row gutter={[24, 20]} align="middle">
            {/* LEFT: ORDER + LOGISTICS */}
            <Col xs={24} md={15}>
              <div className="flex gap-4">
                {/* Icon */}
                <div className="w-12 h-12 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                  <InboxOutlined className="text-xl text-blue-600" />
                </div>

                <div className="flex-1 min-w-0">
                  {/* Order Number */}
                  <div className="flex items-center gap-3 flex-wrap">
                    <Title
                      copyable
                      level={4}
                      className="mb-0! text-gray-900! font-semibold!"
                    >
                      {order?.order_number}
                    </Title>

                    <Tag className="bg-gray-100 border-gray-200 text-gray-500 font-mono text-xs px-2 rounded">
                      Ref: {order?.reference_number}
                    </Tag>
                    {/* AWB */}
                    {order?.waybill_number && (
                      <span className="text-xs text-gray-500">
                        AWB:&nbsp;
                        <Typography.Text
                          copyable
                          className="font-mono text-gray-800 text-lg!"
                        >
                          {order?.waybill_number}
                        </Typography.Text>
                      </span>
                    )}

                    <Link
                      to={`/orders/track-order`}
                      search={{ order_number: order?.order_number }}
                      className="text-xs text-blue-600 hover:underline"
                    >
                      <Button type="primary" icon={<FaRoute />}>
                        Track Order
                      </Button>
                    </Link>
                    {/* Download Label */}
                    {(order?.label_url ||
                      order?.clickpost_response?.result?.label) && (
                      <a
                        href={
                          order?.label_url ||
                          order?.clickpost_response?.result?.label
                        }
                        target="_blank"
                        className="text-xs text-blue-600 hover:underline"
                      >
                        <Button type="primary" icon={<IoMdDownload />}>
                          Download AWB
                        </Button>
                      </a>
                    )}
                  </div>

                  {/* Logistics Row */}
                  <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                    {/* Carrier */}
                    <div className="flex items-center gap-2">
                      {order?.courier_partner?.logo ? (
                        <AWSImage
                          mode="avatar"
                          size={28}
                          s3Key={order?.courier_partner?.logo}
                          alt="Carrier"
                        />
                      ) : (
                        <AiOutlineTruck size={20} className="text-gray-400" />
                      )}
                      <span className="font-medium text-gray-800">
                        {order?.courier_partner?.name ||
                          order?.cp_name ||
                          "N/A"}
                      </span>
                    </div>

                    {/* Account Code */}
                    {order?.account_code && (
                      <span className="text-xs text-gray-500">
                        Acc:&nbsp;
                        <span className="font-mono text-gray-700">
                          {order?.account_code}
                        </span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Col>

            {/* RIGHT: AMOUNT & PAYMENT */}
            <Col xs={24} md={9}>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 text-right">
                <div className="text-xs uppercase tracking-wide text-gray-500">
                  Total Amount
                </div>
                <div className="text-2xl font-bold text-green-600 mt-1">
                  ₹{Number(order?.total_amount).toLocaleString("en-IN")}
                </div>

                <div className="mt-3 flex flex-wrap justify-end gap-2 text-xs text-gray-600">
                  <span className="flex items-center gap-1.5 bg-white px-2 py-1 rounded border">
                    <CreditCardOutlined className="text-orange-600!" />
                    {order?.payment_mode}
                  </span>
                  <span className="flex items-center gap-1.5 bg-white px-2 py-1 rounded border">
                    <DollarOutlined className="text-orange-600!" />
                    {order?.payment_gateway}
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </div>

        {/* ================= BOTTOM: STATUS STRIP ================= */}
        <div className="px-5 py-3 bg-gray-50 border-t border-gray-200">
          <div className="flex flex-wrap gap-3">
            <StatusBadge status={order?.order_status} label="Order" />
            <StatusBadge status={order?.payment_status} label="Payment" />
            <StatusBadge status={order?.lifecycle_status} label="Lifecycle" />
          </div>
        </div>
      </Card>

      <Row gutter={[20, 20]}>
        {/* ================= LEFT COL: TIMELINE ================= */}
        <Col xs={24} lg={16}>
          <Card
            loading={isLoading}
            className="h-full shadow-sm border-gray-200 rounded-lg"
            title={
              <span className="text-sm font-semibold flex items-center gap-2">
                <ClockCircleOutlined /> Order Journey
              </span>
            }
          >
            {isError ? (
              <div className="flex flex-col gap-4">
                <Empty
                  description={
                    <div className="flex flex-col">
                      <span className="text-lg font-semibold">
                        No tracking information found
                      </span>
                      <span className="text-red-500">
                        {error?.response?.data?.message}
                      </span>
                    </div>
                  }
                  // image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {/* <div className="px-2">
                    <OrderStatusSteps orders={order} />
                  </div>
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
              </div> */}

                <div
                  className={`rounded-2xl p-4 ${
                    latestStatus?.clickpost_status_description == "Delivered"
                      ? "bg-green-50"
                      : latestStatus?.clickpost_status_description ==
                        "Cancelled"
                      ? "bg-red-50"
                      : "bg-yellow-50"
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex items-center justify-center size-4 rounded-full bg-${statusConfig.color}-50 text-${statusConfig.color}-500 text-xl border border-${statusConfig.color}-200`}
                      >
                        {statusConfig.icon}
                      </div>
                      <div>
                        <Text
                          type="secondary"
                          className="text-xs! uppercase font-semibold tracking-wide block"
                        >
                          Current Status
                        </Text>
                        <Title
                          level={5}
                          style={{
                            margin: 0,
                            color: `var(--ant-${statusConfig.color}-color)`,
                          }}
                        >
                          {latestStatus?.clickpost_status_description || "N/A"}
                        </Title>
                        <Text type="secondary" className="text-xs!">
                          {moment(latestStatus?.timestamp).format(
                            "DD MMM YYYY, hh:mm A"
                          )}
                        </Text>
                      </div>
                    </div>

                    <Space size="small" wrap className="flex-1 justify-end">
                      <div>
                        <Text type="secondary" className="text-xs! block">
                          Order ID
                        </Text>
                        <Text strong className="font-mono text-base">
                          {orderDetails?.order_number}
                        </Text>
                      </div>
                      <div>
                        <Text type="secondary" className="text-xs! block">
                          Waybill
                        </Text>
                        <Text strong className="font-mono text-base">
                          {orderDetails?.waybill_number}
                        </Text>
                      </div>
                      <div>
                        <Text type="secondary" className="text-xs! block">
                          Carrier
                        </Text>
                        <Tag color="blue" className="m-0 font-medium">
                          {additional?.courier_partner_name || "Unknown"}
                        </Tag>
                      </div>
                    </Space>
                  </div>

                  {/* NPR / Critical Alert Banner */}
                  {(additional?.npr ||
                    orderDetails?.order_status === "CANCELLED") && (
                    <div
                      className={`mt-4 p-2 px-3 rounded-md text-sm flex items-center gap-2 ${
                        orderDetails?.order_status === "CANCELLED"
                          ? "bg-red-50 text-red-700 border border-red-300"
                          : "bg-orange-50 text-blue-700 border border-blue-300"
                      }`}
                    >
                      <ExclamationCircleOutlined />
                      <span className="font-medium">
                        {orderDetails?.order_status === "CANCELLED"
                          ? "This order has been cancelled."
                          : additional?.npr?.npr_description}
                      </span>
                    </div>
                  )}
                </div>
                <div className="max-h-[300px] overflow-y-auto p-2 custom-scrollbar">
                  <TrackOrderTimeline
                    scans={scans}
                    getClickpostStatusConfig={getClickpostStatusConfig}
                  />
                </div>
              </div>
            )}
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
                        ? "bg-blue-50 border-blue-200 col-span-2"
                        : "bg-white border-gray-200"
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
              icon={<UserOutlined className="text-blue-500!" />}
              data={originalPickup}
            />
          </Col>

          <Col xs={24} md={8}>
            <AddressBlock
              title="Pickup Location"
              typeLabel="WAREHOUSE"
              icon={<ShopOutlined className="text-orange-500!" />}
              data={pickup}
            />
          </Col>

          <Col xs={24} md={8}>
            <AddressBlock
              title="Delivery Location"
              typeLabel="Destination"
              icon={<PushpinOutlined className="text-green-500!" />}
              data={drop}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
}
