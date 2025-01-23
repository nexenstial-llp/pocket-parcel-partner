import React, { useState } from "react";
import { Button, Modal } from "antd";

import NewTemplate from "../NewTemplate";
const InvoiceTemplateModal = () => {
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
  return (
    <>
      <Button type="default" onClick={showModal}>
        + New Invoice Template
      </Button>
      <Modal
        title={
          <div className="pb-3 border-b border-gray-300">
            <h2 className="text-2xl">New Template</h2>
          </div>
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
        width={"70%"}
        centered
      >
        <NewTemplate handleOk={handleOk} handleCancel={handleCancel} />
      </Modal>
    </>
  );
};
export default InvoiceTemplateModal;
