import { Card, Col, DatePicker, Row, Select } from "antd";
import { useState } from "react";

const { RangePicker } = DatePicker;
const { Option } = Select;
const FilterSection = () => {
  // These can be driven by backend data or derived from context.
  const [dateRange, setDateRange] = useState([null, null]);
  const [zone, setZone] = useState(undefined);
  const [courier, setCourier] = useState(undefined);
  const [paymentMode, setPaymentMode] = useState(undefined);
  const [shipmentMode, setShipmentMode] = useState(undefined);
  return (
    <Card>
      <Row gutter={16} className="flex flex-wrap">
        <Col xs={24} sm={12} md={6}>
          <label className="block text-gray-700 mb-1">Date Range</label>
          <RangePicker
            className="w-full"
            value={dateRange}
            onChange={(val) => setDateRange(val)}
          />
        </Col>
        <Col xs={24} sm={12} md={4}>
          <label className="block text-gray-700 mb-1">Zone</label>
          <Select
            placeholder="Zone"
            className="w-full"
            value={zone}
            onChange={setZone}
            allowClear
            mode="multiple"
          >
            <Option value="north">North</Option>
            <Option value="south">South</Option>
            <Option value="east">East</Option>
            <Option value="west">West</Option>
          </Select>
        </Col>
        <Col xs={24} sm={12} md={4}>
          <label className="block text-gray-700 mb-1">Courier</label>
          <Select
            placeholder="Courier"
            className="w-full"
            value={courier}
            onChange={setCourier}
            allowClear
            mode="multiple"
          >
            <Option value="blue_dart">Blue Dart</Option>
            <Option value="fedex">FedEx</Option>
          </Select>
        </Col>
        <Col xs={24} sm={12} md={4}>
          <label className="block text-gray-700 mb-1">Payment Mode</label>
          <Select
            placeholder="Payment"
            className="w-full"
            value={paymentMode}
            onChange={setPaymentMode}
            allowClear
            mode="multiple"
          >
            <Option value="prepaid">Prepaid</Option>
            <Option value="cod">COD</Option>
          </Select>
        </Col>
        <Col xs={24} sm={12} md={4}>
          <label className="block text-gray-700 mb-1">Shipment Mode</label>
          <Select
            placeholder="Shipment"
            className="w-full"
            value={shipmentMode}
            onChange={setShipmentMode}
            allowClear
            mode="multiple"
          >
            <Option value="air">Air</Option>
            <Option value="surface">Surface</Option>
          </Select>
        </Col>
      </Row>
    </Card>
  );
};

export default FilterSection;
