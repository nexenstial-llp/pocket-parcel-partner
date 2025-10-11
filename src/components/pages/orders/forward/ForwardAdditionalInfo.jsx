import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import DynamicFormField from "@/components/ui/formFields/DynamicFormField";

const ForwardAdditionalInfo = () => {
  return (
    <ResponsiveCard size="small" title="Additional Info">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4">
        <DynamicFormField
          name={["additional", "label"]}
          label="Label"
          componentType="switch"
          valuePropName="checked"
        />

        <DynamicFormField
          name={["additional", "return_info", "pincode"]}
          label="Return Pincode"
          componentType="input"
        />

        <DynamicFormField
          name={["additional", "return_info", "address"]}
          label="Return Address"
          componentType="input"
        />

        <DynamicFormField
          name={["additional", "return_info", "state"]}
          label="Return State"
          componentType="input"
        />

        <DynamicFormField
          name={["additional", "return_info", "phone"]}
          label="Return Phone"
          componentType="input"
        />

        <DynamicFormField
          name={["additional", "return_info", "name"]}
          label="Return Name"
          componentType="input"
        />

        <DynamicFormField
          name={["additional", "return_info", "city"]}
          label="Return City"
          componentType="input"
        />

        <DynamicFormField
          name={["additional", "return_info", "country"]}
          label="Return Country"
          componentType="input"
        />

        <DynamicFormField
          name={["additional", "return_info", "lat"]}
          label="Return Latitude"
          componentType="number"
          min={0}
        />

        <DynamicFormField
          name={["additional", "return_info", "long"]}
          label="Return Longitude"
          componentType="number"
          min={0}
        />

        <DynamicFormField
          name={["additional", "return_info", "district"]}
          label="Return District"
          componentType="input"
        />

        <DynamicFormField
          name={["additional", "return_info", "landmark"]}
          label="Return Landmark"
          componentType="input"
        />

        <DynamicFormField
          name={["additional", "return_info", "email"]}
          label="Return Email"
          componentType="input"
        />

        <DynamicFormField
          name={["additional", "async"]}
          label="Async Processing"
          componentType="switch"
          valuePropName="checked"
        />

        <DynamicFormField
          name={["additional", "gst_number"]}
          label="GST Number"
          componentType="input"
        />

        <DynamicFormField
          name={["additional", "channel_name"]}
          label="Channel Name"
          componentType="input"
        />

        <DynamicFormField
          name={["additional", "order_date"]}
          label="Order Date"
          componentType="datePicker"
        />

        <DynamicFormField
          name={["additional", "enable_whatsapp"]}
          label="Enable WhatsApp"
          componentType="switch"
          valuePropName="checked"
        />

        <DynamicFormField
          name={["additional", "is_fragile"]}
          label="Is Fragile"
          componentType="switch"
          valuePropName="checked"
        />

        <DynamicFormField
          name={["additional", "is_dangerous"]}
          label="Is Dangerous"
          componentType="switch"
          valuePropName="checked"
        />

        <DynamicFormField
          name={["additional", "zone"]}
          label="Zone"
          componentType="input"
        />

        <DynamicFormField
          name={["additional", "max_edd"]}
          label="Max EDD"
          componentType="number"
          min={0}
        />

        <DynamicFormField
          name={["additional", "min_edd"]}
          label="Min EDD"
          componentType="number"
          min={0}
        />

        <DynamicFormField
          name={["additional", "invoice_base_64"]}
          label="Invoice Base64"
          componentType="textArea"
          rows={3}
        />

        <DynamicFormField
          name={["additional", "is_multi_seller"]}
          label="Is Multi Seller"
          componentType="switch"
          valuePropName="checked"
        />

        <DynamicFormField
          name={["additional", "vendor_code"]}
          label="Vendor Code"
          componentType="input"
        />

        <DynamicFormField
          name={["additional", "store_code"]}
          label="Store Code"
          componentType="input"
        />

        {["udf_1", "udf_2", "udf_3", "udf_4"].map((udf, index) => (
          <DynamicFormField
            key={index}
            name={["additional", "user_defined_field_array", index, "value"]}
            label={`User Defined Field ${index + 1}`}
            componentType="input"
          />
        ))}

        <DynamicFormField
          name={["additional", "estimated_delivery_date"]}
          label="Estimated Delivery Date"
          componentType="datePicker"
        />
      </div>
    </ResponsiveCard>
  );
};

export default ForwardAdditionalInfo;
