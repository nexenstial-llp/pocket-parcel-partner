import { useState } from "react";
import {
  Form,
  Input,
  Button,
  Radio,
  Card,
  Spin,
  Empty,
  Timeline,
  Tag,
  Divider,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";

const TrackOrder = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const searchType = Form.useWatch("searchType", form);

  // Simulate API call
  const fetchOrderDetails = async (values) => {
    setLoading(true);
    setOrderData(null);
    try {
      // Simulate loading delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // Mock data with timeline
      setOrderData({
        orderId:
          values.searchType === "orderId" ? values.searchValue : "ORD123456",
        awb: values.searchType === "awb" ? values.searchValue : "AWB789654",
        mobile:
          values.searchType === "mobile" ? values.searchValue : "9876543210",
        status: "Out for Delivery",
        expectedDate: "2025-03-01",
        pickupAddress: "Indiranagar, Maharashtra",
        destinationAddress: "Koramangala, Bangalore",
        currentLocation: "Whitefield Hub",
        events: [
          {
            title: "Order Placed",
            description: "Order confirmed by seller",
            timestamp: "2025-02-25 09:16",
            tag: "processing",
            color: "blue",
          },
          {
            title: "Picked up from Indiranagar",
            description: "Shipped from Nykaa Hub",
            timestamp: "2025-02-26 10:12",
            tag: "shipped",
            color: "cyan",
          },
          {
            title: "Arrived at Mumbai Warehouse",
            description: "Scanned at Mumbai central warehouse",
            timestamp: "2025-02-26 19:00",
            tag: "warehouse",
            color: "gold",
          },
          {
            title: "Reached Bangalore Warehouse",
            description: "Dispatched to final hub",
            timestamp: "2025-02-28 11:24",
            tag: "warehouse",
            color: "orange",
          },
          {
            title: "Out for Delivery from Whitefield Hub",
            description: "Rider allocated",
            timestamp: "2025-03-01 08:30",
            tag: "out-for-delivery",
            color: "green",
          },
        ],
      });
    } catch (err) {
      // Handle errors
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const onFinish = (values) => {
    fetchOrderDetails(values);
  };

  return (
    <div className=" flex flex-col gap-4 ">
      <ResponsiveCard>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ searchType: "mobile" }}
        >
          <Form.Item
            label="Search By"
            name="searchType"
            className="mb-4"
            rules={[{ required: true }]}
          >
            <Radio.Group className="flex justify-center gap-4">
              <Radio value="mobile">Mobile Number</Radio>
              <Radio value="awb">AWB</Radio>
              <Radio value="orderId">Order ID</Radio>
            </Radio.Group>
          </Form.Item>

          {searchType === "mobile" ? (
            <Form.Item
              name="searchValue"
              label="Enter your Mobile Number"
              rules={[
                { required: true, message: "Please enter a valid value" },
                {
                  min: 10,
                  max: 10,
                  message: "Mobile number should be 10 digits long",
                },
              ]}
              wrapperCol={{ span: 12 }}
            >
              <Input size="large" placeholder="Enter Mobile Number" />
            </Form.Item>
          ) : searchType === "awb" ? (
            <Form.Item
              name="searchValue"
              label="Enter your AWB Number"
              rules={[{ required: true, message: "Please enter a AWB Number" }]}
              wrapperCol={{ span: 12 }}
            >
              <Input size="large" placeholder="Enter AWB Number" />
            </Form.Item>
          ) : searchType === "orderId" ? (
            <Form.Item
              name="searchValue"
              label="Enter your Order ID"
              rules={[{ required: true, message: "Please enter a Order ID" }]}
              wrapperCol={{ span: 12 }}
            >
              <Input size="large" placeholder="Enter Order ID" />
            </Form.Item>
          ) : null}

          <div className="mt-4">
            <Button
              type="primary"
              htmlType="submit"
              icon={<SearchOutlined />}
              size="large"
              className="w-1/2"
            >
              Track
            </Button>
          </div>
        </Form>
      </ResponsiveCard>

      <div className="w-full ">
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <Spin size="large" />
          </div>
        ) : orderData ? (
          <Card>
            <div className="flex flex-col gap-1">
              <span>
                <strong>Order ID:</strong> {orderData.orderId}
              </span>
              <span>
                <strong>AWB:</strong> {orderData.awb}
              </span>
              <span>
                <strong>Mobile:</strong> {orderData.mobile}
              </span>
              <Tag color="green" className="mt-2 w-fit">
                {orderData.status}
              </Tag>
            </div>
            <Divider />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 mb-4">
              <p>
                <strong>Pickup Address:</strong> {orderData.pickupAddress}
              </p>
              <p>
                <strong>Destination:</strong> {orderData.destinationAddress}
              </p>
              <p>
                <strong>Current Location:</strong> {orderData.currentLocation}
              </p>
              <p>
                <strong>Expected Delivery:</strong> {orderData.expectedDate}
              </p>
            </div>
            <Divider />
            <Timeline mode="left" className="mt-6">
              {orderData.events.map((event, idx) => (
                <Timeline.Item
                  key={idx}
                  color={event.color}
                  label={
                    <span className="text-xs text-gray-500">
                      {event.timestamp}
                    </span>
                  }
                >
                  <div className="flex flex-col">
                    <span className="font-semibold">{event.title}</span>
                    <span className="text-gray-600">{event.description}</span>
                    <Tag color={event.color} className="mt-1 w-fit">
                      {event.tag}
                    </Tag>
                  </div>
                </Timeline.Item>
              ))}
            </Timeline>
          </Card>
        ) : (
          <Card className="flex justify-center mt-10">
            <Empty description="No order data found. Search to see details." />
          </Card>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;
