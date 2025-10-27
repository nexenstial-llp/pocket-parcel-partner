import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, Form, Tooltip } from "antd";
import { useForm } from "react-hook-form";
import { internationalSchema } from "@/validations/tools/rateCalculator/internationalSchema";
import InputTag from "@/components/ui/formFields/InputTag";
import SelectTag from "@/components/ui/selectTag/SelectTag";
import { AiTwotoneQuestionCircle } from "react-icons/ai";
const destinationCountryOptions = [
  { label: "America", value: "America" },
  { label: "China", value: "China" },
  { label: "Japan", value: "Japan" },
  { label: "United Kingdom", value: "United Kingdom" },
  { label: "Turkey", value: "Turkey" },
];
const shipmentPurposeOptions = [
  { label: "Gift", value: "Gift" },
  { label: "Sample", value: "Sample" },
  { label: "Commercial", value: "Commercial" },
  { label: "Cargo", value: "Cargo" },
];
const ShipmentDetails = () => {
  const { handleSubmit, control, reset, watch } = useForm({
    resolver: zodResolver(internationalSchema),
    defaultValues: {
      pickup_pincode: "",
      destination_country: "",
      actual_weight: "",
      length: undefined,
      breadth: undefined,
      height: undefined,
      shipment_purpose: "Gift",
    },
  });
  let actualWeight = watch("actual_weight");
  const volumes =
    (Number(watch("length")) || 0) *
    (Number(watch("breadth")) || 0) *
    (Number(watch("height")) || 0);

  const isVolumetricWeightVisible = actualWeight || volumes;
  const volumetricWeight = volumes > 0 ? volumes / 5000 : 0;
  const applicableWeight =
    volumetricWeight > actualWeight ? volumetricWeight : actualWeight;
  const onSubmit = (data) => console.log(data);
  return (
    <Card className="w-full">
      <Form
        layout="vertical"
        onFinish={handleSubmit(onSubmit)}
        onReset={() => reset()}
      >
        <div className="grid grid-cols-2 gap-x-4">
          <InputTag
            type={"number"}
            id={"pickup_pincode"}
            name={"pickup_pincode"}
            label={"Pick Up Pincode"}
            placeholder="Enter 6 digit pickup area pincode"
            control={control}
            useForm={true}
            required={true}
            min={0}
          />
          <SelectTag
            id={"destination_country"}
            name={"destination_country"}
            label={"Destination Country"}
            placeholder="For Example: United States"
            control={control}
            useForm={true}
            required={true}
            options={destinationCountryOptions}
          />
          <InputTag
            id={"actual_weight"}
            type={"number"}
            name={"actual_weight"}
            label={"Actual Weight"}
            placeholder="Enter Actual Weight"
            control={control}
            useForm={true}
            extra={"Note: Minimum chargeable weight is 0.5kg"}
            addonAfter={<span className="text-gray-500">kg</span>}
          />
          <div className="">
            <label className="">
              Dimensions
              <span className="text-gray-500 font-normal">(optional)</span>
            </label>
            <div className="flex gap-2 mt-2">
              <InputTag
                id={"length"}
                type={"number"}
                name={"length"}
                placeholder="L"
                control={control}
                useForm={true}
                addonAfter={<span className="text-gray-500">cm</span>}
                min={0}
              />
              <InputTag
                id={"breadth"}
                type={"number"}
                name={"breadth"}
                placeholder="B"
                control={control}
                useForm={true}
                addonAfter={<span className="text-gray-500">cm</span>}
                min={0}
              />
              <InputTag
                id={"height"}
                type={"number"}
                name={"height"}
                placeholder="H"
                control={control}
                useForm={true}
                addonAfter={<span className="text-gray-500">cm</span>}
                min={0}
              />
            </div>
            {isVolumetricWeightVisible ? (
              <div className="flex gap-2">
                <div className="flex py-2 px-4 rounded-md gap-2 bg-sky-50 items-center">
                  <span> Volumetric Weight : </span>
                  <span>{volumetricWeight} KG</span>
                  <Tooltip title="It is the overall size of the shipment and it is calculated by multiplying the shipment's length, breadth, and height by 5000 or 4000">
                    <AiTwotoneQuestionCircle size={16} />
                  </Tooltip>
                </div>
                <div className="flex py-2 px-4 rounded-md gap-2 bg-emerald-50">
                  <span> Applicable Weight : </span>
                  <span> {applicableWeight} KG</span>
                  <Tooltip title="Between the dead weight and volumetric weight, the number that is highest becomes the shipment's applicable weight.">
                    <AiTwotoneQuestionCircle size={16} />
                  </Tooltip>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <SelectTag
            id={"shipment_purpose"}
            name={"shipment_purpose"}
            label={"Shipment Purpose"}
            placeholder="For Example: Gift"
            control={control}
            useForm={true}
            required={true}
            options={shipmentPurposeOptions}
          />
        </div>
        <Form.Item>
          <div className="flex justify-end gap-4 mt-4">
            <Button htmlType="submit" type="primary" size="large">
              Calculate
            </Button>
            <Button htmlType="reset" size="large">
              Reset
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ShipmentDetails;
