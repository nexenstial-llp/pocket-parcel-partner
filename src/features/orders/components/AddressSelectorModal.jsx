/* eslint-disable react/prop-types */
import {
  Modal,
  Input,
  List,
  Button,
  Tag,
  Space,
  Typography,
  message,
} from "antd";
import { useState, useMemo } from "react";
import { useGetAllCustomerAddress } from "@/features/address-management/address-management.query";
import {
  SearchOutlined,
  EnvironmentOutlined,
  PlusOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import AddressModal from "@/features/address-management/components/AddressModal";
import EditAddressModal from "@/features/address-management/components/EditAddressModal";

const { Text } = Typography;

const AddressSelectorModal = ({ open, onCancel, onSelect, title }) => {
  /* -------------------- STATE -------------------- */
  const [inputValue, setInputValue] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(null); // triggers search
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalData, setIsEditModalData] = useState({
    open: false,
    id: null,
    type: "edit",
  });

  /* -------------------- API -------------------- */
  const { data, isLoading } = useGetAllCustomerAddress({
    page,
    limit,
    phone: phoneNumber, // null → initial load | string → search
  });

  /* -------------------- NORMALIZE DATA -------------------- */
  const addresses = useMemo(() => {
    if (!data) return [];

    // Initial load → data is array
    if (Array.isArray(data.data)) {
      return data.data;
    }

    // Search result → data.addresses
    if (data.data?.addresses) {
      return data.data.addresses;
    }

    return [];
  }, [data]);

  const handlePageChange = (page, pageSize) => {
    setPage(page);
    setLimit(pageSize);
  };
  const PHONE_10_DIGIT_REGEX = /^\d{10}$/;
  /* -------------------- RENDER -------------------- */
  return (
    <>
      <Modal
        title={title || "Select Address"}
        open={open}
        onCancel={onCancel}
        footer={null}
        width={{ xs: "90%", sm: "80%", md: "65%", xxl: "50%" }}
        centered
      >
        {/* SEARCH BAR */}
        <div className="flex gap-2 mb-4">
          <Input
            addonBefore="+91"
            size="small"
            placeholder="Enter 10 digit mobile number"
            prefix={<SearchOutlined />}
            value={inputValue}
            maxLength={12}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              setInputValue(value);
            }}
          />

          <Button
            size="small"
            type="primary"
            onClick={() => {
              if (!PHONE_10_DIGIT_REGEX.test(inputValue)) {
                message.error("Please enter a valid 10 digit mobile number");
                return;
              }
              setPage(1);
              setPhoneNumber(`91${inputValue}`); // 🔥 backend format
            }}
            disabled={!PHONE_10_DIGIT_REGEX.test(inputValue)}
          >
            Search
          </Button>
          <Button
            size="small"
            icon={<ReloadOutlined />}
            onClick={() => {
              setInputValue("");
              setPhoneNumber(null);
              setPage(1);
            }}
            disabled={!inputValue && !phoneNumber}
          >
            Remove
          </Button>

          <Button
            size="small"
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsAddModalOpen(true)}
          >
            Add Address
          </Button>
        </div>

        {/* SEARCH USER INFO (ONLY AFTER SEARCH) */}
        {data?.data?.user && (
          <div className="mb-3 text-sm text-gray-600">
            Showing addresses for <strong>{data.data.user.full_name}</strong> (
            {data.data.user.phone_number})
          </div>
        )}

        {/* ADDRESS LIST */}
        <List
          loading={isLoading}
          dataSource={addresses}
          size="small"
          locale={{
            emptyText: phoneNumber
              ? "No addresses found for this number"
              : "No addresses available",
          }}
          pagination={{
            current: page,
            pageSize: limit,
            showSizeChanger: true,
            total: data?.pagination?.total,
            onChange: handlePageChange,
            pageSizeOptions: ["10", "20", "30", "40", "50"],
          }}
          renderItem={(item) => (
            <List.Item
              className="hover:bg-slate-50 border border-gray-100 rounded-lg mb-2"
              actions={[
                <Button
                  size="small"
                  onClick={() =>
                    setIsEditModalData({
                      open: true,
                      id: item.id,
                      type: "edit",
                    })
                  }
                  key="edit"
                >
                  Edit
                </Button>,
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
                      {item.address_line2
                        ? `, ${item.address_line2}`
                        : ""}, {item.city}, {item.state} - {item.pincode}
                    </div>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </Modal>

      {/* ADD ADDRESS */}
      {isAddModalOpen && (
        <AddressModal
          open={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
        />
      )}

      {/* EDIT ADDRESS */}
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
