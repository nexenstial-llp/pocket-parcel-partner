/* eslint-disable react/prop-types */
import { Modal, Input, List, Button, Tag, Space, Typography } from "antd";
import { useState, useMemo } from "react";
import { useGetAllAddresses } from "@/features/address-management/address-management.query";
import {
  SearchOutlined,
  EnvironmentOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import AddressModal from "@/features/address-management/components/AddressModal";

const { Text } = Typography;

const AddressSelectorModal = ({ open, onCancel, onSelect, title }) => {
  const [searchText, setSearchText] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { data, isLoading } = useGetAllAddresses({ page: 1, limit: 100 }); // Fetch enough addresses

  const addresses = useMemo(() => data?.data?.addresses || [], [data]);

  const filteredAddresses = useMemo(() => {
    if (!searchText) return addresses;
    const lowerSearch = searchText.toLowerCase();
    return addresses.filter(
      (addr) =>
        addr.label?.toLowerCase().includes(lowerSearch) ||
        addr.full_name?.toLowerCase().includes(lowerSearch) ||
        addr.city?.toLowerCase().includes(lowerSearch) ||
        addr.phone_number?.includes(lowerSearch)
    );
  }, [addresses, searchText]);

  return (
    <>
      <Modal
        title={title || "Select Address"}
        open={open}
        onCancel={onCancel}
        footer={null}
        width={700}
        centered
      >
        <div className="flex gap-2 mb-4">
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search by label, name, city, or phone..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsAddModalOpen(true)}
          >
            Add Address
          </Button>
        </div>

        <List
          loading={isLoading}
          dataSource={filteredAddresses}
          pagination={{ pageSize: 5 }}
          renderItem={(item) => (
            <List.Item
              className="hover:bg-slate-50 cursor-pointer transition-colors border border-gray-100 mb-2 rounded-lg p-3"
              onClick={() => onSelect(item)}
              actions={[
                <Button type="primary" size="small" key="select">
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
                    <Text strong>{item.label}</Text>
                    <Tag color="blue">{item.address_type}</Tag>
                    {item.is_default && <Tag color="green">Default</Tag>}
                  </Space>
                }
                description={
                  <div className="text-xs text-gray-500 flex flex-col gap-1">
                    <Text>
                      {item.full_name} | {item.phone_number}
                    </Text>
                    <Text>
                      {item.address_line1},{" "}
                      {item.address_line2 ? item.address_line2 + ", " : ""}
                      {item.city}, {item.state} - {item.pincode}
                    </Text>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </Modal>
      {isAddModalOpen && (
        <AddressModal
          open={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
        />
      )}
    </>
  );
};

export default AddressSelectorModal;
