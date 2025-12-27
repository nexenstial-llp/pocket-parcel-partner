/* eslint-disable react/prop-types */
import {
  Descriptions,
  Tag,
  Divider,
  Card,
  Typography,
  Tooltip,
  Space,
  Button,
} from "antd";
import {
  UserOutlined,
  EnvironmentOutlined,
  GlobalOutlined,
  InfoCircleOutlined,
  CompassOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import MapViewer from "@/components/ui/MapViewer.jsx";
import { removeUnderscores } from "@/utils/typography.util";

const { Title, Text } = Typography;

const AddressDetails = ({ data }) => {
  if (!data) return null;

  const {
    label,
    full_name,
    phone_number,
    email,
    address_line1,
    address_line2,
    city,
    state,
    pincode,
    country,
    landmark,
    latitude,
    longitude,
    address_type,
    custom_address_type,
    is_default,
    created_via,
    created_at,
    updated_at,
    user,
  } = data;

  const mapLink = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

  const SectionTitle = ({ icon, title }) => (
    <Space className="mb-3 mt-1 ">
      {icon}
      <span className="font-semibold text-base">{title}</span>
    </Space>
  );

  return (
    <Card className="shadow-sm rounded-lg border-t-4 border-t-blue-500">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div className="flex items-center gap-3">
          <div>
            <Title
              level={4}
              style={{
                margin: 0,
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              {label || "Address Details"}
              {is_default && <Tag color="success">DEFAULT</Tag>}
            </Title>
          </div>
        </div>
        <Tag
          color="geekblue"
          className="mt-2 sm:mt-0 px-3 py-1 text-sm uppercase font-medium"
        >
          {custom_address_type || address_type || "Unknown Type"}
        </Tag>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8">
        {/* Left Column: Contact & Address */}
        <div className="flex flex-col gap-6">
          <div>
            <SectionTitle icon={<UserOutlined />} title="Contact Person" />
            <Descriptions
              column={1}
              size="small"
              bordered
              className="bg-gray-50"
            >
              <Descriptions.Item label="Name">
                <Text strong>{full_name}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Phone">
                <a href={`tel:${phone_number}`} className="hover:underline">
                  {phone_number}
                </a>
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                <a href={`mailto:${email}`} className="text-gray-600">
                  {email}
                </a>
              </Descriptions.Item>
            </Descriptions>
          </div>

          <div>
            <SectionTitle
              icon={<EnvironmentOutlined />}
              title="Physical Address"
            />
            <Descriptions column={1} size="small" bordered layout="vertical">
              <Descriptions.Item label="Street Address">
                {address_line1 && (
                  <>
                    <span className="font-semibold">Address Line 1 : </span>
                    {address_line1}
                  </>
                )}
                {address_line2 && (
                  <>
                    <br />
                    <span className="font-semibold">Address Line 2 : </span>
                    <span className="text-gray-500 text-xs">
                      {address_line2}
                    </span>
                  </>
                )}
                {landmark && (
                  <>
                    <br />
                    <span className="font-semibold">Landmark : </span>
                    <span className="text-xs text-orange-600">
                      Near {landmark}
                    </span>
                  </>
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Region">
                {city}, {state} - <Text strong>{pincode}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Country">{country}</Descriptions.Item>
            </Descriptions>
          </div>

          {/* Linked User Account */}
          {user && (
            <div>
              <SectionTitle
                icon={<InfoCircleOutlined />}
                title="Linked Account"
              />
              <Descriptions column={1} size="small" bordered>
                <Descriptions.Item label="User Name">
                  {user?.full_name}
                </Descriptions.Item>
                <Descriptions.Item label="Email">
                  <a href={`mailto:${user?.email}`} className="hover:underline">
                    {user?.email}
                  </a>
                </Descriptions.Item>
                <Descriptions.Item label="Contact">
                  <a
                    href={`tel:${user?.phone_number}`}
                    className="hover:underline"
                  >
                    +{user?.country_code} {user?.phone_number}
                  </a>
                </Descriptions.Item>
              </Descriptions>
            </div>
          )}
        </div>

        {/* Right Column: Location, Meta & User */}
        <div className="flex flex-col gap-6">
          {/* Geospatial Info */}
          <div>
            <SectionTitle icon={<GlobalOutlined />} title="Geospatial Data" />
            <div className="bg-blue-50 p-4 rounded-md border border-blue-100 flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <Text
                  type="secondary"
                  className="text-xs uppercase font-bold tracking-wide"
                >
                  Coordinates
                </Text>
                <Tooltip title="View on Google Maps">
                  <Button
                    type="link"
                    size="small"
                    href={mapLink}
                    target="_blank"
                    icon={<CompassOutlined />}
                  >
                    Open Map
                  </Button>
                </Tooltip>
              </div>
              <div className="flex gap-4 font-mono text-sm">
                <div>
                  <span className="text-gray-500 mr-2">LAT:</span>
                  <Text copyable>{latitude}</Text>
                </div>
                <Divider type="vertical" className="h-5 bg-gray-300" />
                <div>
                  <span className="text-gray-500 mr-2">LNG:</span>
                  <Text copyable>{longitude}</Text>
                </div>
              </div>
            </div>
          </div>
          <MapViewer lat={latitude} lng={longitude} />

          {/* System Metadata */}
          <div>
            <SectionTitle icon={<HistoryOutlined />} title="System Metadata" />
            <div className="grid grid-cols-2 gap-4 text-xs text-gray-500">
              <div className="bg-gray-50 p-2 rounded">
                <div className="font-semibold mb-1">Created Via</div>
                <Tag className="m-0">{removeUnderscores(created_via)}</Tag>
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <div className="font-semibold mb-1">Status</div>
                <Tag color="green" className="m-0">
                  ACTIVE
                </Tag>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Divider className="my-6" />

      {/* Footer Audit Logs */}
      <div className="flex flex-col sm:flex-row justify-between text-xs text-gray-400 bg-gray-50 p-3 rounded-md">
        <Space>
          <span>
            Created:{" "}
            <Text strong className="text-gray-500">
              {dayjs(created_at).format("DD MMM YYYY, hh:mm A")}
            </Text>
          </span>
        </Space>
        <Space>
          <span>
            Last Updated:{" "}
            <Text strong className="text-gray-500">
              {dayjs(updated_at).format("DD MMM YYYY, hh:mm A")}
            </Text>
          </span>
        </Space>
      </div>
    </Card>
  );
};

export default AddressDetails;
