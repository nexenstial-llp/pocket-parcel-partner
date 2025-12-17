/* eslint-disable react/prop-types */
import { Modal, Input, List, Button, Tag, Space, Typography } from "antd";
import { useState, useMemo, useEffect } from "react";
import { useGetAllAddresses } from "@/features/address-management/address-management.query";
import {
  SearchOutlined,
  EnvironmentOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import AddressModal from "@/features/address-management/components/AddressModal";
import EditAddressModal from "@/features/address-management/components/EditAddressModal";

const { Text } = Typography;

const AddressSelectorModal = ({ open, onCancel, onSelect, title }) => {
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText, setDebouncedSearchText] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  // Edit modal
  const [isEditModalData, setIsEditModalData] = useState({
    open: false,
    id: null,
    type: "edit",
  });
  // Pagination state
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    const handler = setTimeout(() => {
      setPage(1);
      setDebouncedSearchText(searchText);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchText]);

  const handlePageChange = (page, pageSize) => {
    setPage(page);
    setLimit(pageSize);
  };

  const { data, isLoading } = useGetAllAddresses({
    page,
    limit,
    search: debouncedSearchText,
  });

  const addresses = useMemo(() => data?.data?.addresses || [], [data]);

  return (
    <>
      <Modal
        title={title || "Select Address"}
        open={open}
        onCancel={onCancel}
        footer={null}
        width={{ xs: "80%", sm: "70%", md: "60%", xxl: "50%" }}
        centered
      >
        <div className="flex gap-2 mb-4">
          <Input
            size="small"
            prefix={<SearchOutlined />}
            placeholder="Search by label, name, city, or phone..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button
            size="small"
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsAddModalOpen(true)}
          >
            Add Address
          </Button>
        </div>

        <List
          loading={isLoading}
          dataSource={addresses}
          size="small"
          pagination={{
            pageSize: limit,
            current: page,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `Total ${total} addresses`,
            size: "small",
            onChange: handlePageChange,
            total: data?.data?.pagination?.total,
            pageSizeOptions: ["10", "20", "30", "40", "50"],
          }}
          renderItem={(item) => (
            <List.Item
              className="hover:bg-slate-50 cursor-pointer transition-colors border border-gray-100 mb-2 rounded-lg p-3"
              actions={[
                <Button
                  onClick={() =>
                    setIsEditModalData({
                      open: true,
                      id: item.id,
                      type: "edit",
                    })
                  }
                  type="default"
                  size="small"
                  key="edit"
                >
                  Edit
                </Button>,
                <Button
                  onClick={() => onSelect(item)}
                  type="primary"
                  size="small"
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
                    <Text strong>{item.label}</Text>
                    <Tag color="blue">{item.address_type}</Tag>
                    {item.is_default && <Tag color="green">Default</Tag>}
                  </Space>
                }
                description={
                  <div className="text-xs text-gray-500 flex flex-col">
                    <Text>
                      {item.full_name} | {item.phone_number}
                    </Text>
                    <p>
                      {item.address_line1},{" "}
                      {item.address_line2 ? item.address_line2 + ", " : ""}
                      {item.city}, {item.state} - {item.pincode}
                    </p>
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

      {isEditModalData.open && (
        <EditAddressModal
          modalData={isEditModalData}
          onClose={() =>
            setIsEditModalData({ open: false, id: null, type: "edit" })
          }
        />
      )}
    </>
  );
};

export default AddressSelectorModal;
