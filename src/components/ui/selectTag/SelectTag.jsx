/* eslint-disable react/prop-types */

import { Select, Form } from "antd";
import { Controller } from "react-hook-form";

const { Option } = Select;

const SelectTag = ({
  label,
  subLabel,
  size = "large",
  name,
  rules,
  control,
  placeholder,
  options,
  className,
  error,
  useForm = false,
  required,
  extra,
  ...rest
}) => {
  return (
    <div>
      {useForm ? (
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field, fieldState }) => (
            <Form.Item
              label={label}
              required={required}
              validateStatus={fieldState?.error ? "error" : ""}
              help={fieldState?.error?.message}
              extra={extra}
            >
              {subLabel && (
                <span className="text-gray-500 text-sm">{subLabel}</span>
              )}
              <Select
                size={size}
                {...field}
                placeholder={placeholder || `Select ${label}`}
                className={className}
                {...rest}
              >
                {options?.map((item) => (
                  <Option key={item?.value} value={item?.value}>
                    {item?.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          )}
        />
      ) : (
        <Form.Item
          label={label}
          required={required}
          rules={rules}
          validateStatus={error && "error"}
          help={error}
          extra={extra}
        >
          {subLabel && (
            <span className="text-gray-500 text-sm">{subLabel}</span>
          )}
          <Select
            size="large"
            placeholder={placeholder || `Select ${label}`}
            className={className}
            {...rest}
          >
            {options?.map((item) => (
              <Option key={item?.value} value={item?.value}>
                {item?.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
      )}
    </div>
  );
};

export default SelectTag;
