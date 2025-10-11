import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import DynamicFormField from "@/components/ui/formFields/DynamicFormField";

const ForwardGSTInfo = () => {
  return (
    <ResponsiveCard size="small" title="GST Info">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4">
        <DynamicFormField
          name={["gst_info", "seller_gstin"]}
          label="Seller GSTIN"
          componentType="input"
          required
        />

        <DynamicFormField
          name={["gst_info", "taxable_value"]}
          label="Taxable Value"
          componentType="number"
          required
          min={0}
        />

        <DynamicFormField
          name={["gst_info", "ewaybill_serial_number"]}
          label="E-waybill Serial Number"
          componentType="input"
        />

        <DynamicFormField
          name={["gst_info", "is_seller_registered_under_gst"]}
          label="Seller Registered Under GST"
          componentType="switch"
          valuePropName="checked"
        />

        <DynamicFormField
          name={["gst_info", "sgst_tax_rate"]}
          label="SGST Tax Rate"
          componentType="number"
        />

        <DynamicFormField
          name={["gst_info", "place_of_supply"]}
          label="Place of Supply"
          componentType="input"
        />

        <DynamicFormField
          name={["gst_info", "gst_discount"]}
          label="GST Discount"
          componentType="number"
        />

        <DynamicFormField
          name={["gst_info", "hsn_code"]}
          label="HSN Code"
          componentType="input"
        />

        <DynamicFormField
          name={["gst_info", "sgst_amount"]}
          label="SGST Amount"
          componentType="number"
        />

        <DynamicFormField
          name={["gst_info", "enterprise_gstin"]}
          label="Enterprise GSTIN"
          componentType="input"
        />

        <DynamicFormField
          name={["gst_info", "gst_total_tax"]}
          label="GST Total Tax"
          componentType="number"
        />

        <DynamicFormField
          name={["gst_info", "igst_amount"]}
          label="IGST Amount"
          componentType="number"
        />

        <DynamicFormField
          name={["gst_info", "cgst_amount"]}
          label="CGST Amount"
          componentType="number"
        />

        <DynamicFormField
          name={["gst_info", "gst_tax_base"]}
          label="GST Tax Base"
          componentType="number"
        />

        <DynamicFormField
          name={["gst_info", "consignee_gstin"]}
          label="Consignee GSTIN"
          componentType="input"
        />

        <DynamicFormField
          name={["gst_info", "igst_tax_rate"]}
          label="IGST Tax Rate"
          componentType="number"
        />

        <DynamicFormField
          name={["gst_info", "invoice_reference"]}
          label="Invoice Reference"
          componentType="input"
        />

        <DynamicFormField
          name={["gst_info", "cgst_tax_rate"]}
          label="CGST Tax Rate"
          componentType="number"
        />

        <DynamicFormField
          name={["gst_info", "invoice_number"]}
          label="Invoice Number"
          componentType="input"
        />

        <DynamicFormField
          name={["gst_info", "invoice_date"]}
          label="Invoice Date"
          componentType="datePicker"
          format="YYYY-MM-DD"
        />

        <DynamicFormField
          name={["gst_info", "invoice_value"]}
          label="Invoice Value"
          componentType="number"
        />

        <DynamicFormField
          name={["gst_info", "seller_name"]}
          label="Seller Name"
          componentType="input"
        />

        <DynamicFormField
          name={["gst_info", "seller_address"]}
          label="Seller Address"
          componentType="input"
        />

        <DynamicFormField
          name={["gst_info", "seller_state"]}
          label="Seller State"
          componentType="input"
        />

        <DynamicFormField
          name={["gst_info", "seller_pincode"]}
          label="Seller Pincode"
          componentType="input"
        />
      </div>
    </ResponsiveCard>
  );
};

export default ForwardGSTInfo;
