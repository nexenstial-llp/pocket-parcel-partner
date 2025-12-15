/* eslint-disable react/prop-types */
import { Form, Input, Select, InputNumber, Switch, Card, Row, Col } from "antd";
import {
  EnvironmentOutlined,
  InfoCircleOutlined,
  BuildOutlined,
} from "@ant-design/icons";
import GoogleAddressPicker from "@/components/ui/GoogleAddressPicker";

const { TextArea } = Input;
const LOCATION_TYPES = [
  { value: "MAIN", label: "Main Hub" },
  { value: "DOCK", label: "Loading Dock" },
  { value: "OFFICE", label: "Admin Office" },
  { value: "STORAGE", label: "Storage Unit" },
  { value: "OUTPOST", label: "Remote Outpost" },
];

/**
 * Reusable form items for a Location.
 * @param {Object} props
 * @param {import("antd").FormInstance} props.form - Antd form instance
 * @param {Array<string|number>} [props.namePath] - Path for Form.Item `name` prop (relative to current context, e.g. Form.List item index)
 * @param {Array<string|number>} [props.absolutePath] - Full absolute path for direct form updates (e.g. ['locations', 0])
 * @param {Object} [props.restField] - Rest props from Form.List field (key, etc.)
 */
const LocationFormItems = ({
  form,
  namePath = [],
  absolutePath,
  restField,
}) => {
  // Use absolutePath if provided, otherwise fallback to namePath (for root forms)
  const writePath = absolutePath !== undefined ? absolutePath : namePath;

  // Helper to resolve field name based on namePath
  const getName = (name) => (namePath.length > 0 ? [...namePath, name] : name);

  return (
    <div>
      {/* --- SECTION 1: PRIMARY DETAILS --- */}
      <Row gutter={16}>
        <Col xs={24} md={14}>
          <Form.Item
            {...restField}
            label="Location Name"
            name={getName("location_name")}
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
            {...restField}
            label="Type"
            name={getName("location_type")}
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
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wide mt-2">
            <EnvironmentOutlined /> Address Details
          </div>

          <Form.Item
            {...restField}
            name={getName("address_line1")}
            rules={[{ required: true }]}
            className="mb-3"
          >
            <Input placeholder="Address Line 1" />
          </Form.Item>

          <Form.Item
            {...restField}
            name={getName("address_line2")}
            className="mb-3"
          >
            <Input placeholder="Address Line 2 (Optional)" />
          </Form.Item>

          <Form.Item {...restField} label="Landmark" name={getName("landmark")}>
            <GoogleAddressPicker
              showMap={false}
              onLocationSelect={(loc) => {
                const updates = {
                  latitude: loc.lat,
                  longitude: loc.lng,
                  landmark: loc.address,
                  pincode: loc.pincode,
                  city: loc.city,
                  state: loc.state,
                  country: loc.country,
                };

                // Construct nested object to update exact path
                const deepUpdates = writePath.reduceRight(
                  (acc, key) => ({ [key]: acc }),
                  updates
                );

                form.setFieldsValue(deepUpdates);
              }}
            />
          </Form.Item>

          <Row gutter={12}>
            <Col span={12}>
              <Form.Item
                {...restField}
                name={getName("pincode")}
                rules={[{ required: true }]}
                className="mb-3"
              >
                <Input placeholder="Pincode" maxLength={6} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                {...restField}
                name={getName("city")}
                rules={[{ required: true }]}
                className="mb-3"
              >
                <Input placeholder="City" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={12}>
            <Col span={12}>
              <Form.Item
                {...restField}
                name={getName("state")}
                rules={[{ required: true }]}
                className="mb-3"
              >
                <Input placeholder="State" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                {...restField}
                name={getName("country")}
                className="mb-3"
              >
                <Input placeholder="Country" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={12}>
            <Col span={12}>
              <Form.Item
                {...restField}
                hidden
                name={getName("latitude")}
                className="mb-0"
              >
                <InputNumber
                  className="w-full!"
                  placeholder="Lat"
                  controls={false}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                {...restField}
                hidden
                name={getName("longitude")}
                className="mb-0"
              >
                <InputNumber
                  className="w-full!"
                  placeholder="Long"
                  controls={false}
                />
              </Form.Item>
            </Col>
          </Row>
        </Col>

        {/* --- RIGHT COLUMN: Meta & Flags --- */}
        <Col xs={24} md={10}>
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wide mt-2">
            <InfoCircleOutlined /> Properties
          </div>

          <Card size="small">
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item
                  {...restField}
                  name={getName("area_size")}
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
                  {...restField}
                  name={getName("floor_info")}
                  label={<span className="text-xs text-gray-500">Floor</span>}
                  className="mb-0!"
                >
                  <Input size="small" placeholder="e.g. G-Floor" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  {...restField}
                  name={getName("special_features")}
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
              <Form.Item
                {...restField}
                name={getName("is_primary")}
                valuePropName="checked"
                noStyle
              >
                <Switch size="small" />
              </Form.Item>
            </div>
            <div className="flex items-center justify-between p-2 border rounded bg-white">
              <span className="text-sm text-gray-600">Active Status</span>
              <Form.Item
                {...restField}
                name={getName("is_active")}
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
