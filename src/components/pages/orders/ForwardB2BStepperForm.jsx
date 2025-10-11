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

const ForwardB2BStepperForm = () => {
  const [form] = Form.useForm();
  const [current, setCurrent] = useState(0);
  const onChange = (value) => {
    setCurrent(value);
  };

  const steps = [
    {
      title: "Drop Info (Warehouse)",
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4">
          <Form.Item name={["drop_info", "drop_lat"]} label="Drop Latitude">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name={["drop_info", "drop_city"]} label="Drop City">
            <Input />
          </Form.Item>
          <Form.Item name={["drop_info", "drop_long"]} label="Drop Longitude">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name={["drop_info", "drop_name"]} label="Drop Name">
            <Input />
          </Form.Item>
          <Form.Item
            name={["drop_info", "drop_email"]}
            label="Drop Email"
            type="email"
            rules={[{ type: "email", message: "Invalid email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name={["drop_info", "drop_phone"]} label="Drop Phone">
            <Input />
          </Form.Item>
          <Form.Item name={["drop_info", "drop_state"]} label="Drop State">
            <Input />
          </Form.Item>
          <Form.Item name={["drop_info", "drop_address"]} label="Drop Address">
            <Input />
          </Form.Item>
          <Form.Item
            name={["drop_info", "drop_district"]}
            label="Drop District"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["drop_info", "drop_landmark"]}
            label="Drop Landmark"
          >
            <Input />
          </Form.Item>
          <Form.Item name={["drop_info", "drop_pincode"]} label="Drop Pincode">
            <Input />
          </Form.Item>
          <Form.Item name={["drop_info", "drop_country"]} label="Drop Country">
            <Input />
          </Form.Item>
        </div>
      ),
    },
    {
      title: "Pickup Info (Customer)",
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4">
          <Form.Item
            name={["pickup_info", "pickup_lat"]}
            label="Pickup Latitude"
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name={["pickup_info", "pickup_city"]} label="Pickup City">
            <Input />
          </Form.Item>
          <Form.Item
            name={["pickup_info", "pickup_long"]}
            label="Pickup Longitude"
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name={["pickup_info", "pickup_name"]} label="Pickup Name">
            <Input />
          </Form.Item>
          <Form.Item name={["pickup_info", "pickup_time"]} label="Pickup Time">
            <DatePicker
              showTime
              format="YYYY-MM-DDTHH:mm:ssZ"
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            name={["pickup_info", "pickup_email"]}
            label="Pickup Email"
            type="email"
            rules={[{ type: "email", message: "Invalid email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["pickup_info", "pickup_phone"]}
            label="Pickup Phone"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["pickup_info", "pickup_state"]}
            label="Pickup State"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["pickup_info", "pickup_address"]}
            label="Pickup Address"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["pickup_info", "pickup_district"]}
            label="Pickup District"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["pickup_info", "pickup_landmark"]}
            label="Pickup Landmark"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["pickup_info", "pickup_pincode"]}
            label="Pickup Pincode"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["pickup_info", "pickup_country"]}
            label="Pickup Country"
          >
            <Input />
          </Form.Item>
        </div>
      ),
    },
    {
      title: "Shipment Details",
      content: (
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
          <Form.Item name={["shipment_details", "cod_value"]} label="COD Value">
            <InputNumber style={{ width: "100%" }} />
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
            <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name={["shipment_details", "delivery_type"]}
            label="Delivery Type"
          >
            <Select>
              <Option value="FORWARD">Forward</Option>
              <Option value="RVP">Reverse Pickup</Option>
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
        </div>
      ),
    },
    {
      title: "Items",
      content: (
        <Form.List name={["shipment_details", "items"]}>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Card
                  key={key}
                  title={`Item ${name + 1}`}
                  style={{ marginBottom: 16 }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4">
                    <Form.Item {...restField} name={[name, "sku"]} label="SKU">
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
                      name={[name, "manufacture_country"]}
                      label="Manufacture Country"
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "manufacture_country_code"]}
                      label="Manufacture Country Code"
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "cat"]}
                      label="Category"
                    >
                      <Input />
                    </Form.Item>
                  </div>
                  {fields.length > 1 && (
                    <Button
                      danger
                      className="mt-2"
                      onClick={() => remove(name)}
                    >
                      Remove
                    </Button>
                  )}
                </Card>
              ))}
              <Button
                type="dashed"
                style={{ width: "100%" }}
                onClick={() => add({})}
              >
                Add Item
              </Button>
            </>
          )}
        </Form.List>
      ),
    },
    {
      title: "Additional Info",
      content: (
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
          <Form.Item name={["additional", "order_date"]} label="Order Date">
            <DatePicker format="YYYY-MM-DDTHH:mm:ss" />
          </Form.Item>
          {/* Return Info as sub-grid */}
          <Divider>Return Info</Divider>
          <Form.Item
            name={["additional", "return_info", "return_lat"]}
            label="Return Latitude"
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name={["additional", "return_info", "return_city"]}
            label="Return City"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["additional", "return_info", "return_long"]}
            label="Return Longitude"
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name={["additional", "return_info", "return_name"]}
            label="Return Name"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["additional", "return_info", "return_email"]}
            label="Return Email"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["additional", "return_info", "return_phone"]}
            label="Return Phone"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["additional", "return_info", "return_state"]}
            label="Return State"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["additional", "return_info", "return_address"]}
            label="Return Address"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["additional", "return_info", "return_district"]}
            label="Return District"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["additional", "return_info", "return_landmark"]}
            label="Return Landmark"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["additional", "return_info", "return_pincode"]}
            label="Return Pincode"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["additional", "return_info", "return_country"]}
            label="Return Country"
          >
            <Input />
          </Form.Item>
        </div>
      ),
    },
    {
      title: "GST Info",
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4">
          <Form.Item name={["gst_info", "seller_gstin"]} label="Seller GSTIN">
            <Input />
          </Form.Item>
          <Form.Item name={["gst_info", "taxable_value"]} label="Taxable Value">
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
          <Form.Item name={["gst_info", "sgst_tax_rate"]} label="SGST Tax Rate">
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
          <Form.Item name={["gst_info", "gst_total_tax"]} label="GST Total Tax">
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
          <Form.Item name={["gst_info", "igst_tax_rate"]} label="IGST Tax Rate">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name={["gst_info", "cgst_tax_rate"]} label="CGST Tax Rate">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </div>
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

export default ForwardB2BStepperForm;
