import { useState } from "react";
import { Card, Input, Button, Tabs, Form, Result, Alert } from "antd";

const { TabPane } = Tabs;

const TrackOrderPage = () => {
  const [activeKey, setActiveKey] = useState("mobile");
  const [form] = Form.useForm();
  const [searchResult, setSearchResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Simulate API Response
  const handleTrackOrder = (values) => {
    setLoading(true);
    // Dummy result example
    setSearchResult({
      status: "Delivered",
      awb: values.awb || "123456789",
      orderId: values.orderId || "XYZ987",
      mobile: values.mobile || "9917344496",
      deliveryDate: "2025-10-17",
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card
        className="w-full max-w-md shadow-lg rounded-lg"
        title={
          <span className="text-xl font-medium text-gray-700">
            Track Your Order
          </span>
        }
      >
        <Tabs
          defaultActiveKey="mobile"
          activeKey={activeKey}
          onChange={setActiveKey}
          centered
          tabBarGutter={32}
        >
          <TabPane tab="Mobile Number" key="mobile">
            <Form
              form={form}
              layout="vertical"
              onFinish={handleTrackOrder}
              className="space-y-4"
            >
              <Form.Item
                label="Enter Mobile Number"
                name="mobile"
                rules={[
                  {
                    required: true,
                    message: "Please enter your mobile number",
                  },
                  {
                    pattern: /^[0-9]{10}$/,
                    message: "Mobile number must be 10 digits",
                  },
                ]}
              >
                <Input
                  placeholder="e.g. 9917344496"
                  className="py-2 px-3 border rounded focus:ring-2 focus:ring-blue-600"
                  maxLength={10}
                />
              </Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Track Order
              </Button>
            </Form>
          </TabPane>

          <TabPane tab="AWB Number" key="awb">
            <Form
              form={form}
              layout="vertical"
              onFinish={handleTrackOrder}
              className="space-y-4"
            >
              <Form.Item
                label="Enter AWB Number"
                name="awb"
                rules={[
                  { required: true, message: "Please enter your AWB number" },
                ]}
              >
                <Input
                  placeholder="e.g. AWB123456"
                  className="py-2 px-3 border rounded focus:ring-2 focus:ring-blue-600"
                />
              </Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Track Order
              </Button>
            </Form>
          </TabPane>

          <TabPane tab="Order ID" key="orderId">
            <Form
              form={form}
              layout="vertical"
              onFinish={handleTrackOrder}
              className="space-y-4"
            >
              <Form.Item
                label="Enter Order ID"
                name="orderId"
                rules={[
                  { required: true, message: "Please enter your Order ID" },
                ]}
              >
                <Input
                  placeholder="e.g. ORDER123"
                  className="py-2 px-3 border rounded focus:ring-2 focus:ring-blue-600"
                />
              </Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Track Order
              </Button>
            </Form>
          </TabPane>
        </Tabs>

        {/* Result Panel */}
        <div className="mt-6">
          {searchResult && (
            <Result
              status={searchResult.status === "Delivered" ? "success" : "info"}
              title={`Order Status: ${searchResult.status}`}
              subTitle={`Delivery Date: ${searchResult.deliveryDate}`}
              extra={[
                <Alert
                  type="success"
                  message={`AWB: ${searchResult.awb} | Order ID: ${searchResult.orderId} | Mobile: ${searchResult.mobile}`}
                  showIcon
                  key="alert"
                />,
              ]}
            />
          )}
        </div>
      </Card>
    </div>
  );
};

export default TrackOrderPage;
