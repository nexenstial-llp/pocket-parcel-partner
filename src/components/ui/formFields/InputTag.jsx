import { Input, Form } from "antd";
import React from "react";
import { Controller } from "react-hook-form";

const InputTag = ({
  label,
  subLabel,
  name,
  size = "large",
  placeholder,
  control,
  id,
  type,
  className,
  error,
  useForm = false,
  required,
  extra,
  ...rest
}) => {
  return (
    <div className="">
      {useForm ? (
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState }) => (
            <Form.Item
              layout="vertical"
              label={label}
              required={required}
              validateStatus={fieldState?.error && "error"}
              help={fieldState.error && fieldState.error.message}
              extra={extra}
            >
              {subLabel && (
                <span className="text-gray-500 text-sm">{subLabel}</span>
              )}
              <Input
                id={id || name}
                type={type}
                size={size}
                {...field}
                placeholder={placeholder}
                className={className}
                {...rest}
              />
            </Form.Item>
          )}
        />
      ) : (
        <Form.Item
          layout="vertical"
          label={label}
          required={required}
          validateStatus={error && "error"}
          extra={extra}
        >
          {subLabel && (
            <span className="text-gray-500 text-sm">{subLabel}</span>
          )}
          <Input
            id={id || name}
            size="large"
            type={type}
            placeholder={placeholder}
            className={className}
            {...rest}
          />
        </Form.Item>
      )}
    </div>
  );
};

export default InputTag;
