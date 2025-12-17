/* eslint-disable react/prop-types */
import { Card, Radio } from "antd";
import AWSImage from "@/components/ui/AWSImage";

export default function CourierPartnerSelector({ data, value, onChange }) {
  const preferenceArray =
    data?.recommendations?.result?.[0]?.preference_array || [];
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-2">Select Carrier Partner</h3>

      <Radio.Group
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full"
      >
        <div className="flex flex-col gap-2">
          {preferenceArray.map((item) => (
            <Card
              key={item.account_id}
              className={`cursor-pointer border hover:shadow-md transition ${
                value === item.account_code ? "border-blue-500!" : ""
              }`}
              onClick={() => onChange(item.account_code)}
            >
              <div className="flex items-center gap-4">
                <div className="size-16">
                  {item.courier_partner?.logo && (
                    <AWSImage s3Key={item.courier_partner.logo} />
                  )}
                </div>

                <div className="flex-1">
                  <p className="font-medium text-gray-800 text-lg">
                    {item.courier_name}
                  </p>
                  <p className="text-sm text-gray-500">{item.account_code}</p>

                  {item.shipping_charge ? (
                    <p className="mt-1 text-blue-600 font-semibold">
                      ₹{item.shipping_charge}
                    </p>
                  ) : (
                    <p className="text-gray-400 text-sm">(No rate available)</p>
                  )}
                </div>

                <Radio value={item.account_code} />
              </div>
            </Card>
          ))}
        </div>
      </Radio.Group>
    </div>
  );
}
