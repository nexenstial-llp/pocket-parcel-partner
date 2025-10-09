import { Input, Modal } from "antd";
import React from "react";
import InputTag from "../formFields/InputTag";
import {
  FaInstagram,
  FaWhatsappSquare,
  FaFacebookSquare,
} from "react-icons/fa";
const SocialMediaModal = ({ isModalOpen, handleOk, handleCancel }) => {
  return (
    <Modal
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      //   footer={[]}
    >
      <h4 className="text-lg mb-3">Add Store's Social Media Handle</h4>
      <div className="flex flex-col gap-4">
        <div className="">
          <h5 className="flex gap-2 items-center text-lg">
            <FaInstagram size={30} /> Instagram
          </h5>
          <InputTag
            id="instagram"
            label={"Enter your Instagram username or profile URL"}
            placeholder="Enter URL"
          />
        </div>
        <div>
          <h5 className="flex gap-2 items-center text-lg">
            <FaFacebookSquare size={30} /> Facebook
          </h5>
          <InputTag
            id="facebook"
            label={"Enter your Facebook username or profile URL"}
            placeholder="Enter URL"
          />
        </div>
        <div>
          <h5 className="flex gap-2 items-center text-lg">
            <FaWhatsappSquare size={30} /> WhatsApp
          </h5>

          <InputTag
            id="whatsApp"
            label={"Enter your WhatsApp business number"}
            placeholder="Enter Number"
          />
        </div>
      </div>
    </Modal>
  );
};

export default SocialMediaModal;
