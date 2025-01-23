import React from "react";
import { MdLocationOn } from "react-icons/md";
import deliveryTruck from "@/assets/deliveryTruck.svg";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Card, Skeleton } from "antd";
import toast from "react-hot-toast";

const fetchPincode = async (pincode) => {
  console.log("pincode", pincode);
  try {
    const response = await axios.get(
      `https://api.postalpincode.in/pincode/${pincode}`
    );
    if (!response.data?.[0]?.PostOffice?.[0]) {
      toast.error(`City or state is not found at this pincode: ${pincode}`);
    }
    return response.data?.[0]?.PostOffice?.[0] || "";
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

const PincodeInfo = ({ loading, error, errorMessage, data }) => (
  <Skeleton
    loading={loading}
    active
    title={false}
    paragraph={{
      rows: 2,
      width: ["60%", "40%"],
    }}
    className="w-2/3 text-center bg-indigo-50 p-2 rounded-md border border-dashed border-indigo-500"
  >
    {error ? (
      <p className="text-red-500">{errorMessage}</p>
    ) : (
      <div className="w-2/3 text-center bg-indigo-50 p-2 rounded-md border border-dashed border-indigo-500">
        <p className="text-gray-400">{data?.Name || "City"},</p>
        <p className="text-gray-400 text-xl">{data?.State || "State"}</p>
      </div>
    )}
  </Skeleton>
);

const PickupLocation = ({ pickupPincode, deliveryPincode }) => {
  const {
    data: pickupData,
    isLoading: pickupLoading,
    isError: pickupError,
    error: pickupErrorMessage,
  } = useQuery({
    queryKey: ["pickupPincode", pickupPincode],
    queryFn: () => fetchPincode(pickupPincode),
    enabled: pickupPincode?.length === 6,
  });

  const {
    data: deliveryData,
    isLoading: deliveryLoading,
    isError: deliveryError,
    error: deliveryErrorMessage,
  } = useQuery({
    queryKey: ["deliveryPincode", deliveryPincode],
    queryFn: () => fetchPincode(deliveryPincode),
    enabled: deliveryPincode?.length === 6,
  });
  // console.log(pickupPincode, deliveryPincode);
  return (
    <Card className="w-[40%]">
      <div className="flex flex-col gap-2 justify-between">
        {/* Pickup Location */}
        <div className="flex flex-col gap-2 items-center">
          <div className="flex gap-1 items-center font-semibold text-xl">
            <MdLocationOn className="text-2xl text-indigo-500" />
            Pickup Location
          </div>
          <PincodeInfo
            loading={pickupLoading}
            error={pickupError}
            errorMessage={pickupErrorMessage?.message}
            data={pickupData}
          />
        </div>

        <div className="bg-indigo-500 min-h-[150px] w-[1px] self-center"></div>

        {/* Delivery Location */}
        <div className="flex flex-col gap-2 items-center">
          <div className="flex gap-1 items-center font-semibold text-xl">
            <MdLocationOn className="text-2xl text-indigo-500" />
            Delivery Location
          </div>
          <PincodeInfo
            loading={deliveryLoading}
            error={deliveryError}
            errorMessage={deliveryErrorMessage?.message}
            data={deliveryData}
          />
        </div>

        <div className="mt-4 w-3/4 self-center">
          <img src={deliveryTruck} alt="Delivery" width={"100%"} />
        </div>
      </div>
    </Card>
  );
};

export default PickupLocation;
