import { useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  DatePicker,
  Button,
  Switch,
  Select,
  Steps,
  Divider,
  Card,
  Space,
} from "antd";

const { Step } = Steps;
const { Option } = Select;

const defaultItem = {
  cat: "",
  sku: "",
  price: 0,
  weight: 0,
  length: 0,
  breadth: 0,
  height: 0,
  hs_code: "",
  quantity: 1,
  description: "",
  manufacture_country: "",
  manufacture_country_code: "",
  images: "",
  product_url: "",
  return_days: 0,
  exchange_days: 0,
  color: "",
  brand: "",
  size: "",
  sub_category: "",
  return_reason: "",
  special_instructions: "",
  imei: "",
  ean: "",
};

const initialValues = {
  tax_info: {
    tax_paid: false,
    tax_amount: 0,
    exporter_type: "",
    shipper_tax_id: "",
    consignee_tax_id: "",
    consignee_tax_type: "",
    consignee_tax_country_code: "",
    exporter_tax_id: "",
    exporter_tax_type: "",
    exporter_tax_country_code: "",
  },
  drop_info: {
    lat: 0,
    city: "",
    long: 0,
    name: "",
    time: null,
    email: "",
    phone: "",
    state: "",
    district: "",
    address: "",
    landmark: "",
    phone_code: "",
    postal_code: "",
    country_code: "",
    alternate_phone: "",
    instructions: "",
  },
  pickup_info: {
    lat: 0,
    city: "",
    long: 0,
    name: "",
    time: null,
    email: "",
    phone: "",
    state: "",
    district: "",
    address: "",
    landmark: "",
    phone_code: "",
    postal_code: "",
    country_code: "",
  },
  shipment_details: {
    items: [defaultItem],
    height: 0,
    length: 0,
    weight: 0,
    breadth: 0,
    cod_value: 0,
    order_type: "PREPAID",
    invoice_date: null,
    currency_code: "",
    delivery_type: "FORWARD",
    invoice_value: 0,
    invoice_number: "",
    courier_partner: "",
    reference_number: "",
    order_id: "",
    account_code: "",
    rvp_reason: "",
    reseller_name: "",
    otp_based_delivery: false,
    exchange_address: "",
  },
  additional: {
    label: true,
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
      phone_code: "",
      postal_code: "",
      country_code: "",
    },
    invoice_base_64: "",
    order_date: null,
    from_wh: "",
    asn_code: "",
    sort_code: "",
    account_code: "",
    channel_name: "",
    user_defined_field_array: [
      { name: "ship_via_method", type: "String", value: "" },
      { name: "max_edd", type: "String", value: "" },
      { name: "ship_via_po", type: "String", value: "" },
    ],
  },
  courier_custom_fields: {},
};

const InternationalForwardB2BStepperForm = () => {
  const [form] = Form.useForm();
  const [current, setCurrent] = useState(0);

  const steps = [
    {
      title: "Tax Info",
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4">
          <Form.Item
            name={["tax_info", "tax_paid"]}
            label="Tax Paid"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
          <Form.Item name={["tax_info", "tax_amount"]} label="Tax Amount">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name={["tax_info", "exporter_type"]} label="Exporter Type">
            <Input />
          </Form.Item>
          <Form.Item
            name={["tax_info", "shipper_tax_id"]}
            label="Shipper Tax ID"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["tax_info", "consignee_tax_id"]}
            label="Consignee Tax ID"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["tax_info", "consignee_tax_type"]}
            label="Consignee Tax Type"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["tax_info", "consignee_tax_country_code"]}
            label="Consignee Tax Country Code"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["tax_info", "exporter_tax_id"]}
            label="Exporter Tax ID"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["tax_info", "exporter_tax_type"]}
            label="Exporter Tax Type"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["tax_info", "exporter_tax_country_code"]}
            label="Exporter Tax Country Code"
          >
            <Input />
          </Form.Item>
        </div>
      ),
    },
    {
      title: "Drop Info",
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4">
          <Form.Item name={["drop_info", "lat"]} label="Drop Latitude">
            <Input />
          </Form.Item>
          <Form.Item name={["drop_info", "city"]} label="Drop City">
            <Input />
          </Form.Item>
          <Form.Item name={["drop_info", "long"]} label="Drop Longitude">
            <Input />
          </Form.Item>
          <Form.Item name={["drop_info", "name"]} label="Drop Name">
            <Input />
          </Form.Item>
          <Form.Item name={["drop_info", "time"]} label="Drop Time">
            <DatePicker
              showTime
              format="YYYY-MM-DDTHH:mm:ss"
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item name={["drop_info", "email"]} label="Drop Email">
            <Input />
          </Form.Item>
          <Form.Item name={["drop_info", "phone"]} label="Drop Phone">
            <Input />
          </Form.Item>
          <Form.Item name={["drop_info", "state"]} label="Drop State">
            <Input />
          </Form.Item>
          <Form.Item name={["drop_info", "district"]} label="Drop District">
            <Input />
          </Form.Item>
          <Form.Item name={["drop_info", "address"]} label="Drop Address">
            <Input />
          </Form.Item>
          <Form.Item name={["drop_info", "landmark"]} label="Drop Landmark">
            <Input />
          </Form.Item>
          <Form.Item name={["drop_info", "phone_code"]} label="Phone Code">
            <Input />
          </Form.Item>
          <Form.Item name={["drop_info", "postal_code"]} label="Postal Code">
            <Input />
          </Form.Item>
          <Form.Item name={["drop_info", "country_code"]} label="Country Code">
            <Input />
          </Form.Item>
          <Form.Item
            name={["drop_info", "alternate_phone"]}
            label="Alternate Phone"
          >
            <Input />
          </Form.Item>
          <Form.Item name={["drop_info", "instructions"]} label="Instructions">
            <Input />
          </Form.Item>
        </div>
      ),
    },
    {
      title: "Pickup Info",
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4">
          <Form.Item name={["pickup_info", "lat"]} label="Pickup Latitude">
            <Input />
          </Form.Item>
          <Form.Item name={["pickup_info", "city"]} label="Pickup City">
            <Input />
          </Form.Item>
          <Form.Item name={["pickup_info", "long"]} label="Pickup Longitude">
            <Input />
          </Form.Item>
          <Form.Item name={["pickup_info", "name"]} label="Pickup Name">
            <Input />
          </Form.Item>
          <Form.Item name={["pickup_info", "time"]} label="Pickup Time">
            <DatePicker
              showTime
              format="YYYY-MM-DDTHH:mm:ss"
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item name={["pickup_info", "email"]} label="Pickup Email">
            <Input />
          </Form.Item>
          <Form.Item name={["pickup_info", "phone"]} label="Pickup Phone">
            <Input />
          </Form.Item>
          <Form.Item name={["pickup_info", "state"]} label="Pickup State">
            <Input />
          </Form.Item>
          <Form.Item name={["pickup_info", "district"]} label="Pickup District">
            <Input />
          </Form.Item>
          <Form.Item name={["pickup_info", "address"]} label="Pickup Address">
            <Input />
          </Form.Item>
          <Form.Item name={["pickup_info", "landmark"]} label="Pickup Landmark">
            <Input />
          </Form.Item>
          <Form.Item name={["pickup_info", "phone_code"]} label="Phone Code">
            <Input />
          </Form.Item>
          <Form.Item name={["pickup_info", "postal_code"]} label="Postal Code">
            <Input />
          </Form.Item>
          <Form.Item
            name={["pickup_info", "country_code"]}
            label="Country Code"
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
      title: "Shipment Items",
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
                    <Form.Item
                      {...restField}
                      name={[name, "cat"]}
                      label="Category"
                    >
                      <Input />
                    </Form.Item>
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
                      name={[name, "length"]}
                      label="Length"
                    >
                      <InputNumber style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "breadth"]}
                      label="Breadth"
                    >
                      <InputNumber style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "height"]}
                      label="Height"
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
                  </div>
                  {fields.length > 1 && (
                    <Button
                      danger
                      style={{ marginTop: 10 }}
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
                onClick={() => add(defaultItem)}
              >
                Add Item
              </Button>
            </>
          )}
        </Form.List>
      ),
    },
    {
      title: "Additional & Return Info",
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4">
          <Form.Item
            name={["additional", "label"]}
            label="Label"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
          <Form.Item
            name={["additional", "invoice_base_64"]}
            label="Invoice Base64"
          >
            <Input.TextArea rows={2} />
          </Form.Item>
          <Form.Item name={["additional", "from_wh"]} label="From Warehouse">
            <Input />
          </Form.Item>
          <Form.Item name={["additional", "asn_code"]} label="ASN Code">
            <Input />
          </Form.Item>
          <Form.Item name={["additional", "order_id"]} label="Order ID">
            <Input />
          </Form.Item>
          <Form.Item name={["additional", "sort_code"]} label="Sort Code">
            <Input />
          </Form.Item>
          <Form.Item name={["additional", "account_code"]} label="Account Code">
            <Input />
          </Form.Item>
          <Form.Item name={["additional", "channel_name"]} label="Channel Name">
            <Input />
          </Form.Item>
          <Divider className="col-span-4">Return Info</Divider>
          <Form.Item
            name={["additional", "return_info", "lat"]}
            label="Return Latitude"
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name={["additional", "return_info", "city"]}
            label="Return City"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["additional", "return_info", "long"]}
            label="Return Longitude"
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name={["additional", "return_info", "name"]}
            label="Return Name"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["additional", "return_info", "email"]}
            label="Return Email"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["additional", "return_info", "phone"]}
            label="Return Phone"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["additional", "return_info", "state"]}
            label="Return State"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["additional", "return_info", "address"]}
            label="Return Address"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["additional", "return_info", "district"]}
            label="Return District"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["additional", "return_info", "landmark"]}
            label="Return Landmark"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["additional", "return_info", "phone_code"]}
            label="Phone Code"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["additional", "return_info", "postal_code"]}
            label="Postal Code"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["additional", "return_info", "country_code"]}
            label="Country Code"
          >
            <Input />
          </Form.Item>
          {/* User defined fields */}
          <Divider className="col-span-4">User Defined Fields</Divider>
          {["ship_via_method", "max_edd", "ship_via_po"].map((key, idx) => (
            <Form.Item
              key={key}
              name={["additional", "user_defined_field_array", idx, "value"]}
              label={key}
            >
              <Input />
            </Form.Item>
          ))}
        </div>
      ),
    },
    {
      title: "Courier Custom Fields",
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4">
          {/* Put custom fields here if any */}
        </div>
      ),
    },
  ];

  const next = () => form.validateFields().then(() => setCurrent(current + 1));
  const prev = () => setCurrent(current - 1);

  const onFinish = (values) => {
    if (values.pickup_info?.time) {
      values.pickup_info.time = values.pickup_info.time.format(
        "YYYY-MM-DDTHH:mm:ss"
      );
    }
    if (values.drop_info?.time) {
      values.drop_info.time = values.drop_info.time.format(
        "YYYY-MM-DDTHH:mm:ss"
      );
    }
    if (values.shipment_details?.invoice_date) {
      values.shipment_details.invoice_date =
        values.shipment_details.invoice_date.format("YYYY-MM-DD");
    }
    if (values.additional?.order_date) {
      values.additional.order_date =
        values.additional.order_date.format("YYYY-MM-DD");
    }
    if (values.additional?.estimated_delivery_date) {
      values.additional.estimated_delivery_date =
        values.additional.estimated_delivery_date.format("YYYY-MM-DD");
    }
    console.log("Final Payload:", values);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={onFinish}
      scrollToFirstError
    >
      <Steps current={current} style={{ marginBottom: 24 }}>
        {steps.map(({ title }) => (
          <Step key={title} title={title} />
        ))}
      </Steps>
      <div>{steps[current].content}</div>
      <Form.Item style={{ marginTop: 24 }}>
        <Space>
          {current > 0 && <Button onClick={prev}>Previous</Button>}
          {current < steps.length - 1 && (
            <Button type="primary" onClick={next}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          )}
        </Space>
      </Form.Item>
    </Form>
  );
};

export default InternationalForwardB2BStepperForm;
