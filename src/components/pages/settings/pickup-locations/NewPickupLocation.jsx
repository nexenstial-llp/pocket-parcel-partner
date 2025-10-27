import { useState } from "react";
import { Button, Modal } from "antd";

import { CiLocationOn } from "react-icons/ci";
import InputTag from "../../../ui/formFields/InputTag";
import { MdOutlineWorkOutline } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
const workingDayData = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const NewPickupLocation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSameReturnAddress, setIsSameReturnAddress] = useState(true);
  const [workingDays, setWorkingDays] = useState([
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ]);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleClick = (day) => {
    if (!workingDays.includes(day)) {
      setWorkingDays((prev) => [...prev, day]);
      return;
    }
    let updatedDays = workingDays.filter((item) => item != day);
    setWorkingDays(updatedDays);
  };
  const isSelected = (day) => {
    const isPresent = workingDays.includes(day);
    return isPresent;
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add New Pickup Location
      </Button>
      <Modal
        title={
          <div>
            <h2 className="text-2xl text-gray-800">Add Pickup Location</h2>
          </div>
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={"60%"}
        centered
      >
        <div
          style={{ scrollbarWidth: "thin" }}
          className="flex flex-col gap-2 overflow-y-auto "
        >
          <div className="flex items-center gap-2 text-xl">
            <div className="bg-gray-100 p-2 rounded-md">
              <CiLocationOn />
            </div>
            <h4 className=" text-gray-700"> Address Details</h4>
          </div>
          <div className="grid grid-cols-2 my-2 gap-4">
            <InputTag
              label={"Facility Name"}
              id={"facility_name"}
              placeholder="Enter name"
            />
            <InputTag
              label={"Contact Person Name (Optional)"}
              id={"contact_person_name"}
              placeholder="Enter contact person name"
            />
            <InputTag
              label={"Pickup Location Contact"}
              id={"contact"}
              placeholder="Enter mobile number"
              type="number"
            />
            <InputTag
              label={"Email (Optional)"}
              id={"email"}
              placeholder="Enter email ID"
              type="email"
            />
            <div className="col-span-2">
              <InputTag
                label={"Address Line"}
                id={"address"}
                placeholder="Enter address"
              />
            </div>
            <InputTag
              label={"Pincode"}
              id={"pincode"}
              placeholder="Enter Pincode"
              type={"number"}
            />
            <div className="bg-gray-300 p-2 rounded-md">
              <p className="font-bold">City,</p>
              <div>
                <span className="mr-2">State</span>
                <span>India</span>
              </div>
            </div>
            <div className="flex flex-col gap-1 col-span-2">
              <label htmlFor="pickup_slot">Default Pickup Slot</label>
              <select
                className={` border outline-none border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2 border-gray-300"}`}
                name="pick_up_slot"
                id="pick_up_slot"
              >
                <option value={"Mid Day 10:00:00 - 14:00:00"}>
                  Mid Day 10:00:00 - 14:00:00
                </option>
                <option value={"Evening Day 14:00:00 - 18:00:00"}>
                  Evening Day 14:00:00 - 18:00:00
                </option>
              </select>
            </div>
          </div>
          <hr />
          <div className="flex items-center gap-2 my-2 text-xl">
            <div className="bg-gray-100 p-2 rounded-md">
              <MdOutlineWorkOutline />
            </div>
            <h4 className=" text-gray-700"> Working Days</h4>
          </div>
          <div className="my-2">
            <p>Working Days</p>

            <div className="flex gap-2 flex-wrap mt-3">
              {workingDayData.map((item) => (
                <div key={item}>
                  <Button
                    icon={<FaCheck />}
                    type={isSelected(item) ? "primary" : "default"}
                    onClick={() => handleClick(item)}
                  >
                    {item}
                  </Button>
                </div>
              ))}
            </div>
          </div>
          <hr />
          <div className="my-2">
            <h4 className="text-gray-700"> Return Details</h4>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="isSameReturnAddress"
                id="isSameReturnAddress"
                checked={isSameReturnAddress}
                onChange={() => setIsSameReturnAddress(!isSameReturnAddress)}
              />
              <label htmlFor="isSameReturnAddress">
                Return address is the same as pickup address
              </label>
            </div>
            {!isSameReturnAddress && (
              <div className="my-2">
                <InputTag
                  label={"Address Line"}
                  id={"receiving_address"}
                  placeholder="Enter Address"
                />
                <div className="grid grid-cols-2 mt-4 gap-4">
                  <InputTag
                    label={"Pincode"}
                    id={"receiving_pincodee"}
                    placeholder="Enter Pincode"
                  />
                  <div className="bg-gray-300 p-2 rounded-md">
                    <p className="font-bold">City,</p>
                    <div>
                      <span className="mr-2">State</span>
                      <span>India</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};
export default NewPickupLocation;
