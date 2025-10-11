import { Button, Card, Divider, Form, Input, InputNumber } from "antd";

const ForwardItems = () => {
  return (
    <Form.List name={["shipment_details", "items"]}>
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }) => (
            <Card
              key={key}
              size="small"
              title={`Item ${name + 1}`}
              style={{ marginBottom: 16 }}
              extra={
                fields.length > 1 ? (
                  <Button danger onClick={() => remove(name)}>
                    Remove
                  </Button>
                ) : null
              }
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4">
                <Form.Item
                  {...restField}
                  name={[name, "product_url"]}
                  label="Product URL"
                  rules={[{ required: true, type: "url" }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "price"]}
                  label="Price"
                  rules={[{ required: true, type: "number", min: 0 }]}
                >
                  <InputNumber style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "description"]}
                  label="Description"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "quantity"]}
                  label="Quantity"
                  rules={[{ required: true, type: "number", min: 1 }]}
                >
                  <InputNumber style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "weight"]}
                  label="Weight"
                  rules={[{ required: true, type: "number", min: 0 }]}
                >
                  <InputNumber style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "sku"]}
                  label="SKU"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </div>
              <Divider className="col-span-12">Additional Info</Divider>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4">
                <Form.Item
                  {...restField}
                  name={[name, "additional", "length"]}
                  label="Length"
                  rules={[{ type: "number", min: 0 }]}
                >
                  <InputNumber style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "additional", "height"]}
                  label="Height"
                  rules={[{ type: "number", min: 0 }]}
                >
                  <InputNumber style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "additional", "breadth"]}
                  label="Breadth"
                  rules={[{ type: "number", min: 0 }]}
                >
                  <InputNumber style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "additional", "weight"]}
                  label="Weight"
                  rules={[{ type: "number", min: 0 }]}
                >
                  <InputNumber style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "additional", "images"]}
                  label="Images (comma-separated URLs)"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "additional", "return_days"]}
                  label="Return Days"
                  rules={[{ type: "number", min: 0 }]}
                >
                  <InputNumber style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "additional", "cat"]}
                  label="Category"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "additional", "manufacture_country_code"]}
                  label="Manufacture Country Code"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "additional", "manufacture_country"]}
                  label="Manufacture Country"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "additional", "exchange_days"]}
                  label="Exchange Days"
                  rules={[{ type: "number", min: 0 }]}
                >
                  <InputNumber style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "additional", "color"]}
                  label="Color"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "additional", "sub_category"]}
                  label="Sub Category"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "additional", "size"]}
                  label="Size"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "additional", "brand"]}
                  label="Brand"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "additional", "special_instructions"]}
                  label="Special Instructions"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "additional", "imei"]}
                  label="IMEI"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "additional", "ean"]}
                  label="EAN"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "additional", "product_url"]}
                  label="Product URL"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "additional", "return_reason"]}
                  label="Return Reason"
                >
                  <Input />
                </Form.Item>
              </div>
            </Card>
          ))}
          <Form.Item>
            <Button type="dashed" onClick={() => add()} block>
              Add Item
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  );
};

export default ForwardItems;
