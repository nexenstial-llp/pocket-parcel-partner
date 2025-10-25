/* eslint-disable react/prop-types */
import { Button } from "antd";
import ResponsiveCard from "./ResponsiveCard";
const GettingStartedCard = ({ icon, title, subTitle, btnText }) => {
  return (
    <ResponsiveCard shadow hoverable className="h-full">
      <div className=" flex flex-col gap-4 ">
        <div className="flex gap-5">
          <div className=" bg-gray-100 p-2 rounded-md h-fit text-secondary">
            {icon}
          </div>
          <div className="flex flex-col gap-1">
            <h6 className="text-[16px]">{title}</h6>
            <p className="text-gray-700 leading-4 text-xs">{subTitle}</p>
          </div>
        </div>

        <Button className="w-fit ml-[65px]" type="primary">
          {btnText}
        </Button>
      </div>
    </ResponsiveCard>
  );
};

export default GettingStartedCard;
