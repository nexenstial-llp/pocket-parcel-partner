import DynamicFormField from "@/components/ui/DynamicFormField";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";

const GstInfo = () => {
  return (
    <ResponsiveCard title={"GST"}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4">
        <DynamicFormField
          name={["gst_info", "seller_gstin"]}
          label="Seller GSTIN"
          placeholder="e.g., 1234"
        />
        <DynamicFormField
          name={["gst_info", "enterprise_gstin"]}
          label="Enterprise GSTIN (Your GST)"
          placeholder="e.g., 13"
        />
        <DynamicFormField
          name={["gst_info", "consignee_gstin"]}
          label="Consignee GSTIN"
          placeholder="e.g., 1233"
        />
        <DynamicFormField
          name={["gst_info", "invoice_reference"]}
          label="Invoice Reference (ID)"
          placeholder="e.g., 1234"
        />
        <DynamicFormField
          name={["gst_info", "place_of_supply"]}
          label="Supply Place"
          componentType="select"
          options={[{ label: "KARNATAKA", value: "KARNATAKA" }]}
          placeholder="Select state"
        />
        <DynamicFormField
          componentType="number"
          name={["gst_info", "hsn_code"]}
          label="HSN Code"
          placeholder="e.g., 1234"
        />
        <DynamicFormField
          componentType="number"
          name={["gst_info", "taxable_value"]}
          label="Taxable Value"
          placeholder="e.g., 100.55"
        />
        <DynamicFormField
          componentType="number"
          name={["gst_info", "sgst_amount"]}
          label="SGST Amount"
          placeholder="e.g., 100"
        />
        <DynamicFormField
          componentType="number"
          name={["gst_info", "igst_amount"]}
          label="IGST Amount"
          placeholder="e.g., 100"
        />
        <DynamicFormField
          componentType="number"
          name={["gst_info", "cgst_amount"]}
          label="CGST Amount"
          placeholder="e.g., 200"
        />
        <DynamicFormField
          componentType="number"
          name={["gst_info", "gst_discount"]}
          label="GST Discount"
          placeholder="e.g., 0"
        />
        <DynamicFormField
          componentType="number"
          name={["gst_info", "gst_tax_base"]}
          label="GST Tax Base"
          placeholder="e.g., 200"
        />
        <DynamicFormField
          componentType="number"
          name={["gst_info", "ewaybill_serial_number"]}
          label="E-way Bill Serial No."
          placeholder="e.g., 2345677"
        />
        <DynamicFormField
          componentType="select"
          name={["gst_info", "is_seller_registered_under_gst"]}
          label="Is Seller Registered under GST?"
          placeholder="Select"
          options={[
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" },
          ]}
        />
        <DynamicFormField
          componentType="number"
          name={["gst_info", "invoice_value"]}
          label="Total Invoice Value"
          placeholder="e.g., 1000"
          required={true}
        />
      </div>
    </ResponsiveCard>
  );
};

export default GstInfo;
