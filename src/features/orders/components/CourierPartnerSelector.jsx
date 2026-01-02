/* eslint-disable react/prop-types */
import { Card, Radio } from "antd";
import AWSImage from "@/components/ui/AWSImage";
import { List } from "react-window";

export default function CourierPartnerSelector({ data, value, onChange }) {
  const preferenceArray = data || [];

  // Row Renderer for react-window
  const Row = ({ index, style }) => {
    const item = preferenceArray[index];
    const { courier_details, price_summary } = item;
    const isSelected = value === courier_details?.account_code;

    return (
      <div style={{ ...style, paddingBottom: "10px" }}>
        <Card
          size="small"
          className={`cursor-pointer border border-gray-200 hover:shadow-md transition h-full ${
            isSelected ? "border-blue-500! bg-blue-50/10" : ""
          }`}
          onClick={() => onChange(item)}
        >
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="size-12 shrink-0 flex items-center justify-center bg-gray-50 rounded p-0 sm:p-1">
              {courier_details?.logo ? (
                <AWSImage
                  s3Key={courier_details.logo}
                  className="w-full h-full object-contain"
                />
              ) : (
                <span className="text-xs text-center text-gray-400">
                  No Logo
                </span>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <div className="flex gap-2 flex-wrap items-center">
                  <p className="font-semibold text-xs  text-gray-800 sm:text-base truncate">
                    {courier_details?.courier_name}
                  </p>
                  <p className="text-xs text-gray-500">
                    ({courier_details?.account_code})
                  </p>
                </div>
                <Radio
                  checked={isSelected}
                  onChange={() => onChange(item)}
                  value={courier_details?.account_code}
                />
              </div>

              {price_summary?.final_total ? (
                <div className="mt-1 flex gap-2 items-baseline">
                  <p className="text-blue-600 font-bold text-sm">
                    ₹{price_summary.final_total}
                  </p>
                  {/* {courier_details?.shipping_charge && (
                    <span className="text-xs text-gray-400">
                      (Shipping: ₹{courier_details.shipping_charge})
                    </span>
                  )} */}
                </div>
              ) : (
                <p className="text-gray-400 text-xs">(No rate available)</p>
              )}
            </div>
          </div>
        </Card>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-2">Select Carrier Partner</h3>

      <div className="w-full rounded-lg">
        {preferenceArray?.length > 0 ? (
          <List
            rowComponent={Row}
            rowCount={preferenceArray?.length}
            rowHeight={100}
            rowProps={{
              style: {
                padding: "8px",
              },
            }}
          />
        ) : (
          <div className="text-center p-8 text-gray-500">
            No carrier partners available
          </div>
        )}
      </div>
    </div>
  );
}
