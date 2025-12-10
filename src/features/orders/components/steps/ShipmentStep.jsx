import { Form, Row, Col, Select, InputNumber } from "antd";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import PaginatedSelect from "@/components/ui/PaginatedSelect";

const deliveryTypeOptions = [
  { label: "Forward", value: "FORWARD" },
  { label: "Reverse", value: "REVERSE" },
];

const responsiveColSpan = { xs: 24, sm: 12, md: 8, lg: 6 };

const ShipmentStep = () => {
  const category_id = Form.useWatch(["shipment_details", "category_id"]);
  const sub_category_id = Form.useWatch([
    "shipment_details",
    "sub_category_id",
  ]);
  return (
    <div className="flex flex-col gap-6">
      <ResponsiveCard title="Shipment Details">
        <Row gutter={16}>
          <Col {...responsiveColSpan}>
            <Form.Item
              name={["shipment_details", "delivery_type"]}
              label="Delivery Type"
              initialValue="FORWARD"
            >
              <Select options={deliveryTypeOptions} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col {...responsiveColSpan}>
            <Form.Item name={["shipment_details", "length"]} label="Length">
              <InputNumber
                style={{ width: "100%" }}
                min={0}
                controls={false}
                addonAfter="cm"
              />
            </Form.Item>
          </Col>
          <Col {...responsiveColSpan}>
            <Form.Item name={["shipment_details", "breadth"]} label="Breadth">
              <InputNumber
                style={{ width: "100%" }}
                min={0}
                controls={false}
                addonAfter="cm"
              />
            </Form.Item>
          </Col>
          <Col {...responsiveColSpan}>
            <Form.Item name={["shipment_details", "height"]} label="Height">
              <InputNumber
                style={{ width: "100%" }}
                min={0}
                controls={false}
                addonAfter="cm"
              />
            </Form.Item>
          </Col>
          <Col {...responsiveColSpan}>
            <Form.Item name={["shipment_details", "weight"]} label="Weight">
              <InputNumber
                style={{ width: "100%" }}
                min={0}
                controls={false}
                addonAfter="g"
              />
            </Form.Item>
          </Col>
          <Col {...responsiveColSpan}>
            <Form.Item
              name={["shipment_details", "category_id"]}
              label="Category"
            >
              <PaginatedSelect
                fetchUrl="/v1/admin/categories"
                placeholder="Select Category"
                queryKey="categories"
                valueField="id"
                labelField="name"
                dataPoint={"categories"}
              />
            </Form.Item>
          </Col>
          {/* Sub Category */}
          <Col {...responsiveColSpan}>
            <Form.Item
              name={["shipment_details", "sub_category_id"]}
              label="Sub Category"
            >
              <PaginatedSelect
                disabled={!category_id}
                fetchUrl="/v1/admin/sub-categories"
                placeholder="Select Sub Category"
                queryKey="sub-categories"
                valueField="id"
                labelField="name"
                dataPoint={"sub_categories"}
                defaultParams={{
                  category_id: category_id,
                }}
              />
            </Form.Item>
          </Col>
          {/* Items */}
          <Col {...responsiveColSpan}>
            <Form.Item name={["shipment_details", "item_ids"]} label="Item">
              <PaginatedSelect
                disabled={!category_id}
                fetchUrl="/v1/admin/items"
                placeholder="Select Item"
                queryKey="items"
                valueField="id"
                labelField="name"
                dataPoint={"items"}
                defaultParams={{
                  ...(sub_category_id
                    ? { sub_category_id: sub_category_id }
                    : { category_id: category_id }),
                }}
              />
            </Form.Item>
          </Col>
        </Row>
      </ResponsiveCard>

      {/* <ResponsiveCard title="Items">
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
                    <Col xs={24} sm={12} md={8} lg={6}>
                      <Form.Item
                        {...restField}
                        name={[name, "category_id"]}
                        label="Category"
                        rules={[{ required: true }]}
                      >
                        <PaginatedSelect
                          fetchUrl="/v1/admin/categories"
                          placeholder="Select Category"
                          queryKey="categories"
                          valueField="id"
                          labelField="name"
                          dataPoint={"categories"}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6}>
                      <SubCategorySelect name={name} restField={restField} />
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6}>
                      <ItemSelect name={name} restField={restField} />
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
      </ResponsiveCard> */}
    </div>
  );
};

export default ShipmentStep;
