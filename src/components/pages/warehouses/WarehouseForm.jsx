/* eslint-disable react/prop-types */
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Select } from "antd";
import { Divider } from "antd";
import { Checkbox } from "antd";
import { Input, Row } from "antd";
import { Button, Col, Form } from "antd";
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
    <Form
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
            rules={[{ required: true, message: "Warehouse Name is required" }]}
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
            rules={[{ required: true, message: "Contact Person is required" }]}
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
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }, idx) => (
                    <div key={key} className="p-4 mb-4 border rounded">
                      <Row gutter={12} align="middle">
                        <Col span={20}>
                          <Row gutter={12}>
                            <Col span={12}>
                              <Form.Item
                                {...restField}
                                name={[name, "location_name"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Location name required",
                                  },
                                ]}
                                label={`Location ${idx + 1} - Name`}
                              >
                                <Input placeholder="Main Building" />
                              </Form.Item>
                            </Col>
                            <Col span={12}>
                              <Form.Item
                                {...restField}
                                name={[name, "address_line1"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Address required",
                                  },
                                ]}
                                label="Address Line 1"
                              >
                                <Input placeholder="123 Warehouse Street" />
                              </Form.Item>
                            </Col>
                          </Row>

                          <Row gutter={12}>
                            <Col span={8}>
                              <Form.Item
                                {...restField}
                                name={[name, "city"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "City required",
                                  },
                                ]}
                                label="City"
                              >
                                <Input placeholder="Bangalore" />
                              </Form.Item>
                            </Col>

                            <Col span={8}>
                              <Form.Item
                                {...restField}
                                name={[name, "state"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "State required",
                                  },
                                ]}
                                label="State"
                              >
                                <Select
                                  placeholder="Select State"
                                  options={[
                                    {
                                      value: "Karnataka",
                                      label: "Karnataka",
                                    },
                                    {
                                      value: "Maharashtra",
                                      label: "Maharashtra",
                                    },
                                  ]}
                                />
                              </Form.Item>
                            </Col>

                            <Col span={8}>
                              <Form.Item
                                {...restField}
                                name={[name, "pincode"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Pincode required",
                                  },
                                  {
                                    min: 6,
                                    max: 10,
                                    message:
                                      "Pincode must be between 6 and 10 digits",
                                  },
                                ]}
                                label="Pincode"
                              >
                                <Input placeholder="560001" />
                              </Form.Item>
                            </Col>
                          </Row>

                          <Row gutter={12}>
                            <Col span={8}>
                              <Form.Item
                                {...restField}
                                name={[name, "country"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Country required",
                                  },
                                ]}
                                label="Country"
                              >
                                <Select
                                  placeholder="Select Country"
                                  options={[{ value: "India", label: "India" }]}
                                />
                              </Form.Item>
                            </Col>

                            <Col span={8}>
                              <Form.Item
                                {...restField}
                                name={[name, "location_type"]}
                                label="Location Type"
                              >
                                <Select
                                  placeholder="Type"
                                  options={[
                                    { value: "MAIN", label: "MAIN" },
                                    { value: "DOCK", label: "DOCK" },
                                    { value: "STORAGE", label: "STORAGE" },
                                    { value: "OFFICE", label: "OFFICE" },
                                    { value: "SORTING", label: "SORTING" },
                                    { value: "LOADING", label: "LOADING" },
                                  ]}
                                />
                              </Form.Item>
                            </Col>

                            <Col span={8}>
                              <Form.Item
                                {...restField}
                                name={[name, "is_primary"]}
                                valuePropName="checked"
                                label="Primary Location"
                              >
                                <Checkbox>Is Primary</Checkbox>
                              </Form.Item>
                            </Col>
                          </Row>

                          <Row gutter={12}>
                            <Col span={12}>
                              <Form.Item
                                {...restField}
                                name={[name, "area_size"]}
                                label="Area Size"
                              >
                                <Input placeholder='e.g. "5000 sq ft"' />
                              </Form.Item>
                            </Col>

                            <Col span={12}>
                              <Form.Item
                                {...restField}
                                name={[name, "floor_info"]}
                                label="Floor Info"
                              >
                                <Input placeholder="Ground Floor" />
                              </Form.Item>
                            </Col>
                          </Row>
                        </Col>

                        <Col span={4} style={{ textAlign: "right" }}>
                          <Button
                            type="text"
                            danger
                            onClick={() => remove(name)}
                            icon={<MinusCircleOutlined />}
                          >
                            Remove
                          </Button>
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
              )}
            </Form.List>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default WarehouseForm;
