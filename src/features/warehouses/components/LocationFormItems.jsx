/* eslint-disable react/prop-types */
import { Form, Input, Select, InputNumber, Switch, Card, Row, Col } from "antd";
import {
  EnvironmentOutlined,
  InfoCircleOutlined,
  BuildOutlined,
} from "@ant-design/icons";
import SelectLocationModal from "@/components/ui/maps/SelectLocationModal";
const { TextArea } = Input;
const LOCATION_TYPES = [
  { value: "MAIN", label: "Main Hub" },
  { value: "DOCK", label: "Loading Dock" },
  { value: "OFFICE", label: "Admin Office" },
  { value: "STORAGE", label: "Storage Unit" },
  { value: "OUTPOST", label: "Remote Outpost" },
];
const LocationFormItems = ({ form }) => {
  return (
    <div>
      {/* --- SECTION 1: PRIMARY DETAILS --- */}
      <Row gutter={16}>
        <Col xs={24} md={14}>
          <Form.Item
            label="Location Name"
            name="location_name"
            rules={[{ required: true }]}
            className="mb-0"
          >
            <Input
              prefix={<BuildOutlined className="text-gray-400" />}
              placeholder="e.g. Terminal 1 - North Wing"
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={10}>
          <Form.Item
            label="Type"
            name="location_type"
            initialValue="MAIN"
            className="mb-0"
          >
            <Select options={LOCATION_TYPES} placeholder="Select type" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        {/* --- LEFT COLUMN: Address & Geo --- */}
        <Col xs={24} md={14}>
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
            <EnvironmentOutlined /> Address Details
          </div>

          <Form.Item
            name="address_line1"
            rules={[{ required: true }]}
            className="mb-3"
          >
            <Input placeholder="Address Line 1" />
          </Form.Item>

          <Form.Item name="address_line2" className="mb-3">
            <Input placeholder="Address Line 2 (Optional)" />
          </Form.Item>

          <Row gutter={12}>
            <Col span={12}>
              <Form.Item
                name="city"
                rules={[{ required: true }]}
                className="mb-3"
              >
                <Input placeholder="City" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="pincode"
                rules={[{ required: true }]}
                className="mb-3"
              >
                <Input placeholder="Pincode" maxLength={6} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={12}>
            <Col span={12}>
              <Form.Item
                name="state"
                rules={[{ required: true }]}
                className="mb-3"
              >
                <Input placeholder="State" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="country" initialValue="India" className="mb-3">
                <Input placeholder="Country" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="landmark" className="mb-4">
            <Input
              prefix={<EnvironmentOutlined className="text-gray-400" />}
              placeholder="Nearby Landmark"
            />
          </Form.Item>

          <Row gutter={12}>
            <Col span={8}>
              <Form.Item name="latitude" className="mb-0">
                <InputNumber
                  className="w-full!"
                  placeholder="Lat"
                  controls={false}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="longitude" className="mb-0">
                <InputNumber
                  className="w-full!"
                  placeholder="Long"
                  controls={false}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <SelectLocationModal
                label="Pick on Map"
                form={form}
                latitude="latitude"
                longitude="longitude"
                size="small"
                type="link"
              />
            </Col>
          </Row>
        </Col>

        {/* --- RIGHT COLUMN: Meta & Flags --- */}
        <Col xs={24} md={10}>
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
            <InfoCircleOutlined /> Properties
          </div>

          <Card size="small">
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item
                  name="area_size"
                  label={
                    <span className="text-xs text-gray-500">Area Size</span>
                  }
                  className="mb-0!"
                >
                  <Input size="small" placeholder="Sq Ft" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="floor_info"
                  label={<span className="text-xs text-gray-500">Floor</span>}
                  className="mb-0!"
                >
                  <Input size="small" placeholder="e.g. G-Floor" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="special_features"
                  label={
                    <span className="text-xs text-gray-500">Features</span>
                  }
                  className="mb-0"
                >
                  <TextArea
                    rows={2}
                    size="small"
                    placeholder="CCTV, Ramp..."
                    className="resize-none"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wide mt-2">
            Settings
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between p-2 border rounded bg-white">
              <span className="text-sm text-gray-600">Primary Location</span>
              <Form.Item name="is_primary" valuePropName="checked" noStyle>
                <Switch size="small" />
              </Form.Item>
            </div>
            <div className="flex items-center justify-between p-2 border rounded bg-white">
              <span className="text-sm text-gray-600">Active Status</span>
              <Form.Item
                name="is_active"
                valuePropName="checked"
                initialValue={true}
                noStyle
              >
                <Switch size="small" defaultChecked />
              </Form.Item>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default LocationFormItems;
