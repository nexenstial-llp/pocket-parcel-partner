/* eslint-disable react/prop-types */
import { Form, Input, InputNumber, Select, Switch, DatePicker } from "antd";

const { Option } = Select;

/**
 * A highly reusable and dynamic component for rendering various Ant Design form fields.
 * @param {object} props - Component props.
 * @param {string} props.name - The name of the field for Form.Item.
 * @param {string} props.label - The label displayed next to the field.
 * @param {string} props.componentType - Specifies the Ant Design component to render (e.g., 'input', 'number', 'select', 'switch', 'date').
 * @param {string} [props.placeholder] - Placeholder text.
 * @param {boolean} [props.required=true] - Whether the field is required.
 * @param {Array<object>} [props.rules=[]] - Additional Ant Design validation rules.
 * @param {string} [props.type='text'] - HTML type for the Input component (e.g., 'email', 'tel').
 * @param {string} [props.prefix] - Prefix for InputNumber (e.g., '₹', '%').
 * @param {number} [props.min=0] - Minimum value for InputNumber.
 * @param {Array<object>} [props.options=[]] - Array of { value, label } for Select component.
 * @param {string} [props.valuePropName='value'] - Prop name for the value (e.g., 'checked' for Switch).
 */
const DynamicFormField = ({
  name,
  label,
  componentType,
  placeholder,
  required = false,
  rules = [],
  type = "text",
  prefix,
  min = 0,
  options = [],
  valuePropName = "value",
  fieldProps = {},
  formProps = {},
}) => {
  // Base Ant Design and Tailwind styling for all form fields
  const baseClassName =
    "w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200/50";

  // Define default required rule
  const defaultRules = [
    {
      required: required,
      message: `Please input the ${label?.toLowerCase()}!`,
    },
    ...rules,
  ];

  let inputComponent;

  switch (componentType) {
    case "number":
      inputComponent = (
        <InputNumber
          {...fieldProps}
          min={min}
          placeholder={placeholder}
          prefix={prefix}
          className={baseClassName}
          style={{ width: "100%" }}
        />
      );
      break;
    case "select":
      inputComponent = (
        <Select
          {...fieldProps}
          placeholder={placeholder}
          className={baseClassName.split(" ").join(" ")}
        >
          {/* Select needs different styling treatment */}
          {options.map((opt) => (
            <Option key={opt.value} value={opt.value}>
              {opt.label}
            </Option>
          ))}
        </Select>
      );
      break;
    case "date":
      inputComponent = (
        <DatePicker
          {...fieldProps}
          className={baseClassName}
          placeholder={placeholder || "Select Date"}
        />
      );
      break;
    case "switch":
      inputComponent = (
        <Switch
          {...fieldProps}
          checkedChildren="Yes"
          unCheckedChildren="No"
          className="bg-gray-400 checked:bg-green-500"
        />
      );
      // Switches often don't need a required message based on their boolean nature
      return (
        <Form.Item
          style={{ marginBottom: 0 }}
          name={name}
          label={<span className="font-semibold">{label}</span>}
          valuePropName={valuePropName}
        >
          {inputComponent}
        </Form.Item>
      );
    case "input":
    default:
      inputComponent = (
        <Input
          {...fieldProps}
          placeholder={placeholder}
          type={type}
          className={baseClassName}
        />
      );
      break;
  }

  // Common wrapper for all non-switch components
  return (
    <Form.Item
      style={{ marginBottom: 12 }}
      name={name}
      label={label}
      rules={defaultRules}
      {...formProps}
    >
      {inputComponent}
    </Form.Item>
  );
};

export default DynamicFormField;
