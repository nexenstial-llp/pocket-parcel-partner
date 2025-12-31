/* eslint-disable react/prop-types */
import { Modal, List, Button, Tag, Space, Typography } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";

const { Text } = Typography;

const AddressSelectionModal = ({
  open,
  onCancel,
  onSelect,
  title,
  addresses = [],
}) => {
  return (
    <Modal
      title={title || "Select Address"}
      open={open}
      onCancel={onCancel}
      footer={null}
      width={{ xs: "90%", sm: "80%", md: "65%", xxl: "50%" }}
      centered
    >
      <List
        dataSource={addresses}
        size="small"
        pagination={{
          pageSize: 5,
        }}
        renderItem={(item) => (
          <List.Item
            className="hover:bg-slate-50 border border-gray-100 rounded-lg mb-2"
            actions={[
              <Button
                size="small"
                type="primary"
                onClick={() => onSelect(item)}
                key="select"
              >
                Select
              </Button>,
            ]}
          >
            <List.Item.Meta
              avatar={
                <div className="bg-blue-50 p-2 rounded-full text-blue-500">
                  <EnvironmentOutlined />
                </div>
              }
              title={
                <Space>
                  <Text>
                    {item.full_name} | {item.phone_number}
                  </Text>
                  <Tag color="blue">{item.address_type}</Tag>
                  {item.is_default && <Tag color="green">Default</Tag>}
                </Space>
              }
              description={
                <div className="text-xs text-gray-500">
                  <Text strong>{item.label}</Text>
                  <div>
                    {item.address_line1}
                    {item.address_line2 ? `, ${item.address_line2}` : ""},{" "}
                    {item.city}, {item.state} - {item.pincode}
                  </div>
                </div>
              }
            />
          </List.Item>
        )}
      />
    </Modal>
  );
};

export default AddressSelectionModal;
