import { useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Select,
  DatePicker,
  Row,
  Col,
  Steps,
  Button,
  Card,
  Checkbox,
} from "antd";
import {
  MinusCircleOutlined,
  PlusOutlined,
  EnvironmentOutlined,
  CodeSandboxOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { fetchLocationFromPincode } from "@/features/orders/orders.service";
import GoogleAddressPicker from "@/components/ui/GoogleAddressPicker";
import { APIProvider } from "@vis.gl/react-google-maps";
import dayjs from "dayjs";
import PaginatedSelect from "@/components/ui/PaginatedSelect";
const API_KEY = import.meta.env.VITE_APP_GOOGLE_API_KEY;
const deliveryTypeOptions = [
  { label: "Forward", value: "FORWARD" },
  { label: "Reverse", value: "REVERSE" },
];

const mapping = {
  pickup_info: {
    city: "pickup_city",
    district: "pickup_district",
    state: "pickup_state",
    country: "pickup_country",
  },
  drop_info: {
    city: "drop_city",
    district: "drop_district",
    state: "drop_state",
    country: "drop_country",
  },
};
const handlePincodeFill = async (pincode, type, form) => {
  if (!pincode || pincode.length !== 6) return;

  const location = await fetchLocationFromPincode(pincode);
  if (!location) return;

  const fields = mapping[type];

  form.setFieldsValue({
    [type]: {
      [fields.city]: location.city,
      [fields.district]: location.district,
      [fields.state]: location.state,
      [fields.country]: location.country,
    },
  });
};
const responsiveColSpan = { xs: 24, sm: 12, md: 8, lg: 6 };

const ComprehensiveOrderForm = () => {
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();

  const next = async () => {
    try {
      // Validate fields for current step
      let fieldsToValidate = [];
      if (current === 0) {
        fieldsToValidate = [
          ["pickup_info", "pickup_name"],
          ["pickup_info", "pickup_phone"],
          ["pickup_info", "pickup_address"],
          ["pickup_info", "pickup_pincode"],
          ["pickup_info", "pickup_city"],
          ["pickup_info", "pickup_state"],
          ["drop_info", "drop_name"],
          ["drop_info", "drop_phone"],
          ["drop_info", "drop_address"],
          ["drop_info", "drop_pincode"],
          ["drop_info", "drop_city"],
          ["drop_info", "drop_state"],
        ];
      } else if (current === 1) {
        fieldsToValidate = [
          ["shipment_details", "order_id"],
          ["shipment_details", "items"],
        ];
      }

      if (fieldsToValidate.length > 0) {
        await form.validateFields(fieldsToValidate);
      }

      setCurrent(current + 1);
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const onFinish = (values) => {
    console.log("Received values of form:", values);
    // Handle submission
  };

  const steps = [
    {
      title: "Locations",
      icon: <EnvironmentOutlined />,
      content: <LocationStep />,
    },
    {
      title: "Shipment",
      icon: <CodeSandboxOutlined />,
      content: <ShipmentStep />,
    },
    {
      title: "Billing & Others",
      icon: <FileTextOutlined />,
      content: <BillingStep />,
    },
  ];

  return (
    <div className="w-full flex flex-col gap-3">
      <Steps
        onChange={(e) => setCurrent(e)}
        current={current}
        items={steps}
        className="mb-8"
      />

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          additional: {
            async: true,
            label: true,
          },
          gst_info: {
            is_seller_registered_under_gst: false,
          },
        }}
      >
        <div className="mb-8">{steps[current]?.content}</div>

        <div className="flex justify-end gap-4 sticky bottom-0 bg-white p-4 border-t border-gray-600 z-10 shadow-md -mx-6 -mb-6 rounded-b-lg">
          {current > 0 && <Button onClick={() => prev()}>Previous</Button>}
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" htmlType="submit">
              Create Order
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
};

// ---------------- STEP 1: LOCATIONS ----------------
const LocationStep = () => {
  const form = Form.useFormInstance();

  return (
    <div className="flex flex-col gap-6">
      {/* PICKUP INFO */}
      <Card title="Pickup Information" size="small" className="shadow-sm">
        <Row gutter={16}>
          <Col {...responsiveColSpan}>
            <Form.Item
              name={["pickup_info", "pickup_name"]}
              label="Name"
              rules={[{ required: true }]}
            >
              <Input placeholder="Sender Name" />
            </Form.Item>
          </Col>
          <Col {...responsiveColSpan}>
            <Form.Item
              name={["pickup_info", "pickup_phone"]}
              label="Phone"
              rules={[{ required: true }]}
            >
              <Input placeholder="Sender Phone" />
            </Form.Item>
          </Col>
          <Col {...responsiveColSpan}>
            <Form.Item name={["pickup_info", "pickup_email"]} label="Email">
              <Input placeholder="Sender Email" />
            </Form.Item>
          </Col>
          <Col {...responsiveColSpan}>
            <Form.Item
              name={["pickup_info", "pickup_time"]}
              label="Pickup Time"
            >
              <DatePicker
                disabledDate={(current) =>
                  current && current < dayjs().startOf("day")
                }
                showTime
                style={{ width: "100%" }}
                format={"DD-MM-YYYY HH:mm"}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={12}>
            <Form.Item name={["pickup_info", "pickup_address"]} label="Address">
              <Input placeholder="Address" />
            </Form.Item>
          </Col>
          <Col xs={12}>
            <Form.Item
              name={["pickup_info", "pickup_landmark"]}
              label="Landmark"
            >
              <APIProvider apiKey={API_KEY} libraries={["places", "geocoding"]}>
                <GoogleAddressPicker
                  showMap={false}
                  onLocationSelect={(loc) => {
                    form.setFieldsValue({
                      pickup_info: {
                        pickup_lat: loc.lat,
                        pickup_long: loc.lng,
                        pickup_landmark: loc.address,
                        pickup_pincode: loc.pincode,
                        pickup_city: loc.city,
                        pickup_state: loc.state,
                        pickup_country: loc.country,
                        pickup_district: loc.district,
                      },
                    });
                  }}
                />
              </APIProvider>
            </Form.Item>
          </Col>

          <Col {...responsiveColSpan}>
            <Form.Item
              name={["pickup_info", "pickup_pincode"]}
              label="Pincode"
              rules={[{ required: true }]}
            >
              <Input
                placeholder="Pincode"
                maxLength={6}
                onBlur={(e) =>
                  handlePincodeFill(e.target.value, "pickup_info", form)
                }
              />
            </Form.Item>
          </Col>

          <Col {...responsiveColSpan}>
            <Form.Item
              name={["pickup_info", "pickup_city"]}
              label="City"
              rules={[{ required: true }]}
            >
              <Input placeholder="City" readOnly />
            </Form.Item>
          </Col>
          <Col {...responsiveColSpan}>
            <Form.Item
              name={["pickup_info", "pickup_district"]}
              label="District"
            >
              <Input placeholder="District" readOnly />
            </Form.Item>
          </Col>
          <Col {...responsiveColSpan}>
            <Form.Item
              name={["pickup_info", "pickup_state"]}
              label="State"
              rules={[{ required: true }]}
            >
              <Input placeholder="State" readOnly />
            </Form.Item>
          </Col>
          <Col {...responsiveColSpan}>
            <Form.Item name={["pickup_info", "pickup_country"]} label="Country">
              <Input placeholder="Country Code" readOnly />
            </Form.Item>
          </Col>
        </Row>
      </Card>

      {/* DROP INFO */}
      <Card title="Drop Information" size="small" className="shadow-sm">
        <Row gutter={16}>
          <Col {...responsiveColSpan}>
            <Form.Item
              name={["drop_info", "drop_name"]}
              label="Name"
              rules={[{ required: true }]}
            >
              <Input placeholder="Receiver Name" />
            </Form.Item>
          </Col>
          <Col {...responsiveColSpan}>
            <Form.Item
              name={["drop_info", "drop_phone"]}
              label="Phone"
              rules={[{ required: true }]}
            >
              <Input placeholder="Receiver Phone" />
            </Form.Item>
          </Col>
          <Col {...responsiveColSpan}>
            <Form.Item name={["drop_info", "drop_email"]} label="Email">
              <Input placeholder="Receiver Email" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={12}>
            <Form.Item
              name={["drop_info", "drop_address"]}
              label="Address"
              rules={[{ required: true }]}
            >
              <Input placeholder="Address" />
            </Form.Item>
          </Col>
          <Col xs={12}>
            <Form.Item name={["drop_info", "drop_landmark"]} label="Landmark">
              <APIProvider apiKey={API_KEY} libraries={["places", "geocoding"]}>
                <GoogleAddressPicker
                  showMap={false}
                  onLocationSelect={(loc) => {
                    form.setFieldsValue({
                      drop_info: {
                        drop_lat: loc.lat,
                        drop_long: loc.lng,
                        drop_landmark: loc.address,
                        drop_pincode: loc.pincode,
                        drop_city: loc.city,
                        drop_state: loc.state,
                        drop_country: loc.country,
                        drop_district: loc.district,
                      },
                    });
                  }}
                />
              </APIProvider>
            </Form.Item>
          </Col>

          <Col {...responsiveColSpan}>
            <Form.Item
              name={["drop_info", "drop_pincode"]}
              label="Pincode"
              rules={[{ required: true }]}
            >
              <Input
                placeholder="Pincode"
                maxLength={6}
                onBlur={(e) =>
                  handlePincodeFill(e.target.value, "drop_info", form)
                }
              />
            </Form.Item>
          </Col>

          <Col {...responsiveColSpan}>
            <Form.Item
              name={["drop_info", "drop_city"]}
              label="City"
              rules={[{ required: true }]}
            >
              <Input placeholder="City" readOnly />
            </Form.Item>
          </Col>
          <Col {...responsiveColSpan}>
            <Form.Item name={["drop_info", "drop_district"]} label="District">
              <Input placeholder="District" readOnly />
            </Form.Item>
          </Col>
          <Col {...responsiveColSpan}>
            <Form.Item
              name={["drop_info", "drop_state"]}
              label="State"
              rules={[{ required: true }]}
            >
              <Input placeholder="State" readOnly />
            </Form.Item>
          </Col>
          <Col {...responsiveColSpan}>
            <Form.Item name={["drop_info", "drop_country"]} label="Country">
              <Input placeholder="Country Code" readOnly />
            </Form.Item>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

// ---------------- STEP 2: SHIPMENT ----------------
const ShipmentStep = () => {
  return (
    <div className="flex flex-col gap-6">
      <Card title="Shipment Details" size="small" className="shadow-sm">
        <Row gutter={16}>
          {/* <Col {...responsiveColSpan}>
            <Form.Item
              name={["shipment_details", "order_id"]}
              label="Order ID"
              rules={[{ required: true }]}
            >
              <Input placeholder="Order ID" />
            </Form.Item>
          </Col> */}
          {/* <Col {...responsiveColSpan}>
            <Form.Item
              name={["shipment_details", "order_type"]}
              label="Order Type"
              initialValue="COD"
            >
              <Select>
                <Option value="COD">COD</Option>
                <Option value="PREPAID">Prepaid</Option>
              </Select>
            </Form.Item>
          </Col> */}
          {/* <Col {...responsiveColSpan}>
            <Form.Item
              name={["shipment_details", "cod_value"]}
              label="COD Value"
            >
              <InputNumber style={{ width: "100%" }} min={0} />
            </Form.Item>
          </Col> */}
          <Col {...responsiveColSpan}>
            <Form.Item
              name={["shipment_details", "delivery_type"]}
              label="Delivery Type"
              initialValue="FORWARD"
            >
              <Select options={deliveryTypeOptions} />
            </Form.Item>
          </Col>

          {/* <Col {...responsiveColSpan}>
            <Form.Item
              name={["shipment_details", "invoice_number"]}
              label="Invoice Number"
            >
              <Input placeholder="Invoice No." />
            </Form.Item>
          </Col> */}
          {/* <Col {...responsiveColSpan}>
            <Form.Item
              name={["shipment_details", "invoice_date"]}
              label="Invoice Date"
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col {...responsiveColSpan}>
            <Form.Item
              name={["shipment_details", "invoice_value"]}
              label="Invoice Value"
            >
              <InputNumber style={{ width: "100%" }} min={0} />
            </Form.Item>
          </Col> */}
          <Col {...responsiveColSpan}>
            <Form.Item
              name={["shipment_details", "courier_partner"]}
              label="Courier Partner"
            >
              {/* <Input placeholder="Partner ID" /> */}
              <PaginatedSelect
                fetchUrl="/v1/admin/courier-partners"
                placeholder="Select Partner"
                queryKey="courier-partners"
                valueField="id"
                labelField="name"
              />
            </Form.Item>
          </Col>
          {/* <Col {...responsiveColSpan}>
            <Form.Item
              name={["shipment_details", "reference_number"]}
              label="Reference Number"
            >
              <Input placeholder="Ref No." />
            </Form.Item>
          </Col>
          <Col {...responsiveColSpan}>
            <Form.Item
              name={["shipment_details", "account_code"]}
              label="Account Code"
            >
              <Input placeholder="Account Code" />
            </Form.Item>
          </Col> */}
        </Row>

        <Row gutter={16}>
          <Col {...responsiveColSpan}>
            <Form.Item
              name={["shipment_details", "length"]}
              label="Length (cm)"
            >
              <InputNumber style={{ width: "100%" }} min={0} />
            </Form.Item>
          </Col>
          <Col {...responsiveColSpan}>
            <Form.Item
              name={["shipment_details", "breadth"]}
              label="Breadth (cm)"
            >
              <InputNumber style={{ width: "100%" }} min={0} />
            </Form.Item>
          </Col>
          <Col {...responsiveColSpan}>
            <Form.Item
              name={["shipment_details", "height"]}
              label="Height (cm)"
            >
              <InputNumber style={{ width: "100%" }} min={0} />
            </Form.Item>
          </Col>
          <Col {...responsiveColSpan}>
            <Form.Item name={["shipment_details", "weight"]} label="Weight (g)">
              <InputNumber style={{ width: "100%" }} min={0} />
            </Form.Item>
          </Col>
        </Row>
      </Card>

      <Card title="Items" size="small" className="shadow-sm">
        <Form.List name={["shipment_details", "items"]}>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <div
                  key={key}
                  className="relative p-4 mb-4 border rounded-lg bg-gray-50"
                >
                  <div className="absolute top-2 right-2 z-10">
                    <Button
                      type="text"
                      danger
                      icon={<MinusCircleOutlined />}
                      onClick={() => remove(name)}
                    />
                  </div>
                  <Row gutter={16}>
                    <Col xs={24} md={12}>
                      <Form.Item
                        {...restField}
                        name={[name, "description"]}
                        label="Description"
                        rules={[{ required: true }]}
                      >
                        <Input placeholder="Item Description" />
                      </Form.Item>
                    </Col>
                    <Col xs={12} md={6}>
                      <Form.Item
                        {...restField}
                        name={[name, "sku"]}
                        label="SKU"
                      >
                        <Input placeholder="SKU" />
                      </Form.Item>
                    </Col>
                    <Col xs={12} md={6}>
                      <Form.Item
                        {...restField}
                        name={[name, "cat"]}
                        label="Category"
                      >
                        <Input placeholder="Category" />
                      </Form.Item>
                    </Col>
                    <Col xs={12} md={6}>
                      <Form.Item
                        {...restField}
                        name={[name, "price"]}
                        label="Price"
                        rules={[{ required: true }]}
                      >
                        <InputNumber style={{ width: "100%" }} min={0} />
                      </Form.Item>
                    </Col>
                    <Col xs={12} md={6}>
                      <Form.Item
                        {...restField}
                        name={[name, "quantity"]}
                        label="Quantity"
                        rules={[{ required: true }]}
                      >
                        <InputNumber style={{ width: "100%" }} min={1} />
                      </Form.Item>
                    </Col>
                    <Col xs={12} md={6}>
                      <Form.Item
                        {...restField}
                        name={[name, "hs_code"]}
                        label="HS Code"
                      >
                        <Input placeholder="HS Code" />
                      </Form.Item>
                    </Col>
                    <Col xs={12} md={6}>
                      <Form.Item
                        {...restField}
                        name={[name, "manufacture_country"]}
                        label="Mfg Country"
                      >
                        <Input placeholder="Country" />
                      </Form.Item>
                    </Col>
                  </Row>
                </div>
              ))}
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add Item
              </Button>
            </>
          )}
        </Form.List>
      </Card>
    </div>
  );
};

// ---------------- STEP 3: BILLING & OTHERS ----------------
const BillingStep = () => {
  return (
    <div className="flex flex-col gap-6">
      <Card title="GST Information" size="small" className="shadow-sm">
        <Row gutter={16}>
          <Col {...responsiveColSpan}>
            <Form.Item name={["gst_info", "seller_gstin"]} label="Seller GSTIN">
              <Input placeholder="GSTIN" />
            </Form.Item>
          </Col>
          <Col {...responsiveColSpan}>
            <Form.Item
              name={["gst_info", "enterprise_gstin"]}
              label="Enterprise GSTIN"
            >
              <Input placeholder="Enterprise GSTIN" />
            </Form.Item>
          </Col>
          <Col {...responsiveColSpan}>
            <Form.Item
              name={["gst_info", "consignee_gstin"]}
              label="Consignee GSTIN"
            >
              <Input placeholder="Consignee GSTIN" />
            </Form.Item>
          </Col>
          <Col {...responsiveColSpan}>
            <Form.Item
              name={["gst_info", "taxable_value"]}
              label="Taxable Value"
            >
              <InputNumber style={{ width: "100%" }} min={0} />
            </Form.Item>
          </Col>
          <Col {...responsiveColSpan}>
            <Form.Item name={["gst_info", "gst_total_tax"]} label="Total Tax">
              <InputNumber style={{ width: "100%" }} min={0} />
            </Form.Item>
          </Col>
          {/* <Col {...responsiveColSpan}>
            <Form.Item
              name={["gst_info", "place_of_supply"]}
              label="Place of Supply"
            >
              <Input placeholder="State/UT" />
            </Form.Item>
          </Col> */}
          <Col {...responsiveColSpan}>
            <Form.Item name={["gst_info", "hsn_code"]} label="HSN Code">
              <Input placeholder="HSN" />
            </Form.Item>
          </Col>
          <Col {...responsiveColSpan}>
            <Form.Item
              name={["gst_info", "ewaybill_serial_number"]}
              label="E-Way Bill No."
            >
              <Input placeholder="E-Way Bill" />
            </Form.Item>
          </Col>

          <Col {...responsiveColSpan}>
            <Form.Item name={["gst_info", "sgst_amount"]} label="SGST Amount">
              <InputNumber style={{ width: "100%" }} min={0} />
            </Form.Item>
          </Col>
          <Col {...responsiveColSpan}>
            <Form.Item name={["gst_info", "cgst_amount"]} label="CGST Amount">
              <InputNumber style={{ width: "100%" }} min={0} />
            </Form.Item>
          </Col>
          <Col {...responsiveColSpan}>
            <Form.Item name={["gst_info", "igst_amount"]} label="IGST Amount">
              <InputNumber style={{ width: "100%" }} min={0} />
            </Form.Item>
          </Col>

          <Col xs={24}>
            <Form.Item
              name={["gst_info", "is_seller_registered_under_gst"]}
              valuePropName="checked"
            >
              <Checkbox>Is Seller Registered Under GST?</Checkbox>
            </Form.Item>
          </Col>
        </Row>
      </Card>

      {/* <Card title="Additional Information" size="small" className="shadow-sm">
        <Row gutter={16}>
          <Col {...responsiveColSpan}>
            <Form.Item name={["additional", "vendor_code"]} label="Vendor Code">
              <Input placeholder="Vendor Code" />
            </Form.Item>
          </Col>
          <Col {...responsiveColSpan}>
            <Form.Item name={["additional", "order_date"]} label="Order Date">
              <DatePicker showTime style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col {...responsiveColSpan}>
            <Form.Item
              name={["additional", "async"]}
              label="Async Processing"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </Col>
          <Col {...responsiveColSpan}>
            <Form.Item
              name={["additional", "label"]}
              label="Generate Label"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col {...responsiveColSpan}>
            <Form.Item
              name={["additional", "return_info", "return_name"]}
              label="Return Name"
            >
              <Input placeholder="Name" />
            </Form.Item>
          </Col>
          <Col {...responsiveColSpan}>
            <Form.Item
              name={["additional", "return_info", "return_phone"]}
              label="Return Phone"
            >
              <Input placeholder="Phone" />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item
              name={["additional", "return_info", "return_address"]}
              label="Return Address"
            >
              <TextArea rows={2} placeholder="Address" />
            </Form.Item>
          </Col>
          <Col {...responsiveColSpan}>
            <Form.Item
              name={["additional", "return_info", "return_city"]}
              label="City"
            >
              <Input placeholder="City" />
            </Form.Item>
          </Col>
          <Col {...responsiveColSpan}>
            <Form.Item
              name={["additional", "return_info", "return_pincode"]}
              label="Pincode"
            >
              <Input placeholder="Pincode" />
            </Form.Item>
          </Col>
        </Row>
      </Card> */}
    </div>
  );
};

export default ComprehensiveOrderForm;
