/* eslint-disable react/prop-types */
import { Button, Card, Tag } from "antd";
import ShipmentSummary from "../ShipmentSummary.jsx";
import { useState, useEffect } from "react";
import { useCalculatePriceOfOrder } from "../../orders.query.js";
import axiosInstance from "@/utils/axiosInstance.util.js";
import { calculatePriceOfOrderSchema } from "../../orders.schema.js";
import { message } from "antd";
import { applyZodErrorsToForm } from "@/utils/formError.util.js";
import { BiSolidOffer } from "react-icons/bi";
import { MdOutlineRemoveCircle } from "react-icons/md";

const money = (v) => `₹${Number(v).toFixed(2)}`;

export default function SummaryStep({
  summaryData,
  shipmentData,
  chargeableWeight,
  carrierPartnerData,
  onOfferApplied,
  pickup_type,
  form,
}) {
  const [offerOptions, setOfferOptions] = useState([]);
  const [offerCode, setOfferCode] = useState(null);

  const getOffers = async () => {
    const response = await axiosInstance.get(`v1/transit-warehouse/offers`);
    setOfferOptions(response?.data?.data?.offers || []);
  };

  useEffect(() => {
    getOffers();
  }, []);

  const {
    mutate: calculatePriceOfOrder,
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

  const recalcWithOffer = (code) => {
    try {
      const payload = {
        from_latitude: Number(shipmentData?.pickup_info?.pickup_lat),
        from_longitude: Number(shipmentData?.pickup_info?.pickup_long),
        to_pincode: shipmentData?.drop_info?.drop_pincode,
        length: Number(shipmentData?.shipment_details?.length),
        breadth: Number(shipmentData?.shipment_details?.breadth),
        height: Number(shipmentData?.shipment_details?.height),
        weight: Number(chargeableWeight),
        cp_id: carrierPartnerData?.carrier_partner,
        account_code: carrierPartnerData?.account_code,
        offer_code: code,
        skip_first_mile_pickup: pickup_type === "warehouse" ? true : false,
      };
      const validData = calculatePriceOfOrderSchema.parse(payload);
      calculatePriceOfOrder(validData);
    } catch (error) {
      console.log(error);
      if (error.name === "ZodError") {
        applyZodErrorsToForm(form, error);
      } else {
        message.error(error.message || "Failed to calculate the price");
      }
    }
  };

  const handleApplyOffer = (code) => {
    setOfferCode(code);
    recalcWithOffer(code);
  };

  const handleRemoveOffer = () => {
    setOfferCode(null);
    recalcWithOffer("");
  };

  if (!summaryData?.length) return null;
  const d = summaryData[0];
  const { courier_service, price_summary } = d;

  return (
    <div className="flex flex-col gap-3 w-full max-w-[640px] mx-auto">
      {/* SHIPMENT */}
      <ShipmentSummary data={shipmentData} />

      {/* OFFERS - COMPACT PILL STYLE */}
      {offerOptions?.length > 0 && (
        <Card
          size="small"
          className="w-full shadow-sm"
          title={
            <span className="flex items-center gap-2 text-sm">
              <BiSolidOffer className="text-orange-500" />
              Available Offers
            </span>
          }
        >
          {offerOptions?.length === 0 ? (
            <div className="text-xs text-gray-400 text-center py-3">
              No offers available for this shipment.
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {offerOptions.map((offer) => {
                const isActive = offerCode === offer.offer_code;

                return (
                  <div
                    key={offer.id}
                    className={`flex items-center justify-between px-3 py-2 rounded-md border text-xs transition-all
              ${
                isActive
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200 bg-gray-50 hover:border-blue-300 hover:bg-blue-50"
              }`}
                  >
                    {/* Left: Offer info */}
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-800">
                          {offer.offer_name}
                        </span>
                        <Tag
                          color={isActive ? "green" : "blue"}
                          className="px-2 py-0 text-[10px] rounded-full"
                        >
                          CODE: {offer.offer_code}
                        </Tag>
                      </div>

                      {offer.description && (
                        <span className="text-[11px] text-gray-500">
                          {offer.description}
                        </span>
                      )}

                      {offer.max_discount_amount && (
                        <span className="text-[11px] text-gray-400">
                          Save up to {money(offer.max_discount_amount)}
                        </span>
                      )}
                    </div>

                    {/* Right: Action */}
                    <div className="flex items-center gap-2">
                      {isActive && (
                        <span className="text-[11px] text-green-600 font-medium hidden sm:inline">
                          Applied
                        </span>
                      )}

                      <Button
                        size="small"
                        type={isActive ? "default" : "primary"}
                        icon={
                          isActive ? (
                            <MdOutlineRemoveCircle className="text-red-500" />
                          ) : (
                            <BiSolidOffer />
                          )
                        }
                        onClick={() =>
                          isActive
                            ? handleRemoveOffer()
                            : handleApplyOffer(offer.offer_code)
                        }
                        disabled={isCalculatePricingPending}
                      >
                        {isActive ? "Remove" : "Apply"}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Card>
      )}

      {/* PAYMENT SUMMARY */}
      <Card
        loading={isCalculatePricingPending}
        size="small"
        className="w-full shadow-sm"
        title="Payment Summary"
      >
        {/* COURIER */}
        <div className="flex justify-between items-center mb-2 text-xs">
          <span className="text-gray-500">Carrier Partner</span>
          <div className="text-right">
            <div className="font-medium text-gray-800 text-sm">
              {courier_service?.cp_name}
            </div>
            <div className="text-[11px] text-gray-500">
              {courier_service?.account_code} • {courier_service?.service_type}
            </div>
          </div>
        </div>

        {/* PRICE */}
        <div className="bg-gray-50 rounded-md p-3 text-xs">
          <div className="flex justify-between mb-1">
            <span className="text-gray-600">Subtotal</span>
            <span>{money(price_summary?.original_total)}</span>
          </div>

          {/* <div className="flex justify-between mb-1">
            <span className="text-gray-600">Included Tax</span>
            <span>{money(price_summary?.tax_included)}</span>
          </div> */}

          {price_summary?.discount > 0 && (
            <div className="flex justify-between text-red-500 mb-1">
              <span>Discount</span>
              <span>−{money(price_summary?.discount)}</span>
            </div>
          )}

          <div className="border-t border-gray-200 my-2" />

          <div className="flex justify-between items-center">
            <span className="font-semibold text-sm">Payable Amount</span>
            <span className="text-lg font-bold text-green-700">
              {money(price_summary?.final_total)}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}
