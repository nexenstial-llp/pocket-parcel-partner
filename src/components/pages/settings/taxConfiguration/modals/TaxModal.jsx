import { useState } from "react";
import { Button, Modal } from "antd";
import TaxInputs from "../TaxInputs";
const TaxModal = () => {
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
            <h2 className="text-2xl">Add New Tax</h2>
          </div>
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
        centered
        width={"40%"}
      >
        <TaxInputs handleOk={handleOk} handleCancel={handleCancel} />
      </Modal>
    </>
  );
};
export default TaxModal;
