/* eslint-disable react/prop-types */
import { Button, Card } from "antd";
import ShipmentSummary from "../ShipmentSummary.jsx";
import { useState } from "react";
import { useCalculatePriceOfOrder } from "../../orders.query.js";
import axiosInstance from "@/utils/axiosInstance.util.js";
import { useEffect } from "react";
import { calculatePriceOfOrderSchema } from "../../orders.schema.js";
import { message } from "antd";

const money = (v) => `₹${Number(v).toFixed(2)}`;

export default function SummaryStep({
  summaryData,
  shipmentData,
  chargeableWeight,
  carrierPartnerData,
  onOfferApplied,
  pickup_type,
}) {
  const [offerOptions, setOfferOptions] = useState([]);
  const [offerCode, setOfferCode] = useState(null);

  const getOffers = async () => {
    const response = await axiosInstance.get(`v1/transit-warehouse/offers`);
    console.log("offers", response?.data?.data?.offers);
    setOfferOptions(response?.data?.data?.offers);
  };

  useEffect(() => {
    getOffers();
  }, []);

  const { mutate: calculatePriceOfOrder } = useCalculatePriceOfOrder({
    onSuccess: (data) => {
      if (onOfferApplied) {
        onOfferApplied(data, offerCode);
      }
    },
    onError: (error) => {
      console.error("Calculate Price Error:", error);
    },
  });

  const handleApplyOffer = (code) => {
    setOfferCode(code);
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
        // ...(pickup_type === "WAREHOUSE" && {
        //   skip_first_mile_pickup: true,
        // }),
        skip_first_mile_pickup: pickup_type === "warehouse" ? true : false,
      };
      const validData = calculatePriceOfOrderSchema.parse(payload);
      calculatePriceOfOrder(validData);
    } catch (error) {
      console.log(error);
      message.error(error.message);
    }
  };

  const handleRemoveOffer = () => {
    setOfferCode(null);
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
        offer_code: "",
        account_code: carrierPartnerData?.account_code,
        skip_first_mile_pickup: pickup_type === "warehouse" ? true : false,
      };
      const validData = calculatePriceOfOrderSchema.parse(payload);
      calculatePriceOfOrder(validData);
    } catch (error) {
      console.log(error);
      message.error(error.message);
    }
  };

  if (!summaryData?.length) return null;
  const d = summaryData[0];
  const { courier_service, price_summary } = d;

  return (
    <div className="flex flex-col gap-3 w-full max-w-[620px] mx-auto">
      {/* SHIPMENT */}
      <ShipmentSummary data={shipmentData} />
      <Card size="small" className="w-full shadow-sm" title="Offers">
        {offerOptions?.length > 0 && (
          <div>
            {offerOptions?.map((offer) => (
              <div className="bg-blue-100 p-2 rounded-md mb-2" key={offer.id}>
                <div className="flex justify-between">
                  <div className="">
                    <div>{offer.offer_name}</div>
                    <div>{offer.offer_code}</div>
                  </div>

                  {offerCode === offer.offer_code ? (
                    <Button type="primary" onClick={() => handleRemoveOffer()}>
                      Remove
                    </Button>
                  ) : (
                    <Button
                      type="primary"
                      onClick={() => handleApplyOffer(offer.offer_code)}
                    >
                      Apply
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* PAYMENT */}
      <Card size="small" className="w-full shadow-sm" title="Payment Summary">
        {/* COURIER */}
        <div className="flex justify-between items-center mb-3 text-sm">
          <div className="text-gray-500">Carrier Partner</div>
          <div className="text-right">
            <div className="font-medium text-gray-800">
              {courier_service?.cp_name}
            </div>
            <div className="text-xs text-gray-500">
              {courier_service?.account_code}
            </div>
          </div>
        </div>

        {/* PRICE */}
        <div className="bg-gray-50 rounded-md p-3 text-sm">
          <div className="flex justify-between mb-1">
            <span className="text-gray-600">Subtotal</span>
            <span>{money(price_summary?.original_total)}</span>
          </div>

          <div className="flex justify-between mb-1">
            <span className="text-gray-600">Included Tax</span>
            <span>{money(price_summary?.tax_included)}</span>
          </div>

          {price_summary?.discount > 0 && (
            <div className="flex justify-between text-red-500 mb-1">
              <span>Discount</span>
              <span>−{money(price_summary?.discount)}</span>
            </div>
          )}

          <div className="border-t border-gray-200 my-2" />

          <div className="flex justify-between items-center">
            <span className="font-semibold text-base">Payable Amount</span>
            <span className="text-lg font-bold text-green-700">
              {money(price_summary?.final_total)}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}
