import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import DynamicFormField from "@/components/ui/formFields/DynamicFormField";

const ShipmentDetails = () => {
  return (
    <ResponsiveCard size="small" title="Shipment Details">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4">
        <DynamicFormField
          name={["shipment_details", "order_type"]}
          label="Order Type"
          componentType="select"
          required={true}
          options={[
            { label: "COD", value: "COD" },
            { label: "Prepaid", value: "PREPAID" },
          ]}
        />

        <DynamicFormField
          name={["shipment_details", "invoice_value"]}
          label="Invoice Value"
          componentType="number"
          required={true}
          min={0}
        />

        <DynamicFormField
          name={["shipment_details", "invoice_number"]}
          label="Invoice Number"
          componentType="input"
          required={true}
        />

        <DynamicFormField
          name={["shipment_details", "invoice_date"]}
          label="Invoice Date"
          componentType="date"
          required={true}
          fieldProps={{ format: "YYYY-MM-DD" }}
        />

        <DynamicFormField
          name={["shipment_details", "reference_number"]}
          label="Reference Number"
          componentType="input"
          required={true}
        />

        <DynamicFormField
          name={["shipment_details", "length"]}
          label="Length"
          componentType="number"
          required={true}
          min={0}
        />

        <DynamicFormField
          name={["shipment_details", "breadth"]}
          label="Breadth"
          componentType="number"
          required={true}
          min={0}
        />

        <DynamicFormField
          name={["shipment_details", "weight"]}
          label="Weight"
          componentType="number"
          required={true}
          min={0}
        />

        <DynamicFormField
          name={["shipment_details", "height"]}
          label="Height"
          componentType="number"
          required={true}
          min={0}
        />

        <DynamicFormField
          name={["shipment_details", "cod_value"]}
          label="COD Value"
          componentType="number"
          required={true}
          min={0}
        />

        <DynamicFormField
          name={["shipment_details", "courier_partner"]}
          label="Courier Partner"
          componentType="input"
          required={true}
        />

        <DynamicFormField
          name={["shipment_details", "account_code"]}
          label="Account Code"
          componentType="input"
          required={true}
        />

        <DynamicFormField
          name={["shipment_details", "order_id"]}
          label="Order ID"
          componentType="input"
          required={true}
        />
      </div>
    </ResponsiveCard>
  );
};

export default ShipmentDetails;
