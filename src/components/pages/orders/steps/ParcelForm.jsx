import DynamicFormField from "@/components/ui/DynamicFormField";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import { Form, Select } from "antd";

const ParcelForm = () => {
  return (
    <ResponsiveCard title="Parcel" size="small">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4">
        <DynamicFormField
          name={["shipment_details", "reference_number"]}
          label="Reference Number"
          placeholder="Enter Reference Number"
          required={true}
        />
        <DynamicFormField
          name={["shipment_details", "invoice_date"]}
          label="Invoice Date"
          placeholder="Enter Invoice Date"
          componentType="date"
          required={true}
          fieldProps={{ format: "DD-MM-YYYY" }}
        />

        <Form.Item
          rules={[{ required: true, message: "Please enter Carrier Partner" }]}
          name={["shipment_details", "courier_partner"]}
          label={"Carrier Partner"}
        >
          <Select
            style={{ minWidth: 150 }}
            options={[
              { label: "SELF - Self Demo", value: "self" },
              { label: "Bluedart - Bluedart", value: "BLUEDART" },
              { label: "DTDC - PP <> DTDC", value: "DTDC" },
            ]}
            placeholder="Carrier Partner"
          />
        </Form.Item>
        <DynamicFormField
          name={["shipment_details", "invoice_number"]}
          label="Invoice Number"
          placeholder="Enter Invoice Number"
          required={true}
        />
        <DynamicFormField
          name={["shipment_details", "length"]}
          label="Length"
          placeholder="Enter Length"
          required={true}
          componentType="number"
        />
        <DynamicFormField
          name={["shipment_details", "breadth"]}
          label="Breadth"
          placeholder="Enter Breadth"
          required={true}
          componentType="number"
        />
        <DynamicFormField
          name={["shipment_details", "height"]}
          label="Height"
          placeholder="Enter Height"
          required={true}
          componentType="number"
        />
        <DynamicFormField
          name={["shipment_details", "weight"]}
          label="Weight"
          placeholder="Enter Weight"
          required={true}
          componentType="number"
        />

        {/* Payment Mode */}
        <Form.Item
          name={["shipment_details", "payment_mode"]}
          label={"Payment Mode"}
        >
          <Select
            style={{ minWidth: 150 }}
            options={[
              { label: "Prepaid", value: "PREPAID" },
              { label: "COD", value: "COD" },
            ]}
            placeholder="Payment Mode"
          />
        </Form.Item>
        <DynamicFormField
          name={["shipment_details", "cod_amount"]}
          label="COD Amount"
          placeholder="Enter COD Amount"
          required={true}
          componentType="number"
        />
        <DynamicFormField
          name={["shipment_details", "invoice_value"]}
          label="Invoice Value"
          placeholder="Enter Invoice Value"
          required={true}
          componentType="number"
        />
        <DynamicFormField
          name={["shipment_details", "vendor_code"]}
          label="Vendor Code"
          placeholder="Enter Vendor Code"
        />
        <DynamicFormField
          name={["shipment_details", "channel_name"]}
          label="Channel Name"
          placeholder="Enter Channel Name"
          required={true}
        />
      </div>

      {/* <ItemDetails /> */}
    </ResponsiveCard>
  );
};

export default ParcelForm;
