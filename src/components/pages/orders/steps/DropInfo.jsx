import { Form, Select } from "antd";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import DynamicFormField from "@/components/ui/formFields/DynamicFormField";

const DropInfo = () => {
  return (
    <ResponsiveCard size="small" title="Drop Information">
      <Form.Item
        wrapperCol={{ span: 6 }}
        name={["drop_info", "Warehouses"]}
        label="Warehouses"
      >
        <Select placeholder="Select warehouse" />
      </Form.Item>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4">
        <DynamicFormField
          name={["drop_info", "drop_address"]}
          label="Address"
          required
        />
        <DynamicFormField
          name={["drop_info", "drop_phone"]}
          label="Phone"
          required
        />
        <DynamicFormField
          name={["drop_info", "drop_country"]}
          label="Country"
          required
        />
        <DynamicFormField
          name={["drop_info", "drop_state"]}
          label="State"
          required
        />
        <DynamicFormField
          name={["drop_info", "drop_pincode"]}
          label="Pincode"
          required
        />
        <DynamicFormField
          name={["drop_info", "drop_city"]}
          label="City"
          required
        />
        <DynamicFormField
          name={["drop_info", "drop_name"]}
          label="Name"
          required
        />
        <DynamicFormField
          name={["drop_info", "drop_email"]}
          label="Email"
          required
          type="email"
        />
        <DynamicFormField
          name={["drop_info", "drop_lat"]}
          label="Latitude"
          required
          componentType="number"
        />
        <DynamicFormField
          name={["drop_info", "drop_long"]}
          label="Longitude"
          required
          componentType="number"
        />
        <DynamicFormField
          name={["drop_info", "drop_organisation"]}
          label="Organisation"
        />
        <DynamicFormField
          name={["drop_info", "drop_district"]}
          label="District"
        />
        <DynamicFormField
          name={["drop_info", "drop_landmark"]}
          label="Landmark"
        />
        <DynamicFormField
          name={["drop_info", "drop_start_time"]}
          label="Start Time"
          componentType="date"
        />
        <DynamicFormField
          name={["drop_info", "drop_end_time"]}
          label="End Time"
          componentType="date"
        />
        <DynamicFormField
          name={["drop_info", "drop_address_type"]}
          label="Address Type"
          options={[
            { value: "RESIDENTIAL", label: "Residential" },
            { value: "OFFICE", label: "Office" },
            { value: "WAREHOUSE", label: "Warehouse" },
          ]}
          componentType="select"
        />
        <DynamicFormField
          name={["drop_info", "drop_vendor_code"]}
          label="Vendor Code"
        />
        <DynamicFormField
          name={["drop_info", "location_type"]}
          label="Vendor Code"
        />
        <DynamicFormField
          name={["drop_info", "location_value"]}
          label="Location Value"
        />
      </div>
    </ResponsiveCard>
  );
};

export default DropInfo;
