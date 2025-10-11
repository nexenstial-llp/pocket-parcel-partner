import { useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  DatePicker,
  Button,
  Switch,
  Steps,
  Divider,
  Card,
} from "antd";
import AddressesForm from "./steps/AddressesForm";
import ShipmentDetails from "./steps/ShipmentDetails";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";

const { Step } = Steps;

const defaultItem = {
  sku: "",
  price: 0,
  weight: 0,
  hs_code: "",
  length: 0,
  breadth: 0,
  height: 0,
  quantity: 1,
  description: "",
  manufacture_country: "",
  manufacture_country_code: "",
  cat: "",
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
  pickup_info: {
    lat: 0,
    city: "",
    long: 0,
    name: "",
    time: null,
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
  shipment_details: {
    items: [defaultItem],
    height: 0,
    length: 0,
    weight: 0,
    breadth: 0,
    order_id: "",
    cod_value: 0,
    order_type: "PREPAID",
    invoice_date: null,
    account_code: "",
    currency_code: "USD",
    delivery_type: "RVP",
    invoice_value: 0,
    invoice_number: "",
    courier_partner: "",
    rvp_reason: "",
    reference_number: "",
    reseller_name: "",
    otp_based_delivery: false,
    exchange_address: "",
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
      phone_code: "",
      postal_code: "",
      country_code: "",
    },
    estimated_delivery_date: null,
    label: true,
    priority: "",
    invoice_base_64: "",
    order_date: null,
  },
  courier_custom_fields: {},
};

const InternationalReverseStepperForm = () => {
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
      content: <ShipmentDetails />,
    },
    {
      title: "Tax Info",
      content: (
        <ResponsiveCard title="Tax Info" size="small">
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
            <Form.Item
              name={["tax_info", "exporter_type"]}
              label="Exporter Type"
            >
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
        </ResponsiveCard>
      ),
    },
    {
      title: "Shipment Items",
      content: (
        <ResponsiveCard title="Shipment Items" size="small">
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
                      <Form.Item
                        {...restField}
                        name={[name, "images"]}
                        label="Images"
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "product_url"]}
                        label="Product URL"
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "return_days"]}
                        label="Return Days"
                      >
                        <InputNumber style={{ width: "100%" }} />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "exchange_days"]}
                        label="Exchange Days"
                      >
                        <InputNumber style={{ width: "100%" }} />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "color"]}
                        label="Color"
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "brand"]}
                        label="Brand"
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "size"]}
                        label="Size"
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "sub_category"]}
                        label="Sub Category"
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "return_reason"]}
                        label="Return Reason"
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "special_instructions"]}
                        label="Special Instructions"
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "imei"]}
                        label="IMEI"
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "ean"]}
                        label="EAN"
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
                  onClick={() => add(defaultItem)}
                >
                  Add Item
                </Button>
              </>
            )}
          </Form.List>
        </ResponsiveCard>
      ),
    },
    {
      title: "Additional & Return Info",
      content: (
        <ResponsiveCard title="Additional & Return Info" size="small">
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4">
            <Form.Item
              name={["additional", "label"]}
              label="Label"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
            <Form.Item
              name={["additional", "estimated_delivery_date"]}
              label="Estimated Delivery Date"
            >
              <DatePicker format="YYYY-MM-DD" />
            </Form.Item>
            <Form.Item name={["additional", "priority"]} label="Priority">
              <Input />
            </Form.Item>
            <Form.Item
              name={["additional", "invoice_base_64"]}
              label="Invoice Base64"
            >
              <Input />
            </Form.Item>
            <Form.Item name={["additional", "order_date"]} label="Order Date">
              <DatePicker format="YYYY-MM-DD" />
            </Form.Item>
          </div>
          <Divider className="col-span-4">Return Info</Divider>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 ">
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
          </div>
        </ResponsiveCard>
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
    if (values.shipment_details?.invoice_date) {
      values.shipment_details.invoice_date =
        values.shipment_details.invoice_date.format("YYYY-MM-DD");
    }
    if (values.additional?.estimated_delivery_date) {
      values.additional.estimated_delivery_date =
        values.additional.estimated_delivery_date.format("YYYY-MM-DD");
    }
    if (values.additional?.order_date) {
      values.additional.order_date =
        values.additional.order_date.format("YYYY-MM-DD");
    }
    console.log("International Reverse Payload:", values);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      scrollToFirstError
    >
      <Steps
        labelPlacement="vertical"
        size="small"
        onChange={onChange}
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

export default InternationalReverseStepperForm;
