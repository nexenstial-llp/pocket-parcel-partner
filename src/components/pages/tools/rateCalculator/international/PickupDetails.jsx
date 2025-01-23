import React from "react";
import { MdLocationOn } from "react-icons/md";
import deliveryTruck from "@/assets/deliveryTruck.svg";
import { Card } from "antd";

const PickupDetails = () => {
  return (
    <Card className="w-[40%] ">
      <div className="flex flex-col gap-2 justify-between">
        <div className="flex flex-col gap-2 items-center">
          <div className="flex gap-1 items-center font-semibold text-xl">
            <MdLocationOn className="text-2xl text-indigo-500" />
            Pickup Location
          </div>
          <div className="border font-semibold border-dashed border-indigo-500 w-2/3 text-center bg-indigo-50 p-2 rounded-md">
            <p className="text-gray-400 ">City,</p>
            <p className="text-gray-400 text-xl">State </p>
          </div>
        </div>
        <div className="bg-indigo-500 min-h-[150px] w-[1px] self-center"></div>
        <div className="flex flex-col gap-2 items-center">
          <div className="flex gap-1 items-center font-semibold text-xl">
            <MdLocationOn className="text-2xl text-indigo-500" />
            Delivery Location
          </div>
          <div className="border font-semibold border-dashed border-indigo-500 w-2/3 text-center bg-indigo-50 p-2 rounded-md">
            <p className="text-gray-400 ">City,</p>
            <p className="text-gray-400 text-xl">State </p>
          </div>
        </div>
        <div className="mt-4 w-3/4 self-center">
          <img src={deliveryTruck} alt="Delivery" width={"100%"} />
        </div>
      </div>
    </Card>
  );
};

export default PickupDetails;
