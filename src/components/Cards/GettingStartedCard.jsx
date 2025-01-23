import React from "react";
import { Button, Card } from "antd";
const GettingStartedCard = ({ icon, title, subTitle, btnText }) => {
  return (
    <Card>
     <div  className=" flex flex-col gap-4 ">
     <div className="flex gap-5">
        <div className=" bg-gray-300 p-2 rounded-md h-fit text-purple-500">
          {icon}
        </div>
        <div className="">
          <h5 className="text-lg">{title}</h5>
          <p className="text-gray-700 leading-4 text-sm">{subTitle}</p>
        </div>
      </div>

      <Button className="w-fit ml-[72px]" type="primary">{btnText}</Button>
     </div>
    </Card>
  );
};

export default GettingStartedCard;
