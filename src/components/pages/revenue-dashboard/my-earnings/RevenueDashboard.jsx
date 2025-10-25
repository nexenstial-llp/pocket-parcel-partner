import { Card, Row, Col, DatePicker, Select, Statistic } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

const RevenueDashboard = () => {
  // Example static data (you can fetch via API)
  const stats = [
    {
      title: "Total Revenue Generated",
      value: 1250000,
      prefix: "₹",
      suffix: "",
      color: "text-blue-600",
      trend: "up",
      percentChange: 12.5,
    },
    {
      title: "Partner Share (Earnings)",
      value: 850000,
      prefix: "₹",
      color: "text-green-600",
      trend: "up",
      percentChange: 9.8,
    },
    {
      title: "Aggregator Commission",
      value: 400000,
      prefix: "₹",
      color: "text-red-500",
      trend: "down",
      percentChange: -5.2,
    },
    {
      title: "Average Revenue per Shipment",
      value: 320,
      prefix: "₹",
      suffix: "/shipment",
      color: "text-indigo-600",
    },
    {
      title: "Pending Settlements",
      value: 150000,
      prefix: "₹",
      color: "text-yellow-600",
      trend: "down",
      percentChange: -2.3,
    },
    {
      title: "Logistics Cost as % of Sales",
      value: 18,
      suffix: "%",
      color: "text-purple-600",
    },
    {
      title: "Profit Margin per Route/Partner",
      value: 22,
      suffix: "%",
      color: "text-teal-600",
    },
  ];

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Revenue Dashboard
        </h1>

        <div className="flex flex-wrap gap-3 items-center">
          <Select
            defaultValue="monthly"
            className="w-36"
            options={[
              { value: "daily", label: "Daily" },
              { value: "weekly", label: "Weekly" },
              { value: "monthly", label: "Monthly" },
              { value: "yearly", label: "Yearly" },
            ]}
          />
          <RangePicker
            defaultValue={[dayjs().subtract(7, "day"), dayjs()]}
            className="shadow-sm"
          />
        </div>
      </div>

      {/* KPI Grid */}
      <Row gutter={[16, 16]}>
        {stats.map((item) => (
          <Col xs={24} sm={12} md={8} lg={6} key={item.title}>
            <Card
              bordered={false}
              className="rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
            >
              <Statistic
                title={item.title}
                value={item.value}
                prefix={item.prefix}
                suffix={item.suffix}
                precision={item.suffix === "%" ? 1 : 0}
                valueStyle={{
                  color: item.color,
                  fontWeight: 600,
                  fontSize: "1.5rem",
                }}
              />
              {item.percentChange !== undefined && (
                <div
                  className={`flex items-center text-sm ${
                    item.trend === "up" ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {item.trend === "up" ? (
                    <ArrowUpOutlined className="mr-1" />
                  ) : (
                    <ArrowDownOutlined className="mr-1" />
                  )}
                  {item.percentChange}% from last period
                </div>
              )}
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default RevenueDashboard;
