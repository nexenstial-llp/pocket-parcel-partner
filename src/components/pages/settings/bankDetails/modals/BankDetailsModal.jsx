import React, { useState } from "react";
import { Button, Modal } from "antd";
import { useForm } from "react-hook-form";
import { z } from "zod";
// COmponents

import InputTag from "../../../../ui/formFields/InputTag";
import { zodResolver } from "@hookform/resolvers/zod";
const bankDetailsSchema = z
  .object({
    bank_account_number: z
      .string()
      .regex(/^\d+$/, { message: "Bank account should contain only digits" })
      .min(12, { message: "Bank account should be at least 12 digits long" }),
    re_enter_bank_account_number: z
      .string()
      .regex(/^\d+$/, { message: "Bank account should contain only digits" })
      .min(12, { message: "Bank account should be at least 12 digits long" }),
    ifsc_code: z
      .string()
      .regex(/^[A-Za-z]{4}0[A-Za-z0-9]{6}$/, {
        message: "Enter a valid IFSC code",
      })
      .min(11, { message: "IFSC code should be 11 characters long" }),
    beneficiary_name: z
      .string()
      .min(1, { message: "Beneficiary name is required" }),
    bank_name: z.string().min(1, { message: "Bank name is required" }),
    email: z.string().optional(),
  })
  .refine(
    (data) => data.bank_account_number === data.re_enter_bank_account_number,
    {
      message: "Bank account numbers do not match",
      path: ["re_enter_bank_account_number"],
    }
  );

const BankDetailsModal = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bankDetailsSchema),
    defaultValues: {
      bank_account_number: "",
      re_enter_bank_account_number: "",
      ifsc_code: "",
      beneficiary_name: "",
      bank_name: "",
      email: "",
    },
  });
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const onSubmit = (data) => console.log("data", data);
  return (
    <>
      <Button className="mt-5" type="primary" onClick={showModal}>
        + Add
      </Button>
      <Modal
        centered
        open={open}
        title={
          <div>
            <h2 className="text-xl">Add Bank Account Details</h2>
            <p className="text-gray-700 font-normal text-sm">
              To facilitate COD remittances, we request to add your bank
              details.
            </p>
          </div>
        }
        onCancel={handleCancel}
        footer={[]}
      >
        <hr />
        <form id="bankDetailsForm" onSubmit={handleSubmit(onSubmit)}>
          <div
            style={{ scrollbarWidth: "thin" }}
            className="my-4 space-y-4 max-h-[600px] overflow-y-auto px-4"
          >
            <InputTag
              label={"Enter the account number"}
              type="text"
              id={"bank_account_number"}
              name={"bank_account_number"}
              placeholder="Bank Account Number"
              error={errors.bank_account_number?.message}
              control={control}
              useForm={true}
            />
            <InputTag
              label={"Re-enter Bank Account Number"}
              type="text"
              id={"re_enter_bank_account_number"}
              name={"re_enter_bank_account_number"}
              placeholder="Re-enter your bank account number"
              error={errors.re_enter_bank_account_number?.message}
              control={control}
              useForm={true}
            />
            <InputTag
              label={"IFSC Code"}
              type="text"
              id={"ifsc_code"}
              name={"ifsc_code"}
              placeholder=" IFSC Code"
              error={errors.ifsc_code?.message}
              control={control}
              useForm={true}
            />
            <div className="grid grid-cols-2 gap-4">
              <InputTag
                label={"Beneficiary Name"}
                type="text"
                id={"beneficiary_name"}
                name={"beneficiary_name"}
                placeholder="Enter Beneficiary name"
                error={errors.beneficiary_name?.message}
                control={control}
                useForm={true}
              />
              <InputTag
                label={"Bank Name"}
                type="text"
                id={"bank_name"}
                name={"bank_name"}
                placeholder="Enter Bank name"
                error={errors.bank_name?.message}
                control={control}
                useForm={true}
              />
            </div>
            <div className="bg-gray-100 px-2 py-4 rounded-md w-full">
              <small className="text-gray-700 text-xs ">
                ADDITIONAL DETAILS
              </small>
              <InputTag
                label={
                  "  Enter email ID(s) on which we should notify you when we remit COD payments"
                }
                type="email"
                id={"email"}
                name={"email"}
                placeholder="Enter Email Id"
                error={errors.email?.message}
                control={control}
                useForm={true}
              />
              <small className="text-gray-700 text-xs leading-3">
                We'll use these email IDs to update you on COD remittances from
                Delhivery to your bank account.
              </small>
            </div>
          </div>
          <div className="bg-gray-100 rounded-md flex items-center gap-2 p-3">
            <span className="text-xs">
              An OTP will be sent to the owner's registered email ID to confirm
              any updates made
            </span>
            <div className="flex">
              <Button type="default" className="mr-2" onClick={handleCancel}>
                Return
              </Button>
              <Button type="primary" htmlType="submit" form="bankDetailsForm">
                Submit
              </Button>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};
export default BankDetailsModal;
