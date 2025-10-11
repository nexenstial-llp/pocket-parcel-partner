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
} from "antd";
import AddressesForm from "./steps/AddressesForm";
import ShipmentDetails from "./steps/ShipmentDetails";
import Items from "./steps/Items";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";

const { Step } = Steps;

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
    delivery_type: "FORWARD",
    invoice_value: 0,
    invoice_number: "",
    courier_partner: "",
    reference_number: "",
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
    label: true,
    invoice_base_64: "",
    order_date: null,
  },
  courier_custom_fields: {},
};

const InternationalForwardStepperForm = () => {
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
      title: "Items",
      content: <Items />,
    },
    {
      title: "Additional & Return Info",
      content: (
        <ResponsiveCard title="Additional & Return Info" size="small">
          <div className="grid col-span-6 grid-cols-1 sm:grid-cols-12 gap-x-4">
            <Form.Item
              name={["additional", "label"]}
              label="Label"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
            <Form.Item
              className="col-span-4"
              name={["additional", "invoice_base_64"]}
              label="Invoice Base64"
            >
              <Input />
            </Form.Item>
            <Form.Item
              className="col-span-4"
              name={["additional", "order_date"]}
              label="Order Date"
            >
              <DatePicker format="YYYY-MM-DD" />
            </Form.Item>
          </div>
          <Divider className="col-span-4">Return Info</Divider>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4">
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
    if (values.additional?.order_date) {
      values.additional.order_date =
        values.additional.order_date.format("YYYY-MM-DD");
    }
    console.log("International Forward Payload:", values);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
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

export default InternationalForwardStepperForm;
