/* eslint-disable react/prop-types */
import { Tooltip } from "antd";
import { TbFileTime } from "react-icons/tb";

const DefaultExtraContent = ({
  title = '"Displays real time data from past 30 days (default) upto the last hour"',
}) => {
  return (
    <Tooltip title={title}>
      <TbFileTime size={20} />
    </Tooltip>
  );
};

export default DefaultExtraContent;
