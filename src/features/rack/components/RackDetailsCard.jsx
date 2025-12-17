/* eslint-disable react/prop-types */
import { removeUnderscores } from "@/utils/typography.util";
import { Descriptions, Tag, Divider } from "antd";
import dayjs from "dayjs";

const RackDetailsCard = ({ data }) => {
  if (!data) return null;

  const {
    rack_code,
    rack_name,
    location,
    zone,
    aisle,
    row,
    level,
    capacity,
    current_load,
    max_weight,
    rack_type,
    is_active,
    notes,
    dimensions,
    created_at,
    updated_at,
    warehouse,
    creator,
    updater,
  } = data;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="">
          <p>
            <span className="font-semibold">Code: </span>
            {rack_code}
          </p>
          <p>
            <span className="font-semibold">Name: </span>
            {rack_name}
          </p>
        </div>

        <Tag color={is_active ? "green" : "red"}>
          {is_active ? "Active" : "Inactive"}
        </Tag>
      </div>

      {/* Rack Information */}
      <Descriptions size="small" column={{ xs: 1, sm: 2, md: 3 }} bordered>
        <Descriptions.Item label="Zone">{zone}</Descriptions.Item>
        <Descriptions.Item label="Aisle">{aisle}</Descriptions.Item>
        <Descriptions.Item label="Row">{row}</Descriptions.Item>
        <Descriptions.Item label="Level">{level}</Descriptions.Item>
        <Descriptions.Item label="Location">{location}</Descriptions.Item>
        <Descriptions.Item label="Rack Type">
          <Tag color="blue">{removeUnderscores(rack_type)}</Tag>
        </Descriptions.Item>

        <Descriptions.Item label="Capacity">{capacity}</Descriptions.Item>
        <Descriptions.Item label="Current Load">
          {current_load}
        </Descriptions.Item>
        <Descriptions.Item label="Max Weight">{max_weight}</Descriptions.Item>
      </Descriptions>

      <Divider />

      {/* Dimensions */}
      <Descriptions
        size="small"
        column={{ xs: 1, sm: 3 }}
        title="Dimensions"
        bordered
      >
        <Descriptions.Item label="Width">
          {dimensions?.width} {dimensions?.unit}
        </Descriptions.Item>
        <Descriptions.Item label="Height">
          {dimensions?.height} {dimensions?.unit}
        </Descriptions.Item>
        <Descriptions.Item label="Depth">
          {dimensions?.depth} {dimensions?.unit}
        </Descriptions.Item>
      </Descriptions>

      {notes && (
        <>
          <Divider />
          <Descriptions size="small" column={1} bordered>
            <Descriptions.Item label="Notes">{notes}</Descriptions.Item>
          </Descriptions>
        </>
      )}

      <Divider />

      {/* Warehouse */}
      <Descriptions
        size="small"
        title="Warehouse"
        column={{ xs: 1, sm: 2 }}
        bordered
      >
        <Descriptions.Item label="Name">{warehouse?.name}</Descriptions.Item>
        <Descriptions.Item label="Code">{warehouse?.code}</Descriptions.Item>
        <Descriptions.Item label="Type">
          {warehouse?.warehouse_type}
        </Descriptions.Item>
        <Descriptions.Item label="Contact">
          {warehouse?.contact_person} ({warehouse?.contact_phone})
        </Descriptions.Item>
      </Descriptions>

      <Divider />

      {/* Audit Info */}
      <Descriptions
        size="small"
        title="Audit Information"
        column={{ xs: 1, sm: 2 }}
        bordered
      >
        <Descriptions.Item label="Created By">
          {creator?.full_name}
        </Descriptions.Item>
        <Descriptions.Item label="Created At">
          {dayjs(created_at).format("DD MMM YYYY, hh:mm A")}
        </Descriptions.Item>
        <Descriptions.Item label="Updated By">
          {updater?.full_name}
        </Descriptions.Item>
        <Descriptions.Item label="Updated At">
          {dayjs(updated_at).format("DD MMM YYYY, hh:mm A")}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default RackDetailsCard;
