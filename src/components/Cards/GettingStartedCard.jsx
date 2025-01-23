import React from "react";
import { Button } from "antd";
const GettingStartedCard = ({ icon, title, subTitle, btnText }) => {
  return (
    <div className="card flex flex-col gap-2 h-full">
      <div className="flex gap-5">
        <div className=" bg-gray-300 p-2 rounded-md h-fit text-purple-500">
          {icon}
        </div>
        <div className="">
          <h5 className="text-lg">{title}</h5>
          <p className="text-gray-700 leading-4 text-sm">{subTitle}</p>
        </div>
      </div>

      <Button type="primary">{btnText}</Button>
    </div>
  );
};

export default GettingStartedCard;
