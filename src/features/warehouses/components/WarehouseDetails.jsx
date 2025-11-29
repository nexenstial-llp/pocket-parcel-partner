/* eslint-disable react/prop-types */
import {
  Tag,
  Descriptions,
  Divider,
  Badge,
  Collapse,
  Empty,
  Button,
} from "antd";
import {
  EnvironmentOutlined,
  UserOutlined,
  HomeOutlined,
  PhoneOutlined,
  MailOutlined,
  ClusterOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import AddLocationModal from "./AddLocationModal";
import { useState } from "react";
import EditLocationModal from "./EditLocationModal";
import { useDeleteWarehouseLocation } from "../warehouses.query";
import { message } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { Modal } from "antd";

export default function WarehouseDetails({ data }) {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const { mutate: deleteLocationMutate } = useDeleteWarehouseLocation({
    onSuccess: async () => {
      await queryClient.invalidateQueries(["warehouse", data?.id]);
      message.success("Location deleted successfully");
    },
  });
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const locations = data?.locations || [];

  const capacityInfo = Object.entries(data?.capacity_info || {});
  const handleEditData = (e, data) => {
    e.stopPropagation();
    setEditData(data);
    setIsEditModalOpen(true);
  };

  const handleDeleteLocation = (e, id) => {
    e.stopPropagation();
    Modal.confirm({
      title: "Would you like to deactivate this location?",
      content:
        "The deactivate action will be permanent, and there will be no option to undo or reverse it.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => {
        deleteLocationMutate(id);
      },
    });
  };
  return (
    <div>
      <AddLocationModal
        warehouseId={data?.id}
        open={isModalOpen}
        onClose={handleCloseModal}
      />
      <EditLocationModal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        warehouseId={editData?.id}
        initialData={editData}
      />
      {/* HEADER */}
      <div className="flex items-center gap-4">
        <ClusterOutlined className="text-blue-600 text-4xl" />
        <div>
          <div className="flex gap-2 items-center">
            <h1 className="text-xl font-semibold text-blue-700">
              {data?.name}
            </h1>{" "}
            <Tag
              color={data?.is_active ? "green" : "red"}
              className="px-3 py-1 text-sm"
            >
              {data?.is_active ? "ACTIVE" : "INACTIVE"}
            </Tag>
          </div>
          <p className="text-gray-500">Code: {data?.code}</p>
          <p className="text-gray-500">Description: {data?.description}</p>
        </div>
      </div>

      {/* GENERAL INFO */}
      <Divider orientation="left">General Information</Divider>

      <Descriptions size="small" bordered column={2}>
        <Descriptions.Item label="Contact Person">
          <UserOutlined /> {data?.contact_person}
        </Descriptions.Item>

        <Descriptions.Item label="Phone">
          <PhoneOutlined /> {data?.contact_phone}
        </Descriptions.Item>

        <Descriptions.Item label="Email">
          <MailOutlined /> {data?.contact_email}
        </Descriptions.Item>

        <Descriptions.Item label="Operating Hours">
          🕒 {data?.operating_hours}
        </Descriptions.Item>
      </Descriptions>

      {/* CAPACITY INFO */}
      {capacityInfo?.length !== 0 && (
        <>
          <Divider orientation="left">Capacity Information</Divider>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {capacityInfo?.map(([key, value]) => (
              <ResponsiveCard
                title={key.replace(/_/g, " ").toUpperCase()}
                size="small"
                key={key}
                className="shadow-sm"
              >
                <div>{value}</div>
              </ResponsiveCard>
            ))}
          </div>
        </>
      )}

      {/* LOCATIONS */}
      <Divider orientation="left">Warehouse Locations</Divider>
      <div className="flex justify-end my-4">
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Add Location
        </Button>
      </div>
      {locations.length === 0 && <Empty description="No Locations Found" />}

      {locations.length > 0 && (
        <Collapse size="small" accordion>
          {locations.map((loc) => {
            const features = (() => {
              try {
                return JSON.parse(loc?.special_features || "[]");
              } catch {
                return [];
              }
            })();

            return (
              <Collapse.Panel
                key={loc?.id}
                header={
                  <div className="flex justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <HomeOutlined className="text-blue-600" />
                      <span className="font-medium">{loc?.location_name}</span>
                      {loc?.is_primary && (
                        <Tag color="gold" className="ml-2">
                          Primary
                        </Tag>
                      )}
                      {loc?.is_active ? (
                        <Badge
                          status="success"
                          text="Active"
                          className="ml-3"
                        />
                      ) : (
                        <Badge
                          status="error"
                          text="Inactive"
                          className="ml-3"
                        />
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={(e) => handleEditData(e, loc)}
                        icon={<EditOutlined />}
                        type="primary"
                        size="small"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={(e) => handleDeleteLocation(e, loc?.id)}
                        icon={<DeleteOutlined />}
                        type="primary"
                        danger
                        size="small"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                }
              >
                <Descriptions size="small" bordered column={1}>
                  <Descriptions.Item label="Address">
                    <EnvironmentOutlined /> {loc?.address_line1},{" "}
                    {loc?.address_line2}, {loc?.city}, {loc?.state},{" "}
                    {loc?.country} - {loc?.pincode}
                  </Descriptions.Item>

                  {loc?.landmark && (
                    <Descriptions.Item label="Landmark">
                      {loc?.landmark}
                    </Descriptions.Item>
                  )}

                  {loc?.latitude && loc?.longitude && (
                    <Descriptions.Item label="Coordinates">
                      📍 ({loc?.latitude}, {loc?.longitude})
                    </Descriptions.Item>
                  )}

                  <Descriptions.Item label="Location Type">
                    <Tag color="purple">{loc?.location_type}</Tag>
                  </Descriptions.Item>

                  <Descriptions.Item label="Area Size">
                    {loc?.area_size}
                  </Descriptions.Item>

                  <Descriptions.Item label="Floor Info">
                    {loc?.floor_info}
                  </Descriptions.Item>

                  {features.length > 0 && (
                    <Descriptions.Item label="Special Features">
                      {features.map((f) => (
                        <Tag key={f} color="cyan" className="mb-1">
                          {f}
                        </Tag>
                      ))}
                    </Descriptions.Item>
                  )}
                </Descriptions>
              </Collapse.Panel>
            );
          })}
        </Collapse>
      )}
    </div>
  );
}
