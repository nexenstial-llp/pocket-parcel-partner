/* eslint-disable react/prop-types */
import { Drawer, Tag, Divider } from "antd";
import {
  EnvironmentOutlined,
  PhoneOutlined,
  UserOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { useGetAddressesById } from "../address-management.query";
import ErrorFallback from "@/components/ui/ErrorFallback";

export default function AddressDetailsDrawer({ open, onClose, id }) {
  const { data, isLoading, isError, error } = useGetAddressesById(id);

  if (isError) {
    return <ErrorFallback error={error} />;
  }

  return (
    <Drawer
      loading={isLoading}
      title={
        <div className="flex items-center gap-2">
          <HomeOutlined className="text-blue-600" />
          <span className="font-semibold">{data?.label} Address</span>
        </div>
      }
      open={open}
      onClose={onClose}
      width={420}
      className="custom-drawer"
    >
      <div className="space-y-4">
        {/* Full Name */}
        <section className="bg-gray-50 p-3 rounded-lg border">
          <div className="flex items-center gap-2 mb-1">
            <UserOutlined className="text-blue-500" />
            <h3 className="font-semibold text-gray-700">User</h3>
          </div>
          <p className="text-gray-800">{data?.full_name}</p>
        </section>

        {/* Phone */}
        <section className="bg-gray-50 p-3 rounded-lg border">
          <div className="flex items-center gap-2 mb-1">
            <PhoneOutlined className="text-green-500" />
            <h3 className="font-semibold text-gray-700">Phone</h3>
          </div>
          <p className="text-gray-800">{data?.phone_number}</p>
        </section>

        {/* Address */}
        <section className="bg-gray-50 p-3 rounded-lg border">
          <div className="flex items-center gap-2 mb-1">
            <EnvironmentOutlined className="text-rose-500" />
            <h3 className="font-semibold text-gray-700">Address</h3>
          </div>

          <p className="text-gray-800">
            {data?.address_line1}
            <br />
            {data?.address_line2 && (
              <>
                {data?.address_line2}
                <br />
              </>
            )}
            {data?.city}, {data?.state}, {data?.country} – {data?.pincode}
          </p>

          {data?.landmark && (
            <p className="text-gray-600 mt-1">
              <b>Landmark:</b> {data?.landmark}
            </p>
          )}
        </section>

        {/* Status + Metadata */}
        <section className="bg-gray-50 p-3 rounded-lg border">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-gray-700 mb-1">Address Type</h3>
              <Tag color="blue">{data?.address_type}</Tag>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700 mb-1">Default</h3>
              {data?.is_default ? (
                <Tag color="green">YES</Tag>
              ) : (
                <Tag color="red">NO</Tag>
              )}
            </div>
          </div>
        </section>

        <Divider />
      </div>
    </Drawer>
  );
}
