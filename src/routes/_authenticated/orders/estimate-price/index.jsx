import PageLayout from "@/components/layout/PageLayout";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import { createFileRoute } from "@tanstack/react-router";
import {
  Form,
  Input,
  InputNumber,
  Button,
  Typography,
  message,
  Table,
} from "antd";
import { useState } from "react";
import GoogleAddressPicker from "@/components/ui/GoogleAddressPicker";
import { useCalculatePriceOfOrder } from "@/features/orders/orders.query";
import {
  EnvironmentOutlined,
  ExperimentOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import { APIProvider } from "@vis.gl/react-google-maps";
import AWSImage from "@/components/ui/AWSImage";

const { Text } = Typography;

export const Route = createFileRoute("/_authenticated/orders/estimate-price/")({
  component: RouteComponent,
});
const getColumnSearchProps = () => ({
  filterDropdown: ({
    setSelectedKeys,
    selectedKeys,
    confirm,
    clearFilters,
  }) => (
    <div className="p-2 space-y-2">
      <Input
        placeholder="Search courier"
        value={selectedKeys[0]}
        onChange={(e) =>
          setSelectedKeys(e.target.value ? [e.target.value] : [])
        }
        onPressEnter={() => confirm()}
        allowClear
      />
      <div className="flex gap-2">
        <Button
          type="primary"
          size="small"
          onClick={() => confirm()}
          className="w-full"
        >
          Search
        </Button>
        <Button
          size="small"
          onClick={() => {
            clearFilters();
            confirm();
          }}
          className="w-full"
        >
          Reset
        </Button>
      </div>
    </div>
  ),
  onFilter: (value, record) =>
    record?.courier_name?.toLowerCase().includes(value.toLowerCase()),
});

function RouteComponent() {
  const [form] = Form.useForm();
  const [results, setResults] = useState(null);

  const tableData =
    results?.map((item, index) => ({
      key: index,
      courier_name: item.courier_details?.courier_name,
      account_code: item.courier_details?.account_code,
      logo: item.courier_details?.logo,
      price: item.price_summary?.final_total || 0,
    })) || [];

  const columns = [
    {
      title: "S.No.",
      dataIndex: "key",
      render: (text, record, index) => index + 1,
      width: 60,
    },
    {
      title: "Courier Partner",
      dataIndex: "courier_name",
      key: "courier_name",
      ...getColumnSearchProps("courier_name"),
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <AWSImage
            s3Key={record.logo}
            size={60}
            className="object-contain"
            preview={false}
          />
          <div>
            <div className="font-medium">{record.courier_name}</div>
            <div className="text-xs text-gray-400">{record.account_code}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Total Price (₹)",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
      defaultSortOrder: "ascend",
      render: (price) => (
        <span className="font-semibold text-blue-600">₹{price}</span>
      ),
    },
  ];

  const { mutate: calculatePrice, isPending } = useCalculatePriceOfOrder({
    onSuccess: (data) => {
      setResults(Array.isArray(data) ? data : []);
      if (!Array.isArray(data) || data.length === 0) {
        message.info("No courier partners available for this route.");
      }
    },
    onError: (error) => {
      message.error(error.message || "Failed to calculate price");
      setResults(null);
    },
  });

  const onFinish = (values) => {
    const { delivery, package: pkg } = values;
    if (!values?.from_latitude) {
      message.error("Please select a valid pickup location.");
      return;
    }

    calculatePrice({
      from_latitude: values.from_latitude,
      from_longitude: values.from_longitude,
      to_pincode: delivery.pincode,
      ...pkg,
    });
  };

  return (
    <PageLayout
      items={[
        { title: "Home", href: "/home" },
        { title: "Orders", href: "/orders" },
        { title: "Estimate Price" },
      ]}
    >
      <div className="flex flex-col gap-4">
        <ResponsiveCard title="Estimate Shipping Price">
          <APIProvider apiKey={import.meta.env.VITE_APP_GOOGLE_API_KEY}>
            <Form
              disabled={isPending}
              form={form}
              layout="vertical"
              onFinish={onFinish}
              initialValues={{
                package: { weight: 0.5, length: 10, breadth: 10, height: 10 },
              }}
            >
              <Form.Item name="from_latitude" hidden />
              <Form.Item name="from_longitude" hidden />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Route Section */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-2 mb-4">
                      <EnvironmentOutlined className="text-blue-500" />
                      <span className="font-semibold text-slate-700">
                        Route Information
                      </span>
                    </div>

                    <Form.Item
                      name="pickup"
                      label="Pickup Address"
                      rules={[{ required: true, message: "Required" }]}
                    >
                      <GoogleAddressPicker
                        showMap={true}
                        mapClassName="h-[150px] rounded-lg mt-2"
                        onLocationSelect={(loc) => {
                          form.setFieldsValue({
                            from_latitude: loc.lat,
                            from_longitude: loc.lng,
                            pickup: loc.address,
                          });
                        }}
                      />
                    </Form.Item>

                    <Form.Item
                      name={["delivery", "pincode"]}
                      label="Destination Pincode"
                      className="max-w-[200px]"
                      rules={[
                        { required: true, message: "Required" },
                        { pattern: /^\d{6}$/, message: "Invalid Pincode" },
                      ]}
                    >
                      <Input
                        placeholder="000000"
                        maxLength={6}
                        prefix={
                          <EnvironmentOutlined className="text-gray-300" />
                        }
                      />
                    </Form.Item>
                  </div>
                </div>

                {/* Package Section */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="p-4 rounded-xl border border-purple-100 bg-purple-50/30">
                    <div className="flex items-center gap-2 mb-4">
                      <ExperimentOutlined className="text-purple-500" />
                      <span className="font-semibold text-slate-700">
                        Package Dimensions
                      </span>
                    </div>

                    <Form.Item
                      name={["package", "weight"]}
                      label="Weight (kg)"
                      rules={[{ required: true }]}
                    >
                      <InputNumber min={0.1} className="w-full" />
                    </Form.Item>

                    <div className="grid grid-cols-3 gap-3">
                      <Form.Item name={["package", "length"]} label="Length">
                        <InputNumber
                          min={1}
                          className="w-full"
                          placeholder="L"
                        />
                      </Form.Item>
                      <Form.Item name={["package", "breadth"]} label="Breadth">
                        <InputNumber
                          min={1}
                          className="w-full"
                          placeholder="B"
                        />
                      </Form.Item>
                      <Form.Item name={["package", "height"]} label="Height">
                        <InputNumber
                          min={1}
                          className="w-full"
                          placeholder="H"
                        />
                      </Form.Item>
                    </div>
                    <Text type="secondary" className="text-[11px]">
                      All dimensions are in centimeters (cm).
                    </Text>
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-5">
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<ThunderboltOutlined />}
                  loading={isPending}
                  className="h-12 text-lg shadow-md shadow-blue-200"
                >
                  Calculate Rates
                </Button>
              </div>
            </Form>
          </APIProvider>
        </ResponsiveCard>

        {/* Results Section */}
        {results && (
          <ResponsiveCard size="small" title={`Estimated Prices`}>
            <Table
              bordered
              sticky
              size="small"
              columns={columns}
              dataSource={tableData}
              pagination={false}
              locale={{
                emptyText: "No courier partners available",
              }}
              scroll={{ x: 600 }}
            />
          </ResponsiveCard>
        )}
      </div>
    </PageLayout>
  );
}
