import InputTag from "@/components/InputTag/InputTag";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
// Components
import SelectTag from "@/components/SelectTag/SelectTag";
import { Button } from "antd";
// Type Options
const typeOptions = [
  { label: "Single", value: "single" },
  { label: "Multiple", value: "multiple" },
  { label: "Compound", value: "compound" },
];
const taxSchema = z.object({
  name: z.string().min(1, { message: "Name is Required" }),
  tax_code: z.string().min(1, { message: "Tax Code is Required" }),
  type: z.string().min(1, { message: "Type is Required" }),
  rate_name_1: z.string().min(1, { message: "Rate is Required" }),
  rate_value_1: z.string().min(1, { message: "Value is Required" }),
});
const TaxInputs = ({ handleOk, handleCancel }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(taxSchema),
    defaultValues: {
      name: "",
      tax_code: "",
      type: "single",
    },
  });
  const onSubmit = (data) => {
    console.log(data);
    handleOk();
  };
  //   const lengthOfArray = watch("type") === "single" ? 1 : 3;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4">
        <InputTag
          label={"Name"}
          id={"name"}
          name={"name"}
          placeholder="Enter tax name"
          control={control}
          useForm={true}
          error={errors.name?.message}
        />
        <InputTag
          label={"Tax Code"}
          id={"tax_code"}
          name={"tax_code"}
          placeholder="Enter tax code"
          control={control}
          useForm={true}
          error={errors.tax_code?.message}
        />
        <div className="col-span-2">
          <SelectTag
            label={"Type"}
            id="type"
            control={control}
            useForm={true}
            error={errors.type?.message}
            options={typeOptions}
          />
        </div>
        <div className="bg-gray-100 rounded-md border p-2 col-span-2">
          <p className="text-sm  ">
            Add rates to this class. You can add upto 3 rates that either add up
            or compound depending on the option selected above
          </p>
          {/* {Array.from({ length: lengthOfArray }).map((_, index) => (
            <div key={Date.now()} className="grid grid-cols-2">
              <InputTag
                label={`Rate Name ${index + 1}`}
                id={`rate_name_${index + 1}`}
                placeholder="Enter rate name"
                register={register(`rate_name_${index + 1}`)}
                error={errors.rate_name_index?.message}
              />
              <InputTag
                label={`Value in %`}
                id={`rate_name_${index + 1}`}
                placeholder="Enter rate name"
                register={register(`rate_name_${index + 1}`)}
                error={errors.rate_name_index?.message}
              />
            </div>
          ))} */}
          <div className="grid grid-cols-2 gap-2 mt-4">
            <InputTag
              label={`Rate Name 1`}
              id={`rate_name_1`}
              name={`rate_name_1`}
              placeholder="Enter rate name"
              control={control}
              useForm={true}
              error={errors.rate_name_1?.message}
            />
            <InputTag
              label={`Value in %`}
              id={`rate_value_1`}
              name={`rate_value_1`}
              placeholder="Enter value"
              control={control}
              useForm={true}
              error={errors.rate_value_1?.message}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-between gap-2 border-t border-gray-200 pt-3">
        <small className="text-gray-600 text-sm">
          Order item prices are inclusive of taxes by default
        </small>
        <div className="flex gap-2">
          <Button type="default" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
};

export default TaxInputs;
