import { useState } from "react";
import {
  Card,
  Tabs,
  Table,
  Button,
  Tooltip,
  Space,
  Typography,
  Tag,
} from "antd";

import { InfoCircleOutlined, InboxOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

function ServiceableCourierPartners() {
  const allData = [
    {
      key: "1",
      name: "Xpressbees Surface 10kg",
      type: "Surface",
      rating: 4.4,
      deliveryDate: "Jan 24, 2025",
      daysRemaining: 3,
      weight: "10 Kg",
      rate: 253.0,
    },
    {
      key: "2",
      name: "Ecom Express Surface 10kg",
      type: "Surface",
      rating: 4.4,
      deliveryDate: "Jan 25, 2025",
      daysRemaining: 4,
      weight: "10 Kg",
      rate: 261.4,
    },
    {
      key: "3",
      name: "Ecom Express Air 5kg",
      type: "Air",
      rating: 4.9,
      deliveryDate: "Jan 24, 2025",
      daysRemaining: 3,
      weight: "10 Kg",
      rate: 321.9,
    },
    {
      key: "4",
      name: "Ecom Express Surface 2kg",
      type: "Surface",
      rating: 4.9,
      deliveryDate: "Jan 25, 2025",
      daysRemaining: 4,
      weight: "10 Kg",
      rate: 322.96,
    },
    {
      key: "5",
      name: "Amazon Shipping Air 10kg",
      type: "Air",
      rating: 4.4,
      deliveryDate: "Jan 25, 2025",
      daysRemaining: 4,
      weight: "10 Kg",
      rate: 356.0,
    },
  ];

  const [activeTab, setActiveTab] = useState("All");

  const filteredData =
    activeTab === "All"
      ? allData
      : allData.filter((item) => item.type === activeTab);

  const orderDetails = {
    pickupFrom: {
      pincode: "582101",
      location: "Gadag, Karnataka",
    },
    deliveryTo: {
      pincode: "580009",
      location: "Dharwad, Karnataka",
    },
    shipmentValue: "₹ 1,000",
    paymentMode: "Prepaid",
    weight: "0 Kg",
    dangerous: "No",
  };

  const columns = [
    {
      title: "Carrier Partner",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating) => (
        <Tag
          color="success"
          style={{ borderRadius: "12px", padding: "4px 12px" }}
        >
          {rating}
        </Tag>
      ),
    },
    {
      title: "Estimated Delivery Date",
      key: "delivery",
      render: (_, record) => (
        <div>
          <div>{record.deliveryDate}</div>
          <Text type="success">In {record.daysRemaining} Days</Text>
        </div>
      ),
    },
    {
      title: (
        <span>
          Chargeable Weight{" "}
          <Tooltip title="Maximum weight that can be shipped">
            <InfoCircleOutlined style={{ color: "#8c8c8c" }} />
          </Tooltip>
        </span>
      ),
      dataIndex: "weight",
      key: "weight",
    },
    {
      title: "Shipment Rate",
      key: "rate",
      render: (_, record) => (
        <Space>
          <Text>₹{record.rate.toFixed(2)}</Text>
          <Tooltip title="Includes all taxes">
            <InfoCircleOutlined style={{ color: "#8c8c8c" }} />
          </Tooltip>
        </Space>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Button type="primary" style={{ background: "#6366f1" }}>
          Create Shipment
        </Button>
      ),
    },
  ];

  const items = [
    {
      key: "All",
      label: "All",
      children: (
        <div
          style={{ scrollbarWidth: "thin" }}
          className="max-h-[600px] overflow-y-auto"
        >
          <Text type="secondary" className="mb-4 block">
            Showing {filteredData.length} serviceable couriers
          </Text>

          <Table
            columns={columns}
            dataSource={filteredData}
            pagination={false}
          />
        </div>
      ),
    },
    {
      key: "Air",
      label: "Air",
      children: (
        <div
          style={{ scrollbarWidth: "thin" }}
          className="max-h-[600px] overflow-y-auto"
        >
          <Text type="secondary" className="mb-4 block">
            Showing {filteredData.length} serviceable couriers
          </Text>

          <Table
            columns={columns}
            dataSource={filteredData}
            pagination={false}
          />
        </div>
      ),
    },
    {
      key: "Surface",
      label: "Surface",
      children: (
        <div
          style={{ scrollbarWidth: "thin" }}
          className="max-h-[600px] overflow-y-auto"
        >
          <Text type="secondary" className="mb-4 block">
            Showing {filteredData.length} serviceable couriers
          </Text>

          <Table
            columns={columns}
            dataSource={filteredData}
            pagination={false}
          />
        </div>
      ),
    },
  ];

  return (
    <div className=" bg-gray-50 my-4">
      <div className="w-full flex gap-6">
        {/* Order Details Card */}
        <Card
          style={{ width: 300 }}
          title={<Title level={5}>Order Details</Title>}
        >
          <div className="w-full flex flex-col gap-2">
            <div>
              <p className="text-gray-500">Pickup From</p>
              <div>{orderDetails.pickupFrom.pincode}</div>
              <div>{orderDetails.pickupFrom.location}</div>
            </div>

            <div>
              <p className="text-gray-500">Delivery To</p>
              <div>{orderDetails.deliveryTo.pincode}</div>
              <div>{orderDetails.deliveryTo.location}</div>
            </div>

            <div>
              <p className="text-gray-500">Shipment Value</p>
              <div>{orderDetails.shipmentValue}</div>
            </div>

            <div>
              <p className="text-gray-500">Payment Mode</p>
              <div>{orderDetails.paymentMode}</div>
            </div>

            <div>
              <p className="text-gray-500">Applicable Weight (in Kg)</p>
              <div>{orderDetails.weight}</div>
            </div>

            <div>
              <p className="text-gray-500">Dangerous Goods</p>
              <div>{orderDetails.dangerous}</div>
            </div>

            <div>
              <h5>Buyer Insights</h5>
              <p className="text-gray-500">
                Last Successful Delivery To Buyer:
              </p>
              <div className="mt-2">
                <h5>On Your Store</h5>
                <Space>
                  <InboxOutlined />
                  <p>No orders yet</p>
                </Space>
              </div>
              <div className="mt-2">
                <h5>On Shiprocket</h5>
                <Space>
                  <InboxOutlined />
                  <p>No orders yet</p>
                </Space>
              </div>
            </div>
          </div>
        </Card>

        {/* Carrier Partners Section */}
        <div className="flex-1 mt-3">
          <h4>Serviceable Carrier Partners</h4>
          <div className="mb-4">
            <Tabs activeKey={activeTab} items={items} onChange={setActiveTab} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceableCourierPartners;
