/* eslint-disable react/prop-types */
import { Form, Input, Select, Checkbox } from "antd";
import GoogleAddressPicker from "@/components/ui/GoogleAddressPicker";
import { useEffect, useCallback } from "react";

const AddressFormItems = ({ prefix }) => {
  const form = Form.useFormInstance();
  const addressTypeField = prefix ? [prefix, "address_type"] : "address_type";
  const address_type = Form.useWatch(addressTypeField, form);

  // Helper to format field names with optional prefix
  const getFieldName = useCallback(
    (name) => (prefix ? [prefix, name] : name),
    [prefix]
  );

  useEffect(() => {
    if (address_type !== "OTHERS") {
      form.resetFields([getFieldName("custom_address_type")]);
    }
  }, [address_type, form, getFieldName]);

  return (
    <div>
      {/* Label & Name */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
        <Form.Item
          label="Full Name"
          name={getFieldName("full_name")}
          rules={[{ required: true, message: "Full name is required" }]}
        >
          <Input placeholder="Full user name" />
        </Form.Item>
        {/* Phone */}
        <Form.Item
          label="Phone Number"
          name={getFieldName("phone_number")}
          rules={[{ required: true, message: "Phone number is required" }]}
        >
          <Input placeholder="Please enter phone number" />
        </Form.Item>

        {/* Email */}
        <Form.Item
          label="Email"
          name={getFieldName("email")}
          rules={[{ required: true, message: "Email is required" }]}
        >
          <Input placeholder="Please enter email" />
        </Form.Item>
        <Form.Item label="House Number" name={getFieldName("house_number")}>
          <Input placeholder="Please enter house number" />
        </Form.Item>
      </div>
      <div className="grid grid-cols-1 gap-x-4">
        {/* Address Lines */}
        <Form.Item
          label="Address Line 1"
          name={getFieldName("address_line1")}
          rules={[{ required: true, message: "Address Line 1 is required" }]}
        >
          <Input.TextArea rows={2} placeholder="House No, Street…" />
        </Form.Item>
        <Form.Item label="Address Line 2" name={getFieldName("address_line2")}>
          <Input.TextArea rows={2} placeholder="Apartment, floor, etc." />
        </Form.Item>
      </div>

      <Form.Item
        label="Landmark"
        name={getFieldName("landmark")}
        rules={[{ required: true, message: "Landmark is required" }]}
      >
        <GoogleAddressPicker
          showMap={false}
          onLocationSelect={(loc) => {
            const updates = {
              latitude: loc.lat,
              longitude: loc.lng,
              landmark: loc.address,
              pincode: loc.pincode,
              city: loc.city,
              state: loc.state,
              country: loc.country,
            };

            const fields = {};
            Object.keys(updates).forEach((key) => {
              // Antd setFieldsValue handles nested objects if we structure it { prefix: { field: value } }
              // But since we use array paths [prefix, field] in names, we should ideally set it that way?
              // setFieldsValue({ [prefix]: { field: value } }) works for name={[prefix, field]}
              if (prefix) {
                if (!fields[prefix]) fields[prefix] = {};
                fields[prefix][key] = updates[key];
              } else {
                fields[key] = updates[key];
              }
            });

            // If we have prefix, we construct the nested object.
            // setFieldsValue performs a deep merge.
            form.setFieldsValue(fields);
          }}
        />
      </Form.Item>
      {/* City, State, Pincode */}
      <div className="grid grid-cols-1 md:grid-cols-3  gap-4">
        <Form.Item
          label="Pincode"
          name={getFieldName("pincode")}
          rules={[{ required: true, message: "Pincode is required" }]}
        >
          <Input placeholder="Pincode" />
        </Form.Item>
        <Form.Item
          label="City"
          name={getFieldName("city")}
          rules={[{ required: true, message: "City is required" }]}
        >
          <Input readOnly placeholder="City" />
        </Form.Item>

        <Form.Item
          label="State"
          name={getFieldName("state")}
          rules={[{ required: true, message: "State is required" }]}
        >
          <Input readOnly placeholder="State" />
        </Form.Item>
        <Form.Item
          label="Country"
          name={getFieldName("country")}
          rules={[{ required: true, message: "Country is required" }]}
        >
          <Input readOnly placeholder="Country" />
        </Form.Item>
        <Form.Item
          label="Label"
          name={getFieldName("label")}
          rules={[{ required: true, message: "Label is required" }]}
        >
          <Input placeholder="Home, Office, etc." />
        </Form.Item>

        <Form.Item
          label="Address Type"
          name={getFieldName("address_type")}
          initialValue="HOME"
          rules={[{ required: true, message: "Address type is required" }]}
        >
          <Select
            placeholder="Select Address Type"
            options={[
              { value: "HOME", label: "Home" },
              { value: "WORK", label: "Work" },
              { value: "OTHERS", label: "Others" },
            ]}
          />
        </Form.Item>

        {address_type === "OTHERS" && (
          <Form.Item
            label="Custom Address Type"
            name={getFieldName("custom_address_type")}
            rules={[
              { required: true, message: "Custom address type is required" },
            ]}
          >
            <Input placeholder="Custom address type" />
          </Form.Item>
        )}
        {/* <Form.Item
          label="Is Default?"
          name="is_default"
          valuePropName="checked"
          initialValue={true}
        >
          <Switch />
        </Form.Item> */}
        <Form.Item
          name={getFieldName("save_address")}
          valuePropName="checked"
          initialValue={false}
        >
          <Checkbox>Save this address</Checkbox>
        </Form.Item>
      </div>

      {/* Hidden Lat/Long fields to store values */}
      <Form.Item name={getFieldName("latitude")} hidden>
        <Input />
      </Form.Item>
      <Form.Item name={getFieldName("longitude")} hidden>
        <Input />
      </Form.Item>
    </div>
  );
};

export default AddressFormItems;
