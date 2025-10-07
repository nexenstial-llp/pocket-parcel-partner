import { Form, Input, Select } from "antd";
import { PhoneOutlined, MailOutlined } from "@ant-design/icons";
import ResponsiveCard from "@/components/ui/ResponsiveCard";

const { Option } = Select;
const DropInfo = () => {
  return (
    <ResponsiveCard size="small" title="Drop Information" className="shadow-sm">
      <Form.Item
        wrapperCol={{ span: 6 }}
        name={["drop_info", "Warehouses"]}
        label="Warehouses"
      >
        <Select placeholder="Select warehouse" />
      </Form.Item>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4">
        <Form.Item
          name={["drop_info", "drop_name"]}
          label="Name"
          rules={[{ required: true, message: "Please enter drop name" }]}
        >
          <Input placeholder="Enter drop name" />
        </Form.Item>
        <Form.Item
          name={["drop_info", "drop_phone"]}
          label="Phone"
          rules={[
            { required: true, message: "Please enter phone number" },
            {
              pattern: /^[0-9]{10}$/,
              message: "Please enter valid phone number",
            },
          ]}
        >
          <Input prefix={<PhoneOutlined />} placeholder="Enter phone number" />
        </Form.Item>
        <Form.Item
          name={["drop_info", "email"]}
          label="Email"
          rules={[
            { required: true, message: "Please enter email" },
            { type: "email", message: "Please enter valid email" },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Enter email" />
        </Form.Item>
        <Form.Item
          name={["drop_info", "drop_address"]}
          label="Address"
          rules={[{ required: true, message: "Please enter address" }]}
        >
          <Input placeholder="Enter complete address" />
        </Form.Item>

        <Form.Item
          name={["drop_info", "drop_pincode"]}
          label="Pincode"
          rules={[{ required: true, message: "Please enter pincode" }]}
        >
          <Input placeholder="Enter pincode" />
        </Form.Item>
        <Form.Item
          name={["drop_info", "drop_city"]}
          label="City"
          rules={[{ required: true, message: "Please enter city" }]}
        >
          <Input placeholder="Enter city" />
        </Form.Item>
        <Form.Item
          name={["drop_info", "drop_state"]}
          label="State"
          rules={[{ required: true, message: "Please enter state" }]}
        >
          <Input placeholder="Enter state" />
        </Form.Item>
        <Form.Item
          name={["drop_info", "drop_country"]}
          label="Country"
          rules={[{ required: true, message: "Please select country" }]}
        >
          <Select placeholder="Select country">
            <Option value="India">India</Option>
            <Option value="USA">USA</Option>
            <Option value="UK">UK</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name={["drop_info", "address_type"]}
          label="Address Type"
          rules={[{ required: true, message: "Please Address Type" }]}
        >
          <Select placeholder="Select country">
            <Option value="RESIDENTIAL">RESIDENTIAL</Option>
            <Option value="OFFICE">OFFICE</Option>
          </Select>
        </Form.Item>
        <Form.Item name={["drop_info", "drop_vendor_code"]} label="Vendor Code">
          <Input placeholder="Enter Vendor code" />
        </Form.Item>
        <Form.Item name={["drop_info", "drop_lat"]} label="Latitude">
          <Input placeholder="Enter TIN number" />
        </Form.Item>
        <Form.Item name={["drop_info", "drop_long"]} label="Longitude">
          <Input placeholder="Enter TIN number" />
        </Form.Item>
      </div>
    </ResponsiveCard>
  );
};

export default DropInfo;
