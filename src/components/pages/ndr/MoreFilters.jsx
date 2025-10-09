/* eslint-disable react/prop-types */
import { Checkbox, Form, Input, Space } from "antd";

const MoreFilters = ({ form }) => {
  return (
    <div>
      <Form form={form} layout="vertical">
        <Form.Item name={"ofd_count"} label="Delivery Attempts">
          <Checkbox.Group
            options={[
              { value: 0, label: 0 },
              { label: 1, value: 1 },
              { label: 2, value: 2 },
              { label: 3, value: 3 },
              { label: 4, value: 4 },
              { label: 5, value: 5 },
            ]}
          />
        </Form.Item>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {/* Customer Feedback */}
          <Form.Item name={"customer_feed_present"} label="Customer Feedback">
            <Checkbox.Group
              options={[
                { value: true, label: "Yes" },
                { value: false, label: "No" },
              ]}
            />
          </Form.Item>
          {/* Operation Feedback */}
          <Form.Item name={"ops_feed_present"} label="Operation Feedback">
            <Checkbox.Group
              options={[
                { value: true, label: "Yes" },
                { value: false, label: "No" },
              ]}
            />
          </Form.Item>
          {/* Payment Mode */}
          <Form.Item name={"cod"} label="Payment Mode">
            <Checkbox.Group
              options={[
                { label: "COD", value: 2 },
                { label: "Prepaid", value: 1 },
              ]}
            />
          </Form.Item>
        </div>
        {/* Tracking Status */}
        <Form.Item name={"tracking_status"} label="Tracking Status">
          <Checkbox.Group
            options={[
              { label: "Out for delivery", value: "OUT_FOR_DELIVERY" },
              { label: "Failed delivery", value: "FAILED_DELIVERY" },
              { label: "Rto", value: "RTO" },
              { label: "In Transit", value: "IN_TRANSIT" },
            ]}
          />
        </Form.Item>
        {/* No of follow-ups */}
        <Form.Item name={"no_of_followups"} label="No of follow-ups">
          <Checkbox.Group
            options={[
              { value: 0, label: 0 },
              { label: 1, value: 1 },
              { label: 2, value: 2 },
              { label: 3, value: 3 },
              { label: "4 and above", value: 4 },
            ]}
          />
        </Form.Item>
      </Form>
      {/* order value range */}
      <Form.Item
        tooltip="Minimum and Maximum order value filter"
        layout="vertical"
        label="Order Value"
      >
        <Space>
          <Form.Item name={"min_invoice_value"} label="Minimum Value">
            <Input
              type="number"
              placeholder="Enter Value"
              className="rounded-lg border border-gray-300"
              data-test="min_invoice_value_label"
            />
          </Form.Item>
          <Form.Item name={"max_invoice_value"} label="Maximum Value">
            <Input
              type="number"
              placeholder="Enter Value"
              className="rounded-lg border border-gray-300"
              data-test="max_invoice_value_label"
            />
          </Form.Item>
        </Space>
      </Form.Item>
    </div>
  );
};

export default MoreFilters;
