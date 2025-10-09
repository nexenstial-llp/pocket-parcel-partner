import { Form, Input, Select } from "antd";
import { PhoneOutlined } from "@ant-design/icons";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";

const { Option } = Select;
const ReturnInfo = () => {
  return (
    <ResponsiveCard size="small" title="Return Info" className="shadow-sm">
      <div className="grid grid-cols-4 gap-x-4">
        <Form.Item name={["additional", "return_info", "name"]} label="Name">
          <Input placeholder="Enter drop name" />
        </Form.Item>
        <Form.Item name={["additional", "return_info", "phone"]} label="Phone">
          <Input prefix={<PhoneOutlined />} placeholder="Enter phone number" />
        </Form.Item>

        <Form.Item
          name={["additional", "return_info", "address"]}
          label="Address"
        >
          <Input placeholder="Enter complete address" />
        </Form.Item>

        <Form.Item
          name={["additional", "return_info", "pincode"]}
          label="Pincode"
        >
          <Input placeholder="Enter pincode" />
        </Form.Item>
        <Form.Item name={["additional", "return_info", "city"]} label="City">
          <Input placeholder="Enter city" />
        </Form.Item>
        <Form.Item name={["additional", "return_info", "state"]} label="State">
          <Input placeholder="Enter state" />
        </Form.Item>
        <Form.Item
          name={["additional", "return_info", "country"]}
          label="Country Code"
        >
          <Select placeholder="Select country">
            <Option value="India">India</Option>
            <Option value="USA">USA</Option>
            <Option value="UK">UK</Option>
          </Select>
        </Form.Item>
      </div>
    </ResponsiveCard>
  );
};

export default ReturnInfo;
