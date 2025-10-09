import { useEffect, useState } from "react";
import { Modal, Button, Form } from "antd";
import MoreFilters from "./MoreFilters";
import { useNavigate, useSearch } from "@tanstack/react-router";

const FiltersModal = () => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const search = useSearch({ strict: false });
  const navigate = useNavigate();
  const showModal = () => setVisible(true);
  const handleOk = () => setVisible(false);
  const handleCancel = () => setVisible(false);
  const handleSubmit = async () => {
    try {
      const validate = await form.validateFields();
      console.log(validate);
      if (validate) {
        navigate({
          search: {
            ...search,
            ...form.getFieldsValue(),
          },
        });
        handleOk();
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    form.setFieldsValue(search);
  }, [search, form]);
  return (
    <>
      <Button type="primary" onClick={showModal}>
        More Filters
      </Button>
      <Modal
        title="Filter Options"
        open={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={600}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="apply" type="primary" onClick={handleSubmit}>
            Apply Filters
          </Button>,
        ]}
      >
        <MoreFilters form={form} />
      </Modal>
    </>
  );
};

export default FiltersModal;
