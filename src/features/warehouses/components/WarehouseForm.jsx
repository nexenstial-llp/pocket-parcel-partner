/* eslint-disable react/prop-types */
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Divider } from "antd";
import { Input, Row } from "antd";
import { Button, Col, Form } from "antd";
import LocationFormItems from "@/features/warehouses/components/LocationFormItems";
import { APIProvider } from "@vis.gl/react-google-maps";

const API_KEY = import.meta.env.VITE_APP_GOOGLE_API_KEY;

const responsiveColSpan = {
  xs: 24,
  sm: 12,
  md: 8,
  lg: 6,
};

const WarehouseForm = ({
  isPending,
  handleSubmit,
  form,
  formName = "create-warehouse",
}) => {
  return (
    <APIProvider apiKey={API_KEY} libraries={["places", "geocoding"]}>
      <Form
        size="small"
        disabled={isPending}
        onFinish={handleSubmit}
        name={formName}
        form={form}
        layout="vertical"
        initialValues={{
          locations: [
            {
              location_name: "",
              address_line1: "",
              city: "",
              state: "Karnataka",
              pincode: "",
              country: "India",
              location_type: "MAIN",
              is_primary: true,
              area_size: "",
              floor_info: "",
            },
          ],
        }}
      >
        <Row gutter={16}>
          {/* Basic info */}
          <Col {...responsiveColSpan}>
            <Form.Item
              rules={[
                { required: true, message: "Warehouse Name is required" },
              ]}
              name={"name"}
              label="Warehouse Name"
            >
              <Input placeholder="Enter Warehouse Name" />
            </Form.Item>
          </Col>

          <Col {...responsiveColSpan}>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Warehouse code is required",
                },
              ]}
              name={"code"}
              label="Warehouse Code"
            >
              <Input placeholder="Enter Code (e.g. TW001)" />
            </Form.Item>
          </Col>

          <Col xs={24}>
            <Form.Item name={"description"} label="Description">
              <Input.TextArea rows={3} placeholder="Description" />
            </Form.Item>
          </Col>

          {/* Contact */}
          <Col {...responsiveColSpan}>
            <Form.Item
              rules={[
                { required: true, message: "Contact Person is required" },
              ]}
              name={"contact_person"}
              label="Contact Person"
            >
              <Input placeholder="Enter Contact Person" />
            </Form.Item>
          </Col>

          <Col {...responsiveColSpan}>
            <Form.Item
              rules={[
                { required: true, message: "Phone Number is required" },
                { pattern: /^[0-9]{10}$/, message: "Invalid phone number" },
              ]}
              name={"contact_phone"}
              label="Phone Number"
            >
              <Input placeholder="Enter Phone Number" />
            </Form.Item>
          </Col>

          <Col {...responsiveColSpan}>
            <Form.Item
              rules={[
                { required: true, message: "Email is required" },
                { type: "email", message: "Invalid email" },
              ]}
              name={"contact_email"}
              label="Email"
            >
              <Input placeholder="Enter Email" />
            </Form.Item>
          </Col>

          {/* Capacity info: split into two inputs and stringify on submit */}
          <Col {...responsiveColSpan}>
            <Form.Item name={"total_area"} label="Total Area">
              <Input placeholder='e.g. "10000 sq ft"' />
            </Form.Item>
          </Col>
          <Col {...responsiveColSpan}>
            <Form.Item name={"storage_capacity"} label="Storage Capacity">
              <Input placeholder='e.g. "5000 parcels"' />
            </Form.Item>
          </Col>

          <Col {...responsiveColSpan}>
            <Form.Item name={"operating_hours"} label="Operating Hours">
              <Input placeholder='e.g. "Mon-Fri: 9AM-6PM, Sat: 9AM-2PM"' />
            </Form.Item>
          </Col>

          <Divider />

          {/* Locations list */}
          <Col xs={24}>
            <Form.Item label="Locations (add one or more)">
              <Form.List name="locations">
                {(fields, { add, remove }) => {
                  return (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                        <div key={key} className="p-4 mb-4 border rounded">
                          <Row gutter={12} align="middle">
                            <Col span={22}>
                              <LocationFormItems
                                form={form}
                                namePath={[name]}
                                absolutePath={["locations", name]}
                                restField={restField}
                              />
                            </Col>

                            <Col
                              span={2}
                              style={{
                                textAlign: "right",
                                alignSelf: "flex-start",
                              }}
                            >
                              <Button
                                type="text"
                                danger
                                onClick={() => remove(name)}
                                icon={<MinusCircleOutlined />}
                              />
                            </Col>
                          </Row>
                        </div>
                      ))}

                      <Form.Item>
                        <Button
                          type="dashed"
                          onClick={() => add()}
                          block
                          icon={<PlusOutlined />}
                        >
                          Add location
                        </Button>
                      </Form.Item>
                    </>
                  );
                }}
              </Form.List>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </APIProvider>
  );
};

export default WarehouseForm;
