import { useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Button,
  DatePicker,
  Switch,
  Select,
  Steps,
  Divider,
  Card,
} from "antd";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import AddressesForm from "./steps/AddressesForm";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";

const { Step } = Steps;
const { Option } = Select;

const defaultItem = {
  sku: "",
  price: 0,
  weight: 0,
  hs_code: "",
  quantity: 1,
  description: "",
  product_id: "",
  variant_id: "",
  barcode: "",
  additional: {
    manufacture_country: "",
    manufacture_country_code: "",
    cat: "",
    images: "",
    product_url: "",
    return_days: 0,
    exchange_days: 0,
    length: 0,
    breadth: 0,
    height: 0,
    brand: "",
    color: "",
    size: "",
    serial_no: "",
    imei: "",
    ean: "",
    sub_category: "",
    return_reason: "",
  },
};

const initialValues = {
  drop_info: {
    drop_lat: 0,
    drop_city: "",
    drop_long: 0,
    drop_name: "",
    drop_email: "",
    drop_phone: "",
    drop_state: "",
    drop_address: "",
    drop_district: "",
    drop_landmark: "",
    drop_pincode: "",
    drop_country: "",
    drop_address_type: "OFFICE",
    drop_vendor_code: "",
  },
  pickup_info: {
    pickup_lat: 0,
    pickup_city: "",
    pickup_long: 0,
    pickup_name: "",
    pickup_time: null,
    email: "",
    pickup_phone: "",
    pickup_state: "",
    pickup_address: "",
    pickup_district: "",
    pickup_landmark: "",
    pickup_pincode: "",
    pickup_country: "",
    tin: "",
    pickup_address_type: "RESIDENTIAL",
  },
  shipment_details: {
    items: [defaultItem],
    height: 0,
    length: 0,
    weight: 0,
    breadth: 0,
    order_id: "",
    cod_value: 0,
    cod_currency_code: "INR",
    order_type: "COD",
    invoice_date: null,
    delivery_type: "RVP",
    invoice_value: 0,
    invoice_number: "",
    courier_partner: "",
    reference_number: "",
    account_code: "",
    reseller_name: "",
  },
  additional: {
    return_info: {
      lat: 0,
      city: "",
      long: 0,
      name: "",
      email: "",
      phone: "",
      state: "",
      address: "",
      district: "",
      landmark: "",
      pincode: "",
      country: "",
    },
    async: false,
    label: true,
    vendor_code: "",
    zone: "",
    min_edd: 0,
    max_edd: 0,
    invoice_base_64: "",
    is_multi_seller: false,
    channel_name: "",
    exchange_address: "",
    exchange_city: "",
    exchange_state: "",
    exchange_country: "",
    exchange_pincode: "",
    exchange_shipment_description: "",
    otp_based_delivery: false,
    inv_url: "",
    pickup_type: "",
    is_fragile: false,
    is_dangerous: false,
    from_wh: "",
    to_wh: "",
    template_id: "",
    template_category: "",
    invoice_reference: "",
    categories: "",
    otp_code: "",
    insured: false,
    customer_id_number: "",
    insurance_amount: 0,
    exchange_rvp_awb: "",
    rvp_reason: "",
    qc_type: "",
    order_date: null,
    user_defined_field_array: [
      { name: "udf_1", type: "String", value: "" },
      { name: "udf_2", type: "String", value: "" },
      { name: "udf_3", type: "String", value: "" },
      { name: "udf_4", type: "String", value: "" },
    ],
  },
  gst_info: {
    seller_gstin: "",
    taxable_value: 0,
    ewaybill_serial_number: "",
    is_seller_registered_under_gst: false,
    sgst_tax_rate: 0,
    place_of_supply: "",
    gst_discount: 0,
    hsn_code: "",
    sgst_amount: 0,
    enterprise_gstin: "",
    gst_total_tax: 0,
    igst_amount: 0,
    cgst_amount: 0,
    gst_tax_base: 0,
    consignee_gstin: "",
    igst_tax_rate: 0,
    cgst_tax_rate: 0,
  },
};

const ReverseShipmentStepperForm = () => {
  const [form] = Form.useForm();
  const [current, setCurrent] = useState(0);
  const onChange = (value) => {
    setCurrent(value);
  };

  const steps = [
    {
      title: "Address Info",
      content: <AddressesForm />,
    },
    {
      title: "Shipment Details",
      content: (
        <ResponsiveCard title="Shipment Details" size="small">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4">
            <Form.Item name={["shipment_details", "height"]} label="Height">
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item name={["shipment_details", "length"]} label="Length">
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item name={["shipment_details", "weight"]} label="Weight">
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item name={["shipment_details", "breadth"]} label="Breadth">
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item name={["shipment_details", "order_id"]} label="Order ID">
              <Input />
            </Form.Item>
            <Form.Item
              name={["shipment_details", "cod_value"]}
              label="COD Value"
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              name={["shipment_details", "cod_currency_code"]}
              label="COD Currency Code"
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["shipment_details", "order_type"]}
              label="Order Type"
            >
              <Select>
                <Option value="COD">COD</Option>
                <Option value="PREPAID">Prepaid</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name={["shipment_details", "invoice_date"]}
              label="Invoice Date"
            >
              <DatePicker format="YYYY-MM-DD" />
            </Form.Item>
            <Form.Item
              name={["shipment_details", "delivery_type"]}
              label="Delivery Type"
            >
              <Select>
                <Option value="RVP">Reverse Pickup</Option>
                <Option value="FORWARD">Forward</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name={["shipment_details", "invoice_value"]}
              label="Invoice Value"
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              name={["shipment_details", "invoice_number"]}
              label="Invoice Number"
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["shipment_details", "courier_partner"]}
              label="Courier Partner"
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["shipment_details", "reference_number"]}
              label="Reference Number"
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["shipment_details", "account_code"]}
              label="Account Code"
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["shipment_details", "reseller_name"]}
              label="Reseller Name"
            >
              <Input />
            </Form.Item>
          </div>
        </ResponsiveCard>
      ),
    },
    {
      title: "Items",
      content: (
        <ResponsiveCard title="Items" size="small">
          <Form.List name={["shipment_details", "items"]}>
            {(fields, { add, remove }) => (
              <div>
                {fields.map(({ key, name, ...restField }) => (
                  <Card
                    key={key}
                    size="small"
                    title={`Item ${name + 1}`}
                    style={{ marginBottom: 16 }}
                    extra={
                      fields.length > 1 ? (
                        <Button danger onClick={() => remove(name)}>
                          Remove
                        </Button>
                      ) : null
                    }
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4">
                      <Form.Item
                        {...restField}
                        name={[name, "sku"]}
                        label="SKU"
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "price"]}
                        label="Price"
                      >
                        <InputNumber style={{ width: "100%" }} />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "weight"]}
                        label="Weight"
                      >
                        <InputNumber style={{ width: "100%" }} />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "hs_code"]}
                        label="HS Code"
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "quantity"]}
                        label="Quantity"
                      >
                        <InputNumber style={{ width: "100%" }} />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "description"]}
                        label="Description"
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "product_id"]}
                        label="Product ID"
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "variant_id"]}
                        label="Variant ID"
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "barcode"]}
                        label="Barcode"
                      >
                        <Input />
                      </Form.Item>
                    </div>
                    <Divider>Additional Item Details</Divider>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4">
                      <Form.Item
                        {...restField}
                        name={[name, "additional", "manufacture_country"]}
                        label="Manufacture Country"
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "additional", "manufacture_country_code"]}
                        label="Manufacture Country Code"
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "additional", "cat"]}
                        label="Category"
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "additional", "images"]}
                        label="Images"
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "additional", "product_url"]}
                        label="Product URL"
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "additional", "return_days"]}
                        label="Return Days"
                      >
                        <InputNumber style={{ width: "100%" }} />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "additional", "exchange_days"]}
                        label="Exchange Days"
                      >
                        <InputNumber style={{ width: "100%" }} />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "additional", "length"]}
                        label="Length"
                      >
                        <InputNumber style={{ width: "100%" }} />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "additional", "breadth"]}
                        label="Breadth"
                      >
                        <InputNumber style={{ width: "100%" }} />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "additional", "height"]}
                        label="Height"
                      >
                        <InputNumber style={{ width: "100%" }} />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "additional", "brand"]}
                        label="Brand"
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "additional", "color"]}
                        label="Color"
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "additional", "size"]}
                        label="Size"
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "additional", "serial_no"]}
                        label="Serial No"
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "additional", "imei"]}
                        label="IMEI"
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "additional", "ean"]}
                        label="EAN"
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "additional", "sub_category"]}
                        label="Sub Category"
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "additional", "return_reason"]}
                        label="Return Reason"
                      >
                        <Input />
                      </Form.Item>
                    </div>
                  </Card>
                ))}
                <Button type="dashed" onClick={() => add(defaultItem)} block>
                  Add Item
                </Button>
              </div>
            )}
          </Form.List>
        </ResponsiveCard>
      ),
    },
    {
      title: "Additional Info",
      content: (
        <ResponsiveCard title="Additional Info" size="small">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4">
            <Form.Item
              name={["additional", "async"]}
              label="Async Processing"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
            <Form.Item
              name={["additional", "label"]}
              label="Label"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
            <Form.Item name={["additional", "vendor_code"]} label="Vendor Code">
              <Input />
            </Form.Item>
            <Form.Item name={["additional", "zone"]} label="Zone">
              <Input />
            </Form.Item>
            <Form.Item name={["additional", "min_edd"]} label="Min EDD">
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item name={["additional", "max_edd"]} label="Max EDD">
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              name={["additional", "invoice_base_64"]}
              label="Invoice Base64"
            >
              <Input.TextArea rows={2} />
            </Form.Item>
            <Form.Item
              name={["additional", "is_multi_seller"]}
              label="Is Multi Seller"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
            <Form.Item
              name={["additional", "channel_name"]}
              label="Channel Name"
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["additional", "exchange_address"]}
              label="Exchange Address"
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["additional", "exchange_city"]}
              label="Exchange City"
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["additional", "exchange_state"]}
              label="Exchange State"
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["additional", "exchange_country"]}
              label="Exchange Country"
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["additional", "exchange_pincode"]}
              label="Exchange Pincode"
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["additional", "exchange_shipment_description"]}
              label="Exchange Shipment Description"
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["additional", "otp_based_delivery"]}
              label="OTP Based Delivery"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
            <Form.Item name={["additional", "inv_url"]} label="Invoice URL">
              <Input />
            </Form.Item>
            <Form.Item name={["additional", "pickup_type"]} label="Pickup Type">
              <Input />
            </Form.Item>
            <Form.Item
              name={["additional", "is_fragile"]}
              label="Is Fragile"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
            <Form.Item
              name={["additional", "is_dangerous"]}
              label="Is Dangerous"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
            <Form.Item name={["additional", "from_wh"]} label="From Warehouse">
              <Input />
            </Form.Item>
            <Form.Item name={["additional", "to_wh"]} label="To Warehouse">
              <Input />
            </Form.Item>
            <Form.Item name={["additional", "template_id"]} label="Template ID">
              <Input />
            </Form.Item>
            <Form.Item
              name={["additional", "template_category"]}
              label="Template Category"
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["additional", "invoice_reference"]}
              label="Invoice Reference"
            >
              <Input />
            </Form.Item>
            <Form.Item name={["additional", "categories"]} label="Categories">
              <Input />
            </Form.Item>
            <Form.Item name={["additional", "otp_code"]} label="OTP Code">
              <Input />
            </Form.Item>
            <Form.Item
              name={["additional", "insured"]}
              label="Insured"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
            <Form.Item
              name={["additional", "customer_id_number"]}
              label="Customer ID Number"
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["additional", "insurance_amount"]}
              label="Insurance Amount"
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              name={["additional", "exchange_rvp_awb"]}
              label="Exchange RVP AWB"
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["additional", "rvp_reason"]}
              label="Reason for RVP"
            >
              <Input />
            </Form.Item>
            <Form.Item name={["additional", "qc_type"]} label="QC Type">
              <Input />
            </Form.Item>
            <Form.Item name={["additional", "order_date"]} label="Order Date">
              <DatePicker format="YYYY-MM-DDTHH:mm:ss" />
            </Form.Item>
            <Divider>User Defined Fields</Divider>
            {["udf_1", "udf_2", "udf_3", "udf_4"].map((key, idx) => (
              <Form.Item
                key={idx}
                name={["additional", "user_defined_field_array", idx, "value"]}
                label={`User Field ${idx + 1}`}
              >
                <Input />
              </Form.Item>
            ))}
          </div>
        </ResponsiveCard>
      ),
    },
    {
      title: "GST Info",
      content: (
        <ResponsiveCard title="GST Info" size="small">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4">
            <Form.Item name={["gst_info", "seller_gstin"]} label="Seller GSTIN">
              <Input />
            </Form.Item>
            <Form.Item
              name={["gst_info", "taxable_value"]}
              label="Taxable Value"
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              name={["gst_info", "ewaybill_serial_number"]}
              label="Ewaybill Serial Number"
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["gst_info", "is_seller_registered_under_gst"]}
              label="Seller Registered Under GST"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
            <Form.Item
              name={["gst_info", "sgst_tax_rate"]}
              label="SGST Tax Rate"
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              name={["gst_info", "place_of_supply"]}
              label="Place of Supply"
            >
              <Input />
            </Form.Item>
            <Form.Item name={["gst_info", "gst_discount"]} label="GST Discount">
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item name={["gst_info", "hsn_code"]} label="HSN Code">
              <Input />
            </Form.Item>
            <Form.Item name={["gst_info", "sgst_amount"]} label="SGST Amount">
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              name={["gst_info", "enterprise_gstin"]}
              label="Enterprise GSTIN"
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["gst_info", "gst_total_tax"]}
              label="GST Total Tax"
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item name={["gst_info", "igst_amount"]} label="IGST Amount">
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item name={["gst_info", "cgst_amount"]} label="CGST Amount">
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item name={["gst_info", "gst_tax_base"]} label="GST Tax Base">
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              name={["gst_info", "consignee_gstin"]}
              label="Consignee GSTIN"
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["gst_info", "igst_tax_rate"]}
              label="IGST Tax Rate"
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              name={["gst_info", "cgst_tax_rate"]}
              label="CGST Tax Rate"
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </div>
        </ResponsiveCard>
      ),
    },
  ];

  const next = () => form.validateFields().then(() => setCurrent(current + 1));
  const prev = () => setCurrent(current - 1);

  const onFinish = async () => {
    const values = await form.validateFields();
    // Format pickers to string where needed
    if (values.pickup_info.pickup_time) {
      values.pickup_info.pickup_time = values.pickup_info.pickup_time.format(
        "YYYY-MM-DDTHH:mm:ss"
      );
    }
    if (values.shipment_details.invoice_date) {
      values.shipment_details.invoice_date =
        values.shipment_details.invoice_date.format("YYYY-MM-DD");
    }
    if (values.additional.order_date) {
      values.additional.order_date = values.additional.order_date.format();
    }
    console.log("Final Reverse Payload:", values);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={onFinish}
      scrollToFirstError
    >
      <Steps
        onChange={onChange}
        size="small"
        labelPlacement="vertical"
        current={current}
        style={{ marginBottom: 24 }}
      >
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div>{steps[current].content}</div>
      <div className="flex justify-between mt-8">
        <Button
          onClick={prev}
          disabled={current === 0}
          icon={<ArrowLeftOutlined />}
        >
          Previous
        </Button>

        {current < steps.length - 1 && (
          <Button type="primary" onClick={next} icon={<ArrowRightOutlined />}>
            Next
          </Button>
        )}

        {current === steps.length - 1 && (
          <Button type="primary" onClick={onFinish} icon={<CheckOutlined />}>
            Submit
          </Button>
        )}
      </div>
    </Form>
  );
};

export default ReverseShipmentStepperForm;
