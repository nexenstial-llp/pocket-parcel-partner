/* eslint-disable react/prop-types */
import { Card, Radio } from "antd";
import AWSImage from "@/components/ui/AWSImage";
import { List } from "react-window";

export default function CourierPartnerSelector({ data, value, onChange }) {
  const preferenceArray =
    data?.recommendations?.result?.[0]?.preference_array || [];

  // Row Renderer for react-window
  const Row = ({ index, style }) => {
    const item = preferenceArray[index];
    const isSelected = value === item?.account_code;

    return (
      <div style={{ ...style, paddingBottom: "10px" }}>
        <Card
          size="small"
          className={`cursor-pointer border border-gray-200 hover:shadow-md transition h-full ${
            isSelected ? "border-blue-500! bg-blue-50/10" : ""
          }`}
          onClick={() => onChange(item?.account_code)}
        >
          <div className="flex items-center gap-4">
            <div className="size-12 shrink-0 flex items-center justify-center bg-gray-50 rounded p-1">
              {item?.courier_partner?.logo ? (
                <AWSImage
                  s3Key={item?.courier_partner.logo}
                  className="w-full h-full object-contain"
                />
              ) : (
                <span className="text-xs text-gray-400">No Logo</span>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-gray-800 text-base truncate">
                    {item?.courier_name}
                  </p>
                  <p className="text-xs text-gray-500">{item?.account_code}</p>
                </div>
                <Radio
                  checked={isSelected}
                  onChange={() => onChange(item?.account_code)}
                  value={item?.account_code}
                />
              </div>

              {item?.shipping_charge ? (
                <p className="mt-1 text-blue-600 font-bold text-sm">
                  ₹{item?.shipping_charge}
                </p>
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
            rowHeight={105}
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
