/* eslint-disable react/prop-types */

import { Tag } from "antd";
import { Descriptions } from "antd";

export default function WeightRangeDetails({ data }) {
  if (!data) return null;

  return (
    <Descriptions title="Basic Info" bordered size="small" column={1}>
      <Descriptions.Item label="Weight Range">
        {data?.min_weight} - {data?.max_weight} {data?.unit}
      </Descriptions.Item>
      <Descriptions.Item label="Status">
        <Tag color={data?.is_active ? "green" : "red"}>
          {data?.is_active ? "Active" : "Inactive"}
        </Tag>
      </Descriptions.Item>
      <Descriptions.Item label="Display Order">
        {data?.display_order}
      </Descriptions.Item>
      <Descriptions.Item label="Description">
        {data?.description}
      </Descriptions.Item>
    </Descriptions>
  );
}
