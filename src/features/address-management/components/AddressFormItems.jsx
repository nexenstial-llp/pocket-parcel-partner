import { Form, Input, Select, Switch } from "antd";
import GoogleAddressPicker from "@/components/ui/GoogleAddressPicker";

const { Option } = Select;
const AddressFormItems = () => {
  const form = Form.useFormInstance();

  return (
    <div>
      {/* Label & Name */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4">
        <Form.Item
          label="Label"
          name="label"
          rules={[{ required: true, message: "Label is required" }]}
        >
          <Input placeholder="Home, Office, etc." />
        </Form.Item>

        <Form.Item
          label="Full Name"
          name="full_name"
          rules={[{ required: true, message: "Full name is required" }]}
        >
          <Input placeholder="Full user name" />
        </Form.Item>
        {/* Phone */}
        <Form.Item
          label="Phone Number"
          name="phone_number"
          rules={[{ required: true, message: "Phone number is required" }]}
        >
          <Input placeholder="Please enter phone number" />
        </Form.Item>
      </div>
      {/* Address Lines */}
      <Form.Item
        label="Address Line 1"
        name="address_line1"
        rules={[{ required: true, message: "Address Line 1 is required" }]}
      >
        <Input placeholder="House No, Street…" />
      </Form.Item>
      <Form.Item label="Address Line 2" name="address_line2">
        <Input placeholder="Apartment, floor, etc." />
      </Form.Item>

      <Form.Item label="Landmark" name="landmark">
        <GoogleAddressPicker
          showMap={false}
          onLocationSelect={(loc) => {
            form.setFieldsValue({
              latitude: loc.lat,
              longitude: loc.lng,
              landmark: loc.address,
              pincode: loc.pincode,
              city: loc.city,
              state: loc.state,
              country: loc.country,
            });
          }}
        />
      </Form.Item>
      {/* City, State, Pincode */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Form.Item
          label="City"
          name="city"
          rules={[{ required: true, message: "City is required" }]}
        >
          <Input placeholder="City" />
        </Form.Item>

        <Form.Item
          label="State"
          name="state"
          rules={[{ required: true, message: "State is required" }]}
        >
          <Input placeholder="State" />
        </Form.Item>

        <Form.Item
          label="Pincode"
          name="pincode"
          rules={[{ required: true, message: "Pincode is required" }]}
        >
          <Input placeholder="560001" />
        </Form.Item>
      </div>
      {/* Country & Landmark */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Form.Item
          label="Country"
          name="country"
          initialValue="India"
          rules={[{ required: true, message: "Country is required" }]}
        >
          <Input placeholder="Country" />
        </Form.Item>
      </div>

      {/* Hidden Lat/Long fields to store values */}
      <Form.Item name="latitude" hidden>
        <Input />
      </Form.Item>
      <Form.Item name="longitude" hidden>
        <Input />
      </Form.Item>

      {/* Address Type & Default */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Form.Item
          label="Address Type"
          name="address_type"
          initialValue="HOME"
          rules={[{ required: true, message: "Address type is required" }]}
        >
          <Select>
            <Option value="HOME">Home</Option>
            <Option value="OFFICE">Office</Option>
            <Option value="OTHER">Other</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Is Default?"
          name="is_default"
          valuePropName="checked"
          initialValue={true}
        >
          <Switch />
        </Form.Item>
      </div>
    </div>
  );
};

export default AddressFormItems;
