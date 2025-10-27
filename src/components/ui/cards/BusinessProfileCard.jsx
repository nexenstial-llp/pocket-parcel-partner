/* eslint-disable react/prop-types */
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import SocialMediaModal from "../modals/SocialMediaModal";
import { Button } from "antd";
import ResponsiveCard from "./ResponsiveCard";

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
      navigate({ to: "/settings/bank-details" });
    }
    showModal();
  };
  return (
    <ResponsiveCard
      extra={
        <>
          {isCompleted && (
            <div className="badge bg-green-100 text-green-500 px-2 py-1 flex items-center gap-1 rounded-md">
              <FaCheckCircle />
              Completed
            </div>
          )}
          {!isCompleted && (
            <Button size="small" type="primary" onClick={handleClick}>
              + Add
            </Button>
          )}{" "}
        </>
      }
      styles={{
        header: {
          border: "none",
          minHeight: "40px",
          padding: "10px",
        },
      }}
      hoverable
      shadow
      className="h-full"
    >
      <SocialMediaModal
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
      <div className="flex gap-5">
        <div className=" bg-gray-100 p-2 rounded-md h-fit text-secondary">
          {icon}
        </div>
        <div className="">
          <h5 className="text-lg">{title}</h5>
          <p className="text-gray-700 leading-4 text-sm">{subTitle}</p>
        </div>
      </div>
    </ResponsiveCard>
  );
};

export default BusinessProfileCard;
