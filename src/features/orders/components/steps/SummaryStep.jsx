/* eslint-disable react/prop-types */
import {
  Button,
  Card,
  Tag,
  Space,
  Typography,
  Tooltip,
  Badge,
  Row,
  Col,
  Divider,
} from "antd";
import {
  CheckCircleFilled,
  InfoCircleOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";
import ShipmentSummary from "../ShipmentSummary.jsx";
import { useState, useEffect } from "react";
import { useCalculatePriceOfOrder } from "../../orders.query.js";
import { calculatePriceOfOrderSchema } from "../../orders.schema.js";
import { message } from "antd";
import { applyZodErrorsToForm } from "@/utils/formError.util.js";
import { BiSolidOffer } from "react-icons/bi";
import { MdOutlineRemoveCircle } from "react-icons/md";
import { useGetAllOffers } from "@/features/offers/offers.query.js";
import { formatINR } from "@/utils/typography.util.js";

const { Text } = Typography;

export default function SummaryStep({
  summaryData,
  shipmentData,
  chargeableWeight,
  chargeableDimensions,
  carrierPartnerData,
  onOfferApplied,
  pickup_type,
  form,
  dimensionUnit,
  weightUnit,
  offerCode,
  setOfferCode,
}) {
  const [offerOptions, setOfferOptions] = useState([]);
  const { data, isLoading } = useGetAllOffers({ is_active: "true" });

  useEffect(() => {
    if (data) {
      setOfferOptions(data?.data?.offers || []);
    }
  }, [data]);

  const {
    mutateAsync: calculatePriceOfOrder,
    isPending: isCalculatePricingPending,
  } = useCalculatePriceOfOrder({
    onSuccess: (data) => {
      if (onOfferApplied) {
        onOfferApplied(data, offerCode);
      }
    },
    onError: (error) => {
      console.error("Calculate Price Error:", error);
    },
  });

  const recalcWithOffer = async (code) => {
    try {
      const payload = {
        from_latitude: Number(shipmentData?.pickup_info?.pickup_lat),
        from_longitude: Number(shipmentData?.pickup_info?.pickup_long),
        to_pincode: shipmentData?.drop_info?.drop_pincode,
        length: Number(chargeableDimensions?.length_cm),
        breadth: Number(chargeableDimensions?.breadth_cm),
        height: Number(chargeableDimensions?.height_cm),
        weight: Number(chargeableWeight),
        cp_id: carrierPartnerData?.carrier_partner,
        account_code: carrierPartnerData?.account_code,
        offer_code: code,
        skip_first_mile_pickup: pickup_type === "warehouse" ? true : false,
      };
      const validData = calculatePriceOfOrderSchema.parse(payload);
      const revisedData = await calculatePriceOfOrder(validData);

      if (revisedData[0]?.offer_error) {
        message.error(revisedData[0]?.offer_error);
        return;
      }
      return true;
    } catch (error) {
      if (error.name === "ZodError") {
        applyZodErrorsToForm(form, error);
      } else {
        message.error(error.message || "Failed to calculate the price");
      }
    }
  };

  const handleApplyOffer = async (code) => {
    const success = await recalcWithOffer(code);

    if (success) {
      setOfferCode(code); // ✅ apply only on success
    }
  };

  const handleRemoveOffer = async () => {
    const success = await recalcWithOffer("");

    if (success) {
      setOfferCode(null);
    }
  };

  const activeOffer = offerOptions.find((o) => o.offer_code === offerCode);

  if (!summaryData?.length) return null;
  const d = summaryData[0];
  const { courier_service, price_summary } = d;

  return (
    <div className="flex flex-col gap-4 w-full max-w-[640px] mx-auto">
      {/* SHIPMENT */}
      <ShipmentSummary
        data={shipmentData}
        dimensionUnit={dimensionUnit}
        weightUnit={weightUnit}
        chargeableWeight={chargeableWeight}
        chargeableDimensions={chargeableDimensions}
      />

      {/* OFFERS SECTION */}
      {offerOptions?.length > 0 && (
        <Card
          loading={isLoading}
          size="small"
          className="w-full shadow-sm border border-gray-100"
          title={
            <Space className="items-center">
              <BiSolidOffer className="text-orange-500 text-lg" />
              <span className="text-base font-semibold">Available Offers</span>
              <Badge count={offerOptions.length} className="ml-2!" />
            </Space>
          }
        >
          {offerOptions?.map((offer) => {
            const isActive = offerCode === offer?.offer_code;

            return (
              <div
                key={offer?.id}
                className={`
                  p-4 mb-3 last:mb-0 rounded-xl border transition-all hover:shadow-md
                  ${
                    isActive
                      ? "border-emerald-300 bg-emerald-50 shadow-md ring-1 ring-emerald-200"
                      : "border-gray-200 bg-white hover:border-blue-200 hover:bg-blue-50/30"
                  }
                `}
              >
                <Row gutter={[16, 8]} align="middle" wrap={false}>
                  {/* Left Column - Offer Details */}
                  <Col xs={24} lg={16}>
                    <Space direction="vertical" size="small" className="w-full">
                      {/* Title & Code */}
                      <Space align="start">
                        <div className="flex items-center gap-2 mb-1">
                          <div
                            className={`w-2.5 h-2.5 rounded-full ${
                              isActive ? "bg-emerald-500" : "bg-blue-500"
                            }`}
                          />
                          <Text strong className="text-base leading-tight">
                            {offer.display_name || offer.offer_name}
                          </Text>
                        </div>
                        <Tag
                          color={isActive ? "green" : "blue"}
                          className="px-2.5 py-1 text-xs font-mono"
                        >
                          {offer.offer_code}
                        </Tag>
                      </Space>

                      {/* Discount Badge */}
                      {/* <div className="flex gap-3 mb-2">
                        <div className="bg-linear-to-r from-emerald-100 to-emerald-200 px-3 py-1.5 rounded-full text-xs font-semibold text-emerald-800 shadow-sm">
                          {discountType}
                        </div>
                        <div className="text-xs text-gray-600 bg-gray-50 px-2.5 py-1 rounded-md">
                          Min: {minOrder} | {maxDiscount}
                        </div>
                      </div> */}
                      {/* T&Cs Tooltip */}
                      {offer.terms_and_conditions && (
                        <Tooltip
                          title={offer.terms_and_conditions}
                          placement="top"
                          className="mb-2"
                        >
                          <div className="flex items-center gap-1 text-xs text-gray-500 cursor-help mx-auto mb-3">
                            <InfoCircleOutlined className="w-3.5 h-3.5" />
                            <span>T&Cs</span>
                          </div>
                        </Tooltip>
                      )}
                    </Space>
                  </Col>

                  {/* Right Column - Stats & Action */}
                  <Col xs={24} lg={8}>
                    <Space
                      direction="vertical"
                      size="small"
                      className="w-full h-full justify-end"
                    >
                      {/* Usage Progress */}
                      {/* <div className="mb-3">
                        <div className="flex items-center justify-between mb-1">
                          <Text className="text-xs text-gray-500">
                            Uses Left
                          </Text>
                          <Text className="text-xs font-mono">
                            {usageLeft}/{offer.usage_limit_per_user}
                          </Text>
                        </div>
                      </div> */}

                      {/* Action Button */}
                      <Button
                        block
                        type={isActive ? "default" : "primary"}
                        onClick={() =>
                          isActive
                            ? handleRemoveOffer()
                            : handleApplyOffer(offer.offer_code)
                        }
                        loading={isCalculatePricingPending}
                        className="rounded-lg font-semibold h-11 shadow-sm"
                        icon={
                          isActive ? (
                            <MdOutlineRemoveCircle className="text-red-500" />
                          ) : (
                            <BiSolidOffer />
                          )
                        }
                      >
                        {isActive ? "Remove Offer" : "Apply Offer"}
                      </Button>
                    </Space>
                  </Col>
                </Row>
              </div>
            );
          })}
        </Card>
      )}

      {/* PAYMENT SUMMARY */}
      <Card
        loading={isCalculatePricingPending}
        size="small"
        className="w-full shadow-sm border-t-4 border-emerald-500"
        title={
          <Space>
            <CreditCardOutlined className="text-emerald-600" />
            <span className="font-semibold">Payment Summary</span>
          </Space>
        }
      >
        {/* Active Offer Summary */}
        {activeOffer && (
          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg shadow-sm">
            <Row align="middle" gutter={[12, 0]}>
              <Col>
                <CheckCircleFilled className="text-emerald-500 text-lg" />
              </Col>
              <Col flex="auto">
                <Text strong className="text-base block">
                  {activeOffer.display_name}
                </Text>
                <Text className="text-sm text-gray-600">
                  {activeOffer.offer_code}
                </Text>
              </Col>
              <Col>
                <Button
                  size="small"
                  danger
                  onClick={handleRemoveOffer}
                  ghost
                  icon={<MdOutlineRemoveCircle />}
                  className="rounded-md"
                >
                  Remove
                </Button>
              </Col>
            </Row>
          </div>
        )}

        {/* Carrier Info */}
        <div className="mb-4 pb-3 border-b border-gray-200">
          <Row align="middle" gutter={[16, 8]}>
            <Col flex="auto">
              <Text className="text-sm font-medium text-gray-700">
                Carrier Partner
              </Text>
            </Col>
            <Col>
              <Space direction="vertical" size={0} className="text-right">
                <Text strong className="text-base">
                  {courier_service?.cp_name}
                </Text>
                <Tag className="text-xs px-2 py-0.5 mt-1">
                  {courier_service?.account_code}
                </Tag>
              </Space>
            </Col>
          </Row>
        </div>

        {/* Price Breakdown */}
        <div className="space-y-3">
          <Row justify="space-between">
            <Text className="text-gray-600">Subtotal</Text>
            <Text strong>{formatINR(price_summary?.original_total)}</Text>
          </Row>

          {price_summary?.discount > 0 && (
            <Row justify="space-between">
              <Text className="text-emerald-600! font-medium flex items-center gap-1">
                <CheckCircleFilled className="w-3.5 h-3.5" />
                Offer Discount
              </Text>
              <Text className="text-emerald-600! font-bold text-lg">
                −{formatINR(price_summary?.discount)}
              </Text>
            </Row>
          )}

          <Divider size="small" className="border-gray-200" />

          <Row justify="space-between" align="middle">
            <Text strong className="text-xl font-semibold text-gray-900">
              Payable Amount
            </Text>
            <Text strong className="text-xl! font-bold text-emerald-600!">
              {formatINR(price_summary?.final_total)}
            </Text>
          </Row>
        </div>
      </Card>
    </div>
  );
}
