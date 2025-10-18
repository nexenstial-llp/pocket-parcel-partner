import { Card, Switch, Row, Col, Empty } from "antd";
import DefaultExtraContent from "../DefaultExtraContent";

const CourierWiseShipmentsChart = () => {
  // Example date ranges – these should be dynamic in real usage
  const currentRange = "18-Sep-2025 - 17-Oct-2025";
  const prevRange = "19-Aug-2025 - 17-Sep-2025";

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <Row align="middle" className="mb-2">
          <Col xs={24} md={16}>
            <div className="flex items-center">
              <span className="text-lg font-semibold text-gray-700">
                Courier wise Shipments
              </span>
              <DefaultExtraContent />
            </div>
          </Col>
          <Col xs={24} md={8}>
            <div className="flex flex-col md:flex-row items-center justify-end gap-2">
              <span className="flex items-center gap-2">
                <span className="inline-block h-3 w-3 rounded-full bg-blue-600"></span>
                <span className="text-sm text-gray-700">{currentRange}</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="inline-block h-3 w-3 rounded-full bg-gray-400"></span>
                <span className="text-sm text-gray-500">{prevRange}</span>
              </span>
              <span className="ml-2">
                <Switch />
              </span>
            </div>
          </Col>
        </Row>
        <Row className="mt-8 flex items-center justify-center">
          <Col xs={24}>
            <Empty description=" Data not found for the selected filters." />
          </Col>
        </Row>
      </Card>
      <Card>
        <div className="flex items-center">
          <span className="text-lg font-semibold text-gray-700">
            Zone Wise Shipments
          </span>
        </div>

        <Row className="mt-8 flex items-center justify-center">
          <Col xs={24}>
            <Empty description=" Data not found for the selected filters." />
          </Col>
        </Row>
      </Card>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8}>
          <Card className="shadow">
            <div className="flex items-center">
              <span className="text-lg font-semibold text-gray-700">
                Shipment&apos;s Channel
              </span>
            </div>
            <Empty description=" Data not found for the selected filters." />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card className="shadow">
            <div className="flex items-center">
              <span className="text-lg font-semibold text-gray-700">
                Weight Profile (in Kgs)
              </span>
            </div>
            <Empty description=" Data not found for the selected filters." />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card className="shadow">
            <div className="flex items-center">
              <span className="text-lg font-semibold text-gray-700">
                Shipment&apos;s Zone
              </span>
            </div>
            <Empty description=" Data not found for the selected filters." />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CourierWiseShipmentsChart;
