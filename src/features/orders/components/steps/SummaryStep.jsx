/* eslint-disable react/prop-types */
import { Card } from "antd";
import ShipmentSummary from "../ShipmentSummary.jsx";

const money = (v) => `₹${Number(v).toFixed(2)}`;

export default function SummaryStep({ summaryData, shipmentData }) {
  if (!summaryData?.length) return null;

  const d = summaryData[0];
  const { courier_service, price_summary } = d;

  return (
    <div className="flex flex-col gap-3 w-full max-w-[620px] mx-auto">
      {/* SHIPMENT */}
      <ShipmentSummary data={shipmentData} />

      {/* PAYMENT */}
      <Card
        size="small"
        className="w-full shadow-sm"
        bodyStyle={{ padding: 14 }}
        title="Payment Summary"
      >
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
