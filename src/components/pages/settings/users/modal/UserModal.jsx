import React, { useState } from "react";
import { Button, Modal } from "antd";
import InputTag from "@/components/ui/formFields/InputTag";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import SelectTag from "@/components/ui/selectTag/SelectTag";
const userRoleOptions = [
  { label: "Owner", value: "owner" },
  { label: "Admin", value: "admin" },
  { label: "Operations-User", value: "operations_user" },
  { label: "Support-User", value: "support_user" },
  { label: "Read access Only-User", value: "read_access_only_user" },
];
const userSchema = z.object({
  full_name: z.string().min(1, { message: "Full name is required" }),
  status: z.string({ required_error: "Status is required" }),
  mobile_number: z
    .string({ required_error: "Mobile number is required" })
    .regex(/^\d+$/, { message: "Mobile Number should contain only digits" })
    .min(10, { message: "Mobile number should contain 10 numbers" }),
  email_id: z
    .string({ required_error: "Email Id is required" })
    .email({ message: "Email is not valid" }),
  user_role: z.string({ required_error: "User role is required" }),
});
const UserModal = ({ data, setData }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      full_name: "",
      status: "active",
      mobile_number: "",
      email_id: "",
      user_role: "admin",
    },
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onSubmit = (data) => {
    console.log(data);
    setData((prev) => [...prev, { ...data, created_on: Date.now() }]);
    handleOk();
  };
  return (
    <>
      <Button type="default" onClick={showModal}>
        + Add & Invite Users
      </Button>
      <Modal
        title={
          <div className="pb-3 border-b border-gray-300">
            <h2 className="text-2xl">Add New Tax</h2>
          </div>
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
        centered
        width={"40%"}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4">
            <InputTag
              label="Full Name"
              name="full_name"
              id="full_name"
              control={control}
              useForm={true}
              placeholder="Enter your full name"
              error={errors.full_name?.message}
            />
            <div>
              <p className="font-medium">Status</p>
              <div className="flex mt-2.5 gap-2">
                <div className="flex  gap-1">
                  <input
                    type="radio"
                    id="active"
                    value={"active"}
                    {...register("status")}
                  />
                  <label htmlFor="active">Active</label>
                </div>
                <div className="flex gap-1">
                  <input
                    type="radio"
                    id="inActive"
                    value={"in_active"}
                    {...register("status")}
                  />
                  <label htmlFor="inActive">In Active</label>
                </div>
              </div>
            </div>
            <InputTag
              label="Mobile Number"
              name={"mobile_number"}
              id={"mobile_number"}
              control={control}
              useForm={true}
              placeholder="EnterMobile Number"
              error={errors.mobile_number?.message}
            />
            <InputTag
              label="Email id"
              id={"email_id"}
              name={"email_id"}
              placeholder="Enter Email id"
              control={control}
              useForm={true}
              error={errors.email_id?.message}
            />
            <SelectTag label={"User Role"} options={userRoleOptions} />
          </div>
          <div className="flex gap-2 justify-end mt-4">
            <Button type="default" onClick={handleCancel}>
              Cancel
            </Button>

            <Button htmlType="submit" type="primary">
              Submit
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};
export default UserModal;
