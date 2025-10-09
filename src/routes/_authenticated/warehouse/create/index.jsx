import PageLayout from "@/components/layout/PageLayout";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumb, Button, Col, Form, Input, Row, Select } from "antd";

export const Route = createFileRoute("/_authenticated/warehouse/create/")({
  component: RouteComponent,
});
const responsiveColSpan = {
  xs: 24, // Full width on mobile
  sm: 12, // Half width on tablets
  md: 8, // 1/3 width on medium screens
  lg: 6, // 1/4 width on large screens
};

function RouteComponent() {
  const [form] = Form.useForm();
  return (
    <PageLayout>
      <Breadcrumb
        items={[
          { title: "Home" },
          { title: <Link to="/warehouse/list">Warehouse List</Link> },
          { title: "Create Warehouse" },
        ]}
      />
      <ResponsiveCard
        actions={[
          <div key={"submit"} className="flex gap-2 px-2">
            <Button type="primary" htmlType="submit" form="create-warehouse">
              Submit
            </Button>
            <Button htmlType="reset" form="create-warehouse">
              Clear All
            </Button>
          </div>,
        ]}
        title="Create Warehouse"
      >
        <Form name="create-warehouse" form={form} layout="vertical">
          <Row gutter={16}>
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
                  { required: true, message: "Contact Person is required" },
                ]}
                name={"contact_person_name"}
                label="Contact Person"
              >
                <Input placeholder="Enter Contact Person" />
              </Form.Item>
            </Col>
            <Col {...responsiveColSpan}>
              <Form.Item
                rules={[{ required: true, message: "Phone Code is required" }]}
                name={"phone_code"}
                label="Phone Code"
              >
                <Input placeholder="Enter Phone Code" />
              </Form.Item>
            </Col>
            <Col {...responsiveColSpan}>
              <Form.Item
                rules={[
                  { required: true, message: "Phone Number is required" },
                  //    Pattern of phone number
                  { pattern: /^[0-9]{10}$/, message: "Invalid phone number" },
                ]}
                name={"phone_number"}
                label="Phone Number"
              >
                <Input placeholder="Enter Phone Number" />
              </Form.Item>
            </Col>
            {/* Email */}
            <Col {...responsiveColSpan}>
              <Form.Item
                rules={[
                  { required: true, message: "Email is required" },
                  { type: "email", message: "Invalid email" },
                ]}
                name={"email"}
                label="Email"
              >
                <Input placeholder="Enter Email" />
              </Form.Item>
            </Col>
            {/* GST Number */}
            <Col {...responsiveColSpan}>
              <Form.Item
                rules={[
                  { required: true, message: "GST Number is required" },
                  {
                    pattern:
                      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
                    message: "Invalid GST Number",
                  },
                ]}
                name={"gst_number"}
                label="GST Number"
              >
                <Input placeholder="Enter GST Number" />
              </Form.Item>
            </Col>
            {/* Tin Number */}
            <Col {...responsiveColSpan}>
              <Form.Item
                rules={[{ required: true, message: "TIN Number is required" }]}
                name={"tin_number"}
                label="TIN Number"
              >
                <Input placeholder="Enter TIN Number" />
              </Form.Item>
            </Col>
            {/* Address */}
            <Col {...responsiveColSpan}>
              <Form.Item
                rules={[{ required: true, message: "Address is required" }]}
                name={"address"}
                label="Address"
              >
                <Input placeholder="Enter Address" />
              </Form.Item>
            </Col>
            {/* Pincode */}
            <Col {...responsiveColSpan}>
              <Form.Item
                rules={[{ required: true, message: "Pincode is required" }]}
                name={"pincode"}
                label="Pincode"
              >
                <Input placeholder="Enter Pincode" />
              </Form.Item>
            </Col>
            {/* City */}
            <Col {...responsiveColSpan}>
              <Form.Item
                rules={[{ required: true, message: "City is required" }]}
                name={"city"}
                label="City"
              >
                <Input placeholder="Enter City" />
              </Form.Item>
            </Col>
            {/* State */}
            <Col {...responsiveColSpan}>
              <Form.Item
                rules={[{ required: true, message: "State is required" }]}
                name={"state"}
                label="State"
              >
                <Select placeholder="Select State" />
              </Form.Item>
            </Col>
            {/* Country */}
            <Col {...responsiveColSpan}>
              <Form.Item
                rules={[{ required: true, message: "Country is required" }]}
                name={"country"}
                label="Country"
              >
                <Select placeholder="Select Country" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </ResponsiveCard>
    </PageLayout>
  );
}
