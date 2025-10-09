import { Form, Button } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import DynamicFormField from "@/components/ui/DynamicFormField";

const ItemsInShipment = () => (
  <ResponsiveCard title="Item In Shipment" size="small">
    {/* The Form.List name MUST match the structure of the data: 'items' inside the shipment_details object */}
    <Form.List name={["shipment_details", "items_in_shipment"]}>
      {(fields, { add, remove }) => (
        <div className="flex flex-col gap-4">
          {fields.map(({ key, name, ...restField }) => (
            <ResponsiveCard
              size="small"
              title={
                <div className="flex justify-between items-center">
                  <h5 className="font-medium  text-gray-700">
                    Item #{name + 1}
                  </h5>
                  <Button
                    size="small"
                    danger
                    onClick={() => remove(name)}
                    icon={<MinusCircleOutlined />}
                  />
                </div>
              }
              key={key}
              className="border border-gray-300 p-4 mb-4 rounded-md bg-white shadow-md"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4">
                <DynamicFormField
                  formProps={{ ...restField }}
                  name={[name, "quantity"]}
                  label="Quantity"
                  componentType="number"
                  placeholder="Enter Quantity"
                  required={true}
                />
                <DynamicFormField
                  formProps={{ ...restField }}
                  name={[name, "price"]}
                  label="Price"
                  componentType="number"
                  placeholder="Enter Price"
                  required={true}
                />
                <DynamicFormField
                  formProps={{ ...restField }}
                  name={[name, "sku"]}
                  label="SKU"
                  placeholder="Enter SKU"
                  required={true}
                />
                <DynamicFormField
                  formProps={{ ...restField }}
                  name={[name, "product_url"]}
                  label="Product URL"
                  placeholder="Enter Length"
                />
                <DynamicFormField
                  formProps={{ ...restField }}
                  name={[name, "weight"]}
                  label="Weight (gms)"
                  componentType="number"
                  placeholder="Enter Weight"
                  required={true}
                />
                <DynamicFormField
                  formProps={{ ...restField }}
                  name={[name, "manufactured_country"]}
                  label="Manufactured Country"
                  placeholder="Enter Manufactured Country"
                  required={true}
                />
                <DynamicFormField
                  formProps={{ ...restField }}
                  name={[name, "manufactured_country_code"]}
                  label="Manufactured Country Code"
                  placeholder="Enter Manufactured Country Code"
                  required={true}
                />
                <DynamicFormField
                  formProps={{ ...restField }}
                  name={[name, "description"]}
                  label="Description"
                  placeholder="Enter Description"
                  required={true}
                />
              </div>
            </ResponsiveCard>
          ))}

          <Form.Item wrapperCol={{ span: 4 }} className="mt-4">
            <Button
              className="w-fit"
              type="primary"
              onClick={() => add()}
              block
              icon={<PlusOutlined />}
            >
              Add Item
            </Button>
          </Form.Item>
        </div>
      )}
    </Form.List>
  </ResponsiveCard>
);

export default ItemsInShipment;
