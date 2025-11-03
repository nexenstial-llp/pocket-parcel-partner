import { Select, Row, Col, Empty } from "antd";
import DefaultExtraContent from "../overview/DefaultExtraContent";
import FilterSection from "../FilterSection";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
// For charts, consider using a library like ant-design-charts or recharts for real donut charts.

const { Option } = Select;

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4">
      {/* Filters Row */}
      <FilterSection />
      {/* Orders Summary */}
      <ResponsiveCard
        title="Orders Summary"
        extra={<DefaultExtraContent />}
        className="mb-8 shadow w-full"
      >
        <div className="py-8 flex justify-center">
          <Empty description="Orders data not found for the selected filters." />
        </div>
      </ResponsiveCard>

      {/* Data Cards (Donut Charts, etc.) */}
      <Row gutter={16}>
        <Col xs={24} md={8}>
          <ResponsiveCard
            title="Prepaid vs. COD Orders"
            className="mb-8 shadow"
          >
            <div className="py-8 flex justify-center">
              <Empty description="No data" />
            </div>
          </ResponsiveCard>
        </Col>

        <Col xs={24} md={8}>
          <ResponsiveCard title="Address Quality Score" className="mb-8 shadow">
            <div className="py-8 flex justify-center">
              <Empty description="No data" />
            </div>
          </ResponsiveCard>
        </Col>

        <Col xs={24} md={8}>
          <ResponsiveCard
            title="Most Popular Order Location"
            className="mb-8 shadow"
          >
            <div className="py-8 flex justify-center">
              <Empty description="No data" />
            </div>
          </ResponsiveCard>
        </Col>
      </Row>

      {/* Top Customers and Top Products */}
      <Row gutter={16} className="">
        <Col xs={24} md={12}>
          <ResponsiveCard
            title="Top 10 Customers"
            className="mb-8 shadow"
            extra={
              <Select defaultValue="30days" style={{ width: 120 }}>
                <Option value="7days">7 days</Option>
                <Option value="15days">15 days</Option>
                <Option value="30days">30 days</Option>
                <Option value="3months">3 Months</Option>
                <Option value="6months">6 Months</Option>
                <Option value="1year">1 Year</Option>
              </Select>
            }
          >
            <div className="py-8 flex justify-center">
              <Empty description="Customers data not found for selected filters." />
            </div>
          </ResponsiveCard>
        </Col>
        <Col xs={24} md={12}>
          <ResponsiveCard
            title="Top 10 Products"
            className="mb-8 shadow"
            extra={
              <Select defaultValue="30days" style={{ width: 120 }}>
                <Option value="7days">7 days</Option>
                <Option value="15days">15 days</Option>
                <Option value="30days">30 days</Option>
                <Option value="3months">3 Months</Option>
                <Option value="6months">6 Months</Option>
                <Option value="1year">1 Year</Option>
              </Select>
            }
          >
            <div className="py-8 flex justify-center">
              <Empty description="Products data not found for selected filters." />
            </div>
          </ResponsiveCard>
        </Col>
      </Row>
    </div>
  );
}
