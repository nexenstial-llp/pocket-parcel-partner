/* eslint-disable react/prop-types */

import { Form, Input, InputNumber, Select, Switch, Button, Card } from "antd";

const { TextArea } = Input;

export default function RackForm({ onFinish, loading }) {
  const [form] = Form.useForm();

  return (
    <Card title="Add Rack">
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        className="space-y-3"
      >
        <div className="grid grid-cols-2 gap-x-4">
          <Form.Item
            name="name"
            label="Rack"
            rules={[{ required: true, message: "Please enter the name" }]}
          >
            <Input placeholder="e.g. Rack-A1" />
          </Form.Item>

          <Form.Item
            name="warehouse"
            label="Select Warehouse"
            rules={[{ required: true, message: "Please select a warehouse" }]}
          >
            <Select
              placeholder="Select warehouse"
              options={[
                { label: "Main Warehouse", value: "main" },
                { label: "Secondary Warehouse", value: "secondary" },
              ]}
            />
          </Form.Item>

          <Form.Item
            name="type"
            label="Type"
            rules={[{ required: true, message: "Please select a type" }]}
            className="col-span-2"
          >
            <Select
              placeholder="Select type"
              options={[
                { label: "Rack", value: "rack" },
                { label: "Compartment", value: "compartment" },
                { label: "Shelf", value: "shelf" },
              ]}
            />
          </Form.Item>
          <div className="col-span-2 grid grid-cols-3 gap-x-4">
            <Form.Item
              name="active"
              label="Status"
              valuePropName="checked"
              initialValue={true}
            >
              <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
            </Form.Item>

            <Form.Item
              name="area"
              label="Area (sqft)"
              rules={[{ required: true, message: "Please enter area" }]}
            >
              <InputNumber
                style={{ width: "100%" }}
                min={1}
                className="w-full"
                placeholder="Enter area in square feet"
              />
            </Form.Item>

            <Form.Item name="capacity" label="Capacity (optional)">
              <InputNumber
                style={{ width: "100%" }}
                min={0}
                className="w-full"
                placeholder="e.g. 50 parcels"
              />
            </Form.Item>
          </div>

          <Form.Item
            className="col-span-2"
            name="notes"
            label="Useful Information"
          >
            <TextArea
              rows={3}
              placeholder="e.g. For fragile or high-value items"
            />
          </Form.Item>
        </div>

        <div className="flex justify-end">
          <Button type="primary" htmlType="submit" loading={loading}>
            Save Rack
          </Button>
        </div>
      </Form>
    </Card>
  );
}
