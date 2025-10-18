import { Select, Card, Row, Col, Empty } from "antd";
import DefaultExtraContent from "../DefaultExtraContent";
import FilterSection from "../../FilterSection";
// For charts, consider using a library like ant-design-charts or recharts for real donut charts.

const { Option } = Select;

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4">
      {/* Filters Row */}
      <FilterSection />
      {/* Orders Summary */}
      <Card className="mb-8 shadow w-full">
        <Row justify="space-between" className="text-gray-700">
          <Col>
            <div className="text-lg font-bold">Orders Summary</div>
          </Col>
          <Col>
            {/* Real-time icon placeholder */}
            <DefaultExtraContent />
          </Col>
        </Row>
        <div className="py-8 flex justify-center">
          <Empty description="Orders data not found for the selected filters." />
        </div>
      </Card>

      {/* Data Cards (Donut Charts, etc.) */}
      <Row gutter={16}>
        <Col xs={24} md={8}>
          <Card title="Prepaid vs. COD Orders" className="mb-8 shadow">
            <div className="py-8 flex justify-center">
              <Empty description="No data (add chart here)" />
            </div>
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card title="Address Quality Score" className="mb-8 shadow">
            <div className="py-8 flex justify-center">
              <Empty description="No data (add chart here)" />
            </div>
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card title="Most Popular Order Location" className="mb-8 shadow">
            <div className="py-8 flex justify-center">
              <Empty description="No data (add chart here)" />
            </div>
          </Card>
        </Col>
      </Row>

      {/* Top Customers and Top Products */}
      <Row gutter={16} className="">
        <Col xs={24} md={12}>
          <Card
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
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card
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
          </Card>
        </Col>
      </Row>
    </div>
  );
}
