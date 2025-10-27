/* eslint-disable react/prop-types */
import InputTag from "@/components/ui/formFields/InputTag";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, Form, Radio, Tooltip } from "antd";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { AiTwotoneQuestionCircle } from "react-icons/ai";
import { domesticSchema } from "@/validations/tools/rateCalculator/domesticSchema";

const ShipmentDetails = ({
  setDeliveryPincode,
  setPickupPincode,
  setIsFormSubmitted,
}) => {
  const { handleSubmit, control, reset, watch } = useForm({
    resolver: zodResolver(domesticSchema),
    defaultValues: {
      shipment_type: "forward",
      pickup_pincode: "",
      delivery_pincode: "",
      actual_weight: "",
      length: undefined,
      breadth: undefined,
      height: undefined,
      payment_type: "",
      shipment_value: "",
      shipping_dangerous_goods: "",
      qc_applicable: "",
    },
  });
  const pickupPincode = watch("pickup_pincode");
  const deliveryPincode = watch("delivery_pincode");
  useEffect(() => {
    setPickupPincode(pickupPincode);
  }, [pickupPincode]);
  useEffect(() => {
    setDeliveryPincode(deliveryPincode);
  }, [deliveryPincode]);
  let actualWeight = watch("actual_weight");
  const volumes =
    (Number(watch("length")) || 0) *
    (Number(watch("breadth")) || 0) *
    (Number(watch("height")) || 0);

  const isVolumetricWeightVisible = actualWeight || volumes;
  const volumetricWeight = volumes > 0 ? volumes / 5000 : 0;
  const applicableWeight =
    volumetricWeight > actualWeight ? volumetricWeight : actualWeight;
  const onSubmit = (data) => {
    setIsFormSubmitted(true);
    console.log(data);
  };
  return (
    <Card>
      <Form
        layout="vertical"
        onFinish={handleSubmit(onSubmit)}
        onReset={() => reset()}
      >
        <div className="grid grid-cols-2 gap-x-4">
          <div className="col-span-2">
            <Controller
              name="shipment_type"
              control={control}
              render={({ field, fieldState }) => (
                <Form.Item
                  layout="vertical"
                  label="Shipment Type"
                  validateStatus={fieldState?.error && "error"}
                  help={fieldState.error && fieldState.error.message}
                >
                  <Radio.Group {...field}>
                    <Radio value="forward">Forward </Radio>
                    <Radio value="return">Return</Radio>
                  </Radio.Group>
                </Form.Item>
              )}
            />
          </div>
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
            maxLength={6}
          />
          <InputTag
            id={"delivery_pincode"}
            type={"number"}
            name={"delivery_pincode"}
            label={"Delivery Pincode"}
            placeholder="Enter 6 digit delivery area pincode"
            control={control}
            useForm={true}
            min={0}
            maxLength={6}
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
          <Controller
            name="payment_type"
            control={control}
            render={({ field, fieldState }) => (
              <Form.Item
                layout="vertical"
                label="Payment Type"
                validateStatus={fieldState?.error && "error"}
                help={fieldState.error && fieldState.error.message}
              >
                <Radio.Group {...field}>
                  <Radio value="cash_on_delivery">Cash On delivery </Radio>
                  <Radio value="prepaid">Prepaid</Radio>
                </Radio.Group>
              </Form.Item>
            )}
          />
          <InputTag
            id={"shipment_value"}
            type={"number"}
            name={"shipment_value"}
            label={"Shipment Value"}
            placeholder="Enter the shipment value"
            control={control}
            useForm={true}
            addonBefore={<span className="text-gray-500">₹</span>}
          />

          <Controller
            name="shipping_dangerous_goods"
            control={control}
            render={({ field }) => (
              <Form.Item
                layout="vertical"
                label="Shipping Dangerous Goods?"
                tooltip={{
                  title:
                    "Shipments containing flammable gas, flammable liquid, oil-based paints, batteries and other hazardous materials, are not permitted in Air mode.",
                  icon: <AiTwotoneQuestionCircle size={16} />,
                }}
              >
                <Radio.Group {...field}>
                  <Radio value="yes">Yes </Radio>
                  <Radio value="no">No</Radio>
                </Radio.Group>
              </Form.Item>
            )}
          />
          <Controller
            name="qc_applicable"
            control={control}
            render={({ field }) => (
              <Form.Item
                layout="vertical"
                label="QC Applicable?"
                tooltip={{
                  title:
                    "A QC (Quality Checked) shipment signifies that it has undergone thorough quality assurance checks before dispatch. This process ensures reliability and adherence to our service standards, providing a heightened level of delivery assurance.",
                  icon: <AiTwotoneQuestionCircle size={16} />,
                }}
              >
                <Radio.Group {...field}>
                  <Radio value="yes">Yes </Radio>
                  <Radio value="no">No</Radio>
                </Radio.Group>
              </Form.Item>
            )}
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
