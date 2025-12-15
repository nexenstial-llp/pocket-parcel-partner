/* eslint-disable react/prop-types */

import { Divider } from "antd";
import { Input, Row } from "antd";
import { Col, Form } from "antd";

const responsiveColSpan = {
  xs: 24,
  sm: 12,
  md: 8,
  lg: 6,
};

const EditWarehouseForm = ({ form, handleSubmit, isPending, formName }) => {
  return (
    <Form
      size="small"
      disabled={isPending}
      onFinish={handleSubmit}
      name={formName}
      form={form}
      layout="vertical"
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
      </Row>
    </Form>
  );
};

export default EditWarehouseForm;
