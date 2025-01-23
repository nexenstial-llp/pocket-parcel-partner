import { useNavigate } from "@tanstack/react-router";
import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import SocialMediaModal from "../Modals/SocialMediaModal";
import { Button } from "antd";

const BusinessProfileCard = ({ title, subTitle, icon, isCompleted }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const navigate = useNavigate();
  const handleClick = () => {
    if (title === "Add Bank Details") {
      navigate({ to: "/bank-details" });
    }
    showModal();
  };
  return (
    <div className="card flex flex-col gap-2 h-full">
      <SocialMediaModal
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
      <div className="flex gap-5">
        <div className="h-fit bg-gray-300 text-purple-500 p-2 rounded-md">
          {icon}
        </div>
        <div className="">
          <h5 className="text-lg">{title}</h5>
          <p className="text-gray-700 leading-4 text-sm">{subTitle}</p>
        </div>
        <div className="ml-auto">
          {isCompleted && (
            <div className="text-sm bg-green-100 text-green-500 px-2 py-1 flex items-center gap-1 rounded-md">
              <FaCheckCircle />
              Completed
            </div>
          )}
          {!isCompleted && (
            <Button type="primary" onClick={handleClick}>
              + Add
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BusinessProfileCard;
