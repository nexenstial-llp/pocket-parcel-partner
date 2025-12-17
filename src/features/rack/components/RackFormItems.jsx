import { Form, Input, InputNumber, Select, Switch, Row, Col } from "antd";
import {
  BarcodeOutlined,
  EnvironmentOutlined,
  ColumnHeightOutlined,
  InfoCircleOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import { Typography } from "antd";
import PaginatedSelect from "@/components/ui/PaginatedSelect";
const { Text } = Typography;
const RackFormItems = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8!">
      {/* Section 1: Core Identification */}
      <ResponsiveCard
        size={"small"}
        className="shadow-sm"
        title={
          <div className="flex items-center gap-2 text-blue-600">
            <BarcodeOutlined />
            <span>Identification</span>
          </div>
        }
      >
        <Row gutter={16}>
          <Col xs={24}>
            <Form.Item
              label="Warehouse ID"
              name="warehouse_id"
              rules={[{ required: true }]}
              tooltip="The unique identifier for the warehouse"
            >
              <PaginatedSelect
                fetchUrl="/v1/transit-warehouse/warehouses"
                valueField="id"
                labelField="name"
                queryKey="warehouses"
                placeholder="Select warehouse"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Rack Code"
              name="rack_code"
              rules={[
                { required: true },
                {
                  pattern: /^[A-Z0-9\-_]+$/,
                  message: "Uppercase, numbers, '-' or '_' only",
                },
              ]}
            >
              <Input
                placeholder="e.g., A1-L1"
                className="font-mono uppercase"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Rack Name"
              name="rack_name"
              rules={[{ required: true }]}
            >
              <Input placeholder="e.g., Aisle A - Standard" />
            </Form.Item>
          </Col>
        </Row>
      </ResponsiveCard>

      {/* Section 2: Location & Positioning */}
      <ResponsiveCard
        size={"small"}
        className="shadow-sm"
        title={
          <div className="flex items-center gap-2 text-purple-600">
            <EnvironmentOutlined />
            <span>Location & Positioning</span>
          </div>
        }
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <Form.Item label="Zone" name="zone">
            <Input placeholder="Zone A" />
          </Form.Item>
          <Form.Item label="Aisle" name="aisle">
            <Input placeholder="A" className="uppercase" />
          </Form.Item>
          <Form.Item label="Row" name="row">
            <Input placeholder="1" />
          </Form.Item>
          <Form.Item
            label="Level"
            name="level"
            rules={[{ type: "number", min: 0 }]}
          >
            <InputNumber min={0} className="w-full!" placeholder="1" />
          </Form.Item>
          <div className="col-span-2 md:col-span-4">
            <Form.Item label="Full Location Description" name="location">
              <Input placeholder="e.g., Ground Floor - North Wing - Section A" />
            </Form.Item>
          </div>
        </div>
      </ResponsiveCard>

      {/* Section 3: Physical Properties */}
      <ResponsiveCard
        size={"small"}
        className="shadow-sm"
        title={
          <div className="flex items-center gap-2 text-green-600">
            <ColumnHeightOutlined />
            <span>Physical Properties</span>
          </div>
        }
      >
        <Row gutter={[24, 24]}>
          <Col xs={24}>
            <div className="bg-gray-50 p-2 rounded-lg border border-gray-100">
              <Text strong className="block mb-4 text-gray-500">
                Capacity Limits
              </Text>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Max Capacity" name="capacity">
                    <InputNumber
                      className="w-full!"
                      placeholder="100"
                      suffix="items"
                      controls={false}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Max Weight" name="max_weight">
                    <InputNumber
                      className="w-full!"
                      step={0.1}
                      placeholder="500"
                      suffix="kg"
                      controls={false}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </div>
          </Col>

          <Col xs={24}>
            <div className="bg-gray-50 p-2 rounded-lg border border-gray-100 mt-4 lg:mt-0">
              <Text strong className="block mb-4 text-gray-500">
                Dimensions
              </Text>
              <div className="flex gap-2 items-end">
                <Form.Item
                  label="W"
                  name={["dimensions", "width"]}
                  className="mb-0 flex-1"
                  rules={[{ type: "number", min: 0 }]}
                >
                  <InputNumber
                    min={0}
                    placeholder="Width"
                    className="w-full!"
                  />
                </Form.Item>

                <Form.Item
                  label="H"
                  name={["dimensions", "height"]}
                  className="mb-0 flex-1"
                  rules={[{ type: "number", min: 0 }]}
                >
                  <InputNumber
                    min={0}
                    placeholder="Height"
                    className="w-full!"
                  />
                </Form.Item>

                <Form.Item
                  label="D"
                  name={["dimensions", "depth"]}
                  className="mb-0 flex-1"
                  rules={[{ type: "number", min: 0 }]}
                >
                  <InputNumber
                    min={0}
                    placeholder="Depth"
                    className="w-full!"
                  />
                </Form.Item>
                <Form.Item
                  name={["dimensions", "unit"]}
                  initialValue="cm"
                  className="mb-0 w-20"
                >
                  <Select variant="filled">
                    <Select.Option value="cm">cm</Select.Option>
                    <Select.Option value="m">m</Select.Option>
                    <Select.Option value="ft">ft</Select.Option>
                  </Select>
                </Form.Item>
              </div>
            </div>
          </Col>
        </Row>
      </ResponsiveCard>

      {/* Section 4: Configuration & Meta */}
      <ResponsiveCard
        size={"small"}
        className="shadow-sm"
        title={
          <div className="flex items-center gap-2 text-orange-600">
            <InfoCircleOutlined />
            <span>Configuration</span>
          </div>
        }
      >
        <Row gutter={24}>
          <Col xs={24} md={16}>
            <Form.Item
              label="Rack Type"
              name="rack_type"
              initialValue="STANDARD"
            >
              <Select
                placeholder="Select Type"
                suffixIcon={<InboxOutlined />}
                options={[
                  { value: "STANDARD", label: "Standard Storage" },
                  { value: "HEAVY_DUTY", label: "Heavy Duty" },
                  { value: "FRAGILE", label: "Fragile Goods" },
                  { value: "COLD_STORAGE", label: "Cold Storage" },
                  { value: "HAZMAT", label: "Hazardous Materials" },
                ]}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <div className="flex flex-col h-full justify-between">
              <Form.Item
                name="is_active"
                label="Status"
                valuePropName="checked"
                initialValue={true}
              >
                <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
              </Form.Item>
            </div>
          </Col>
          <Col xs={24}>
            <Form.Item label="Notes" name="notes">
              <Input.TextArea
                rows={3}
                placeholder="Additional operational notes..."
                showCount
                maxLength={500}
              />
            </Form.Item>
          </Col>

          {/* <Divider size="small" orientation="left">
            Metadata
          </Divider>

          <Col xs={24}>
            <Form.List name="metadata">
              {(fields, { add, remove }) => {
                return (
                  <>
                    {fields.map(({ key, name, ...restField }) => {
                      return (
                        <Space
                          key={key}
                          style={{ display: "flex", marginBottom: 8 }}
                          align="baseline"
                        >
                          <Form.Item
                            {...restField}
                            name={[name, "key"]}
                            rules={[
                              { required: true, message: "Missing key" },
                              {
                                pattern: /^[a-zA-Z][a-zA-Z0-9]*$/,
                                message:
                                  "Key should not start with number and contain any spaces",
                              },
                            ]}
                          >
                            <Input placeholder="Metadata Key" />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, "value"]}
                            rules={[
                              { required: true, message: "Missing value" },
                            ]}
                          >
                            <Input placeholder="Metadata value" />
                          </Form.Item>
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </Space>
                      );
                    })}
                    <Form.Item>
                      <Button
                        className="w-full!"
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        Add field
                      </Button>
                    </Form.Item>
                  </>
                );
              }}
            </Form.List>
          </Col> */}
        </Row>
      </ResponsiveCard>
    </div>
  );
};

export default RackFormItems;
