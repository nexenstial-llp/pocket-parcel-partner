// UpdateProfileModalAntd.jsx
/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import {
  useCurrentUserProfile,
  useUpdateUserProfile,
} from "@/features/users/users.query";
import { updateUserSchema } from "@/features/users/users.schema";
import { useQueryClient } from "@tanstack/react-query";
import { fetchLocationFromPincode } from "@/features/orders/orders.service";
// import { updateUserSchema } from "./schemas"; // adjust your schema path

function UpdateProfileModal({ visible, onClose }) {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const { data, isLoading, isError, error } = useCurrentUserProfile();
  const { mutate: updateUser, isPending: isUpdateUserPending } =
    useUpdateUserProfile({
      onSuccess: () => {
        message.success("Profile updated successfully");
        queryClient.invalidateQueries({ queryKey: ["user"] });
        onClose?.();
      },
    });

  const handlePincodeFill = async (pincode, form) => {
    if (!pincode || pincode.length !== 6) return;

    const location = await fetchLocationFromPincode(pincode);
    if (!location) return;
    form.setFieldsValue({
      city: location.district,
      state: location.state,
    });
  };
  useEffect(() => {
    form.setFieldsValue({
      full_name: data?.full_name ?? "",
      country_code: data?.country_code ?? "", // ✔ numeric only
      phone_number: data?.phone_number ?? "",
      address: data?.address ?? "",
      city: data?.city ?? "",
      state: data?.state ?? "",
      pincode: data?.pincode ?? "",
    });
  }, [data, form]);

  const applyZodErrorsToForm = (zodError) => {
    if (!zodError?.formErrors?.fieldErrors) return;
    const fields = Object.entries(zodError.formErrors.fieldErrors).map(
      ([name, errors]) => ({ name, errors })
    );
    form.setFields(fields);
  };

  const handleFinish = async (values) => {
    try {
      const parsed = updateUserSchema.parse(values);
      updateUser(parsed);
    } catch (err) {
      if (err.name === "ZodError") {
        applyZodErrorsToForm(err);
        message.error("Fix the errors and try again.");
      } else {
        message.error(err?.message || "Update failed");
      }
    }
  };

  // Prevent non-numeric input for country code
  const onlyNumbers = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    form.setFieldValue("country_code", value);
  };

  if (isError) {
    message.error(error?.message);
  }

  return (
    <Modal
      title="Edit Profile"
      open={visible}
      onCancel={onClose}
      footer={null}
      centered
      width={700}
      loading={isLoading}
    >
      <Form
        disabled={isUpdateUserPending}
        layout="vertical"
        form={form}
        onFinish={handleFinish}
      >
        <div className="grid grid-cols-3 gap-4">
          <Form.Item
            label="Full Name"
            name="full_name"
            rules={[
              { min: 2, message: "Minimum 2 characters" },
              { max: 100, message: "Maximum 100 characters" },
            ]}
          >
            <Input placeholder="John Doe" />
          </Form.Item>

          <Form.Item
            label="Country Code"
            name="country_code"
            rules={[{ required: false }]}
          >
            <Input placeholder="91" onChange={onlyNumbers} maxLength={5} />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phone_number"
            rules={[
              { min: 6, message: "Minimum 6 digits" },
              { max: 15, message: "Maximum 15 digits" },
            ]}
          >
            <Input placeholder="Please enter phone number" />
          </Form.Item>
        </div>

        {/* Address */}
        <Form.Item label="Address" name="address">
          <Input.TextArea rows={2} placeholder="Street / Area" />
        </Form.Item>

        {/* City + State + Pincode */}
        <div className="grid grid-cols-3 gap-4">
          <Form.Item label="Pincode" name="pincode">
            <Input
              placeholder="Pincode"
              maxLength={6}
              onBlur={(e) => handlePincodeFill(e.target.value, form)}
            />
          </Form.Item>
          <Form.Item label="City" name="city">
            <Input readOnly placeholder="City" />
          </Form.Item>

          <Form.Item label="State" name="state">
            <Input readOnly placeholder="State" />
          </Form.Item>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-3">
          <Button onClick={onClose} disabled={isUpdateUserPending}>
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={isUpdateUserPending}
          >
            Save Changes
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

export default React.memo(UpdateProfileModal);
