/* eslint-disable react/prop-types */
import {
  EnvironmentOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Card, Empty } from "antd";
const AddressBlock = ({ title, data, icon, typeLabel }) => {
  if (!data)
    return (
      <Card
        size="small"
        className="h-full bg-gray-50 border-dashed border-gray-200 shadow-none flex items-center justify-center"
      >
        <Empty
          description={
            <span className="text-xs text-gray-400">No {title}</span>
          }
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      </Card>
    );

  return (
    <Card
      size="small"
      className="h-full border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
      styles={{
        header: {
          borderBottom: "1px solid #f0f0f0",
          padding: "12px 16px",
          minHeight: "auto",
        },
        body: {
          padding: "16px",
        },
      }}
      title={
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-sm font-semibold text-gray-800">{title}</span>
          {typeLabel && (
            <span
              className={`ml-auto text-[10px] font-medium bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full uppercase tracking-wide ${
                typeLabel === "Source"
                  ? "bg-blue-500! text-white"
                  : typeLabel === "Destination"
                  ? "bg-green-500 text-white"
                  : typeLabel === "WAREHOUSE"
                  ? "bg-orange-500 text-white"
                  : ""
              }`}
            >
              {typeLabel}
            </span>
          )}
        </div>
      }
    >
      <div className="space-y-1">
        {(data.pickup_name || data.drop_name) && (
          <InfoRow
            icon={<UserOutlined />}
            label="Name"
            value={
              <span className="font-medium text-gray-900">
                {data.pickup_name || data.drop_name}
              </span>
            }
          />
        )}

        {(data.pickup_phone || data.drop_phone) && (
          <InfoRow
            icon={<PhoneOutlined />}
            label="Phone"
            value={data.pickup_phone || data.drop_phone}
          />
        )}

        <div className="border-t border-gray-200">
          <InfoRow
            icon={<EnvironmentOutlined />}
            label="Address"
            value={
              <div>
                <div className="mb-0.5">
                  {data.pickup_address || data.drop_address}
                </div>
                <div className="text-xs text-gray-500">
                  {data.pickup_city || data.drop_city},{" "}
                  {data.pickup_state || data.drop_state}{" "}
                  {data.drop_pincode && ` - ${data.drop_pincode}`}
                  {data.pickup_pincode && ` - ${data.pickup_pincode}`}
                </div>
              </div>
            }
          />
        </div>
      </div>
    </Card>
  );
};

export default AddressBlock;

const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-start gap-3 py-1.5">
    <div className="mt-0.5 text-gray-400 text-sm shrink-0">{icon}</div>
    <div className="min-w-0 flex-1">
      <div className="text-[10px] uppercase tracking-wide text-gray-400 mb-0.5">
        {label}
      </div>
      <div className="text-sm text-gray-700 leading-snug wrap-break-word">
        {value || <span className="text-gray-300 italic">N/A</span>}
      </div>
    </div>
  </div>
);
