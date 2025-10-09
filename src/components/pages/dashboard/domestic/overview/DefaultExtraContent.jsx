import { Tooltip } from "antd";
import { TbFileTime } from "react-icons/tb";

const DefaultExtraContent = () => {
  return (
    <Tooltip title="Displays real time data from past 30 days (default) upto the last hour">
      <TbFileTime size={20} />
    </Tooltip>
  );
};

export default DefaultExtraContent;
