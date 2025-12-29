/* eslint-disable react/prop-types */
import { Timeline, Tag, Row, Col, Typography, Space, Divider } from "antd";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CarOutlined,
  EnvironmentOutlined,
  DropboxOutlined,
  FileTextOutlined,
  CloseCircleOutlined,
  RocketOutlined,
  HomeOutlined,
  ExclamationCircleOutlined,
  QuestionCircleOutlined,
  SwapOutlined,
  CustomerServiceOutlined,
  SafetyCertificateOutlined,
  WarningOutlined,
  RollbackOutlined,
} from "@ant-design/icons";
import moment from "moment-timezone";
import { Package } from "lucide-react";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import { removeUnderscores } from "@/utils/typography.util";

const { Text, Title } = Typography;

// --- STATUS CONFIGURATION ---
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

const TrackOrderPage = ({ data }) => {
  const orderDetails = data?.data?.order_details;
  const trackingData =
    data?.data?.tracking_data?.result?.[orderDetails?.waybill_number];
  const latestStatus = trackingData?.latest_status;
  const scans = trackingData?.scans || [];
  const additional = trackingData?.additional;

  const statusConfig = getClickpostStatusConfig(
    latestStatus?.clickpost_status_code
  );

  return (
    <div className="flex flex-col gap-4">
      {/* 1. COMPACT HEADER CARD: Key Info at a Glance */}
      <ResponsiveCard>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div
              className={`flex items-center justify-center size-8 rounded-full bg-${statusConfig.color}-50 text-${statusConfig.color}-500 text-xl border border-${statusConfig.color}-200`}
            >
              {statusConfig.icon}
            </div>
            <div>
              <Text
                type="secondary"
                className="text-xs uppercase font-semibold tracking-wide block"
              >
                Current Status
              </Text>
              <Title
                level={4}
                style={{
                  margin: 0,
                  color: `var(--ant-${statusConfig.color}-color)`,
                }}
              >
                {latestStatus?.clickpost_status_description || "Unknown Status"}
              </Title>
              <Text type="secondary" className="text-xs">
                {moment(latestStatus?.timestamp).format("DD MMM YYYY, hh:mm A")}
              </Text>
            </div>
          </div>

          <Space size="large" wrap className="flex-1 justify-end">
            <div>
              <Text type="secondary" className="text-xs block">
                Order ID
              </Text>
              <Text strong className="font-mono text-base">
                {orderDetails?.order_number}
              </Text>
            </div>
            <div>
              <Text type="secondary" className="text-xs block">
                Waybill
              </Text>
              <Text strong className="font-mono text-base">
                {orderDetails?.waybill_number}
              </Text>
            </div>
            <div className="text-right">
              <Text type="secondary" className="text-xs block">
                Courier
              </Text>
              <Tag color="blue" className="m-0 font-medium">
                {additional?.courier_partner_name || "Unknown"}
              </Tag>
            </div>
          </Space>
        </div>

        {/* NPR / Critical Alert Banner */}
        {(additional?.npr || orderDetails?.order_status === "CANCELLED") && (
          <div
            className={`mt-4 p-2 px-3 rounded text-sm flex items-center gap-2 ${
              orderDetails?.order_status === "CANCELLED"
                ? "bg-red-50 text-red-700 border border-red-100"
                : "bg-orange-50 text-orange-700 border border-orange-100"
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
      </ResponsiveCard>

      {/* 2. SPLIT VIEW: Timeline (Left) & Details (Right) */}
      <Row gutter={[16, 16]}>
        {/* LEFT: TIMELINE FEED */}
        <Col xs={24} md={14} lg={15}>
          <ResponsiveCard
            size="small"
            title={
              <Space>
                <ClockCircleOutlined className="text-blue-500" />
                <span>Shipment Journey</span>
              </Space>
            }
            className="h-full overflow-hidden"
          >
            <div className="max-h-[500px] overflow-y-auto p-4 custom-scrollbar">
              <Timeline
                mode="left"
                items={scans.map((scan) => {
                  const conf = getClickpostStatusConfig(
                    scan.clickpost_status_code
                  );
                  return {
                    color: conf.color,
                    dot: (
                      <div className={`text-${conf.color}-500 text-lg`}>
                        {conf.icon}
                      </div>
                    ),
                    children: (
                      <div className="mb-6 last:mb-0 bg-orange-50 hover:shadow-sm p-4 rounded-md">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                          <div>
                            <Text
                              strong
                              className="text-sm block text-gray-800"
                            >
                              {scan.status}
                            </Text>
                            {scan.remark && scan.remark !== scan.status && (
                              <Text
                                type="secondary"
                                className="text-xs block mt-0.5 line-clamp-1"
                              >
                                {scan.remark}
                              </Text>
                            )}
                          </div>
                          <div className="flex gap-1">
                            <div className="text-right shrink-0">
                              <Text className="text-xs text-gray-500 font-medium whitespace-nowrap block">
                                {moment(scan.timestamp).format(
                                  "DD MMM YY, HH:mm"
                                )}
                                ,
                              </Text>
                            </div>
                            <div className="text-right shrink-0">
                              <Text className="text-[11px]! text-gray-200 whitespace-nowrap">
                                {moment(scan.timestamp).fromNow()}
                              </Text>
                            </div>
                          </div>
                        </div>
                        {scan.location && (
                          <div className="mt-1 flex items-center gap-1">
                            <EnvironmentOutlined className="text-gray-400 text-xs" />
                            <Text type="secondary" className="text-xs">
                              {removeUnderscores(scan.location)}
                            </Text>
                          </div>
                        )}
                      </div>
                    ),
                  };
                })}
              />
            </div>
          </ResponsiveCard>
        </Col>

        {/* RIGHT: COMPACT DETAILS */}
        <Col xs={24} md={10} lg={9}>
          <ResponsiveCard
            title={
              <Space>
                <Package className="w-4 h-4 text-green-600" />
                <span>Shipment Info</span>
              </Space>
            }
            className="h-full"
          >
            <div className="flex flex-col gap-6">
              {/* Route */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                <div className="flex items-start gap-3">
                  <div className="flex flex-col items-center gap-1 pt-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ring-blue-50"></div>
                    <div className="w-0.5 h-8 bg-gray-200 border-l border-dashed border-gray-300"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500 ring-4 ring-green-50"></div>
                  </div>
                  <div className="flex flex-col gap-4 w-full">
                    <div>
                      <Text
                        type="secondary"
                        className="text-[10px] uppercase font-bold block mb-0.5"
                      >
                        Origin
                      </Text>
                      <Text strong className="block leading-tight">
                        {additional?.pickup_city || "N/A"}
                      </Text>
                    </div>
                    <div>
                      <Text
                        type="secondary"
                        className="text-[10px] uppercase font-bold block mb-0.5"
                      >
                        Destination
                      </Text>
                      <Text strong className="block leading-tight">
                        {additional?.drop_city || "N/A"}
                      </Text>
                    </div>
                  </div>
                </div>
              </div>

              <Divider style={{ margin: "0" }} />

              {/* Meta Data List */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Invoice No</span>
                  <span className="font-mono font-medium">
                    {additional?.invoice_number || "-"}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Latest Location</span>
                  <span className="font-medium text-right">
                    {removeUnderscores(latestStatus?.location) || "-"}
                  </span>
                </div>
              </div>
            </div>
          </ResponsiveCard>
        </Col>
      </Row>
    </div>
  );
};

export default TrackOrderPage;
