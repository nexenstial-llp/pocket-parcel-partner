// components/steps/PickupInfoForm.jsx
import { Form, Input, Select } from "antd";
import { PhoneOutlined, MailOutlined } from "@ant-design/icons";
import ResponsiveCard from "@/components/ui/ResponsiveCard";
import DynamicFormField from "@/components/ui/DynamicFormField";

const { Option } = Select;

const PickupInfoForm = () => {
  return (
    <ResponsiveCard
      size="small"
      title="Pickup Information"
      className="shadow-sm"
    >
      <DynamicFormField
        name={["pickup_info", "pickup_time"]}
        label="Pickup Time"
        componentType="date"
        required={false}
        formProps={{ wrapperCol: { span: 6 } }}
        fieldProps={{ format: "DD-MM-YYYY hh:mm", showTime: true }}
      />

      <Form.Item
        wrapperCol={{ span: 6 }}
        name={["pickup_info", "Warehouses"]}
        label="Warehouses"
      >
        <Select placeholder="Select warehouse" />
      </Form.Item>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4">
        <DynamicFormField
          name={["pickup_info", "pickup_name"]}
          label="Name"
          required={true}
          placeholder="Enter pickup name"
        />
        {/* <Form.Item
          name={["pickup_info", "pickup_name"]}
          label="Name"
          rules={[{ required: true, message: "Please enter pickup name" }]}
        >
          <Input placeholder="Enter pickup name" />
        </Form.Item> */}
        <Form.Item
          name={["pickup_info", "pickup_phone"]}
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
          name={["pickup_info", "email"]}
          label="Email"
          rules={[
            { required: true, message: "Please enter email" },
            { type: "email", message: "Please enter valid email" },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Enter email" />
        </Form.Item>
        <Form.Item
          name={["pickup_info", "pickup_address"]}
          label="Address"
          rules={[{ required: true, message: "Please enter address" }]}
        >
          <Input placeholder="Enter complete address" />
        </Form.Item>

        <Form.Item
          name={["pickup_info", "pickup_pincode"]}
          label="Pincode"
          rules={[{ required: true, message: "Please enter pincode" }]}
        >
          <Input placeholder="Enter pincode" />
        </Form.Item>
        <Form.Item
          name={["pickup_info", "pickup_city"]}
          label="City"
          rules={[{ required: true, message: "Please enter city" }]}
        >
          <Input placeholder="Enter city" />
        </Form.Item>
        <Form.Item
          name={["pickup_info", "pickup_state"]}
          label="State"
          rules={[{ required: true, message: "Please enter state" }]}
        >
          <Input placeholder="Enter state" />
        </Form.Item>
        <Form.Item
          name={["pickup_info", "pickup_country"]}
          label="Country"
          rules={[{ required: true, message: "Please select country" }]}
        >
          <Select placeholder="Select country">
            <Option value="India">India</Option>
            <Option value="USA">USA</Option>
            <Option value="UK">UK</Option>
          </Select>
        </Form.Item>
        <Form.Item name={["pickup_info", "tin"]} label="TIN Number">
          <Input placeholder="Enter TIN number" />
        </Form.Item>
        <Form.Item name={["pickup_info", "pickup_lat"]} label="Latitude">
          <Input placeholder="Enter TIN number" />
        </Form.Item>
        <Form.Item name={["pickup_info", "pickup_long"]} label="Longitude">
          <Input placeholder="Enter TIN number" />
        </Form.Item>
      </div>
    </ResponsiveCard>
  );
};

export default PickupInfoForm;
