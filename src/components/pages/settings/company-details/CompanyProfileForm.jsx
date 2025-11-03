import { UploadOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import {
  Form,
  Input,
  Button,
  Collapse,
  Row,
  Col,
  Select,
  Switch,
  InputNumber,
} from "antd";
import { useState } from "react";

const { TextArea } = Input;
const { Option } = Select;

const CompanyProfileForm = () => {
  const [form] = Form.useForm();
  const [isUpdating, setIsUpdating] = useState(false);

  const onFinish = (values) => {
    console.log("Warehouse Partner Data:", values);
    // TODO: Call your API or mutation here
  };
  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        className="space-y-4"
        disabled={isUpdating}
      >
        <Collapse
          defaultActiveKey={["1"]}
          bordered={false}
          items={[
            {
              label: "Basic Information",
              key: "1",
              children: (
                <Row gutter={16}>
                  <Col span={8}>
                    <Form.Item
                      name="warehouse_name"
                      label="Warehouse Name"
                      rules={[
                        { required: true, message: "Enter warehouse name" },
                      ]}
                    >
                      <Input placeholder="e.g. BlueDart Mumbai Hub" />
                    </Form.Item>
                  </Col>

                  <Col span={8}>
                    <Form.Item name="partner_code" label="Partner Code">
                      <Input placeholder="e.g. BDMH001" />
                    </Form.Item>
                  </Col>

                  <Col span={8}>
                    <Form.Item
                      name="type"
                      label="Warehouse Type"
                      rules={[{ required: true }]}
                    >
                      <Select placeholder="Select type">
                        <Option value="Owned">Owned</Option>
                        <Option value="Third-Party">Third-Party</Option>
                        <Option value="Franchise">Franchise</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col span={8}>
                    <Form.Item
                      name="is_active"
                      label="Active Status"
                      valuePropName="checked"
                      initialValue={true}
                    >
                      <Switch />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item name="warehouse_logo" label="Warehouse Logo">
                      <Upload
                        // listType="picture"
                        accept=".png, .jpg, .jpeg, .svg"
                      >
                        <Button type="primary" icon={<UploadOutlined />}>
                          Upload
                        </Button>
                      </Upload>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item name="warehouse_photo" label="Warehouse Photo">
                      <Upload accept=".png, .jpg, .jpeg, .svg">
                        <Button type="primary" icon={<UploadOutlined />}>
                          Upload
                        </Button>
                      </Upload>
                    </Form.Item>
                  </Col>
                </Row>
              ),
            },
            {
              label: "Address & Location",
              key: "2",
              children: (
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name={["address", "line1"]}
                      label="Address Line 1"
                      rules={[{ required: true }]}
                    >
                      <Input placeholder="Building / Street" />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      name={["address", "line2"]}
                      label="Address Line 2"
                    >
                      <Input placeholder="Landmark / Area" />
                    </Form.Item>
                  </Col>

                  <Col span={8}>
                    <Form.Item
                      name={["address", "city"]}
                      label="City"
                      rules={[{ required: true }]}
                    >
                      <Input placeholder="City" />
                    </Form.Item>
                  </Col>

                  <Col span={8}>
                    <Form.Item
                      name={["address", "state"]}
                      label="State"
                      rules={[{ required: true }]}
                    >
                      <Input placeholder="State" />
                    </Form.Item>
                  </Col>

                  <Col span={8}>
                    <Form.Item
                      name={["address", "postal_code"]}
                      label="Postal Code"
                      rules={[{ required: true }]}
                    >
                      <Input placeholder="e.g. 400093" />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item name={["address", "country"]} label="Country">
                      <Input placeholder="e.g. India" />
                    </Form.Item>
                  </Col>

                  <Col span={6}>
                    <Form.Item name={["address", "latitude"]} label="Latitude">
                      <InputNumber
                        placeholder="19.0760"
                        className="w-full"
                        step={0.000001}
                      />
                    </Form.Item>
                  </Col>

                  <Col span={6}>
                    <Form.Item
                      name={["address", "longitude"]}
                      label="Longitude"
                    >
                      <InputNumber
                        placeholder="72.8777"
                        className="w-full"
                        step={0.000001}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              ),
            },
            {
              label: "Contact Information",
              key: "3",
              children: (
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name={["contact", "name"]}
                      label="Primary Contact Name"
                      rules={[{ required: true }]}
                    >
                      <Input placeholder="e.g. Rajesh Sharma" />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      name={["contact", "phone"]}
                      label="Contact Number"
                      rules={[{ required: true }]}
                    >
                      <Input placeholder="+91 9876543210" />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      name={["contact", "email"]}
                      label="Email Address"
                    >
                      <Input placeholder="e.g. rajesh@bluedart.com" />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      name={["contact", "alternate"]}
                      label="Alternate Contact"
                    >
                      <Input placeholder="+91 9123456789" />
                    </Form.Item>
                  </Col>
                </Row>
              ),
            },
            {
              label: "Legal & Banking Details",
              key: "4",
              children: (
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item name="gst_number" label="GST Number">
                      <Input placeholder="27ABCDE1234F1Z5" />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item name="pan_number" label="PAN Number">
                      <Input placeholder="ABCDE1234F" />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      name={["bank", "account_name"]}
                      label="Account Name"
                    >
                      <Input placeholder="BlueDart Logistics Pvt Ltd" />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      name={["bank", "account_number"]}
                      label="Account Number"
                    >
                      <Input placeholder="1234567890" />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item name={["bank", "ifsc"]} label="IFSC Code">
                      <Input placeholder="HDFC0001234" />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item name={["bank", "upi_id"]} label="UPI ID">
                      <Input placeholder="bluedart@hdfcbank" />
                    </Form.Item>
                  </Col>
                </Row>
              ),
            },
            {
              label: "Operational Information",
              key: "5",
              children: (
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item name="capacity" label="Storage Capacity">
                      <Input placeholder="e.g. 10000 parcels/day" />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item name="operating_hours" label="Operating Hours">
                      <Input placeholder="e.g. 9:00 AM - 8:00 PM" />
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Form.Item
                      name="service_pincodes"
                      label="Service Pincodes"
                      tooltip="Enter multiple pincodes separated by commas"
                    >
                      <Select
                        mode="tags"
                        tokenSeparators={[","]}
                        placeholder="e.g. 400001, 400002"
                      />
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Form.Item name="remarks" label="Remarks / Notes">
                      <TextArea
                        rows={3}
                        placeholder="Add internal notes here"
                      />
                    </Form.Item>
                  </Col>
                </Row>
              ),
            },
          ]}
        />
      </Form>
      <div className="flex justify-end gap-4 mt-6">
        {isUpdating ? (
          <>
            <Button htmlType="reset">Reset</Button>
            <Button onClick={() => onFinish()} type="primary" htmlType="submit">
              Save
            </Button>
          </>
        ) : (
          <Button type="primary" onClick={() => setIsUpdating(true)}>
            Update
          </Button>
        )}
      </div>
    </div>
  );
};

export default CompanyProfileForm;
