/* eslint-disable react/prop-types */

import { Form, Input, InputNumber, Switch, DatePicker, Select } from "antd";

const COMPONENT_MAP = {
  input: Input,
  number: InputNumber,
  switch: Switch,
  datePicker: DatePicker,
  select: Select,
  textarea: Input.TextArea,
  password: Input.Password,
};

const DynamicFormField = ({
  name,
  label,
  componentType = "input",
  required = false,
  rules = [],
  valuePropName,
  format,
  min,
  options = [],
  fieldProps = {},
  formProps = {},
  ...restProps
}) => {
  const Component = COMPONENT_MAP[componentType] || Input;
  const style = { ...(componentType === "number" && { width: "100%" }) };
  // Automatically add required rule if needed
  const mergedRules = required
    ? [{ required: true, message: `${label} is required` }, ...rules]
    : rules;

  const componentProps = { ...restProps, ...fieldProps };

  if (componentType === "number" && min !== undefined) {
    componentProps.min = min;
    componentProps.style = { width: "100%" };
  }

  if (componentType === "datePicker" && format) {
    componentProps.format = format;
    componentProps.style = { width: "100%" };
  }

  if (componentType === "switch") {
    valuePropName = valuePropName || "checked";
  }

  // Add options prop automatically for select in AntD v5.2
  if (componentType === "select") {
    componentProps.options = options;
  }

  return (
    <Form.Item
      name={name}
      label={label}
      rules={mergedRules}
      valuePropName={valuePropName}
      {...formProps}
    >
      <Component {...componentProps} style={style} />
    </Form.Item>
  );
};

export default DynamicFormField;
