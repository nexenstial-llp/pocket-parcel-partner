/* eslint-disable react/prop-types */
import { Avatar, Tag, Button, Descriptions } from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import UpdateProfileModal from "./UpdateProfileModal";
import { FaLocationDot } from "react-icons/fa6";
import { FaCity } from "react-icons/fa";
import { TbLockPassword, TbMap, TbMapPinCode } from "react-icons/tb";
import { MdDateRange } from "react-icons/md";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import { Suspense, lazy } from "react";
import { Modal } from "antd";
import { useDeleteUser } from "@/features/users/users.query";
import { useNavigate } from "@tanstack/react-router";
// remove direct import of ChangePasswordModal
const ChangePasswordModal = lazy(() => import("./ChangePasswordModal"));

const UserProfileCard = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const navigate = useNavigate();

  // Delete user query
  const { mutate: deleteUser, isPending: isDeletePending } = useDeleteUser({
    onSuccess: () => {
      localStorage.removeItem("auth-token");
      navigate({ to: "/auth/login" });
    },
  });

  const handleEdit = () => setOpen(true);
  const handleChangePassword = () => setChangePasswordOpen(true);

  const handleDelete = () => {
    Modal.confirm({
      title: "Would you like to delete your account?",
      content:
        "The delete action will be permanent, and there will be no option to undo or reverse it.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => {
        console.log("deleted");
        deleteUser();
      },
    });
  };

  if (!data) return null;
  const {
    full_name,
    email,
    country_code,
    phone_number,
    city,
    address,
    state,
    pincode,
    role,
    status,
    is_verified,
    created_at,
  } = data;

  const phoneDisplay =
    country_code && phone_number
      ? `+${country_code} ${phone_number}`
      : phone_number || "-";

  const joinedDate = created_at
    ? new Date(created_at).toLocaleDateString()
    : "-";

  const statusColor = status === "ACTIVE" ? "success" : "default";
  const verifyColor = is_verified ? "success" : "warning";

  return (
    <div className="max-w-xl mx-auto p-4">
      {open && (
        <UpdateProfileModal visible={open} onClose={() => setOpen(false)} />
      )}
      {changePasswordOpen && (
        <Suspense fallback={<div className="p-4">Loading…</div>}>
          <ChangePasswordModal
            open={changePasswordOpen}
            onClose={() => setChangePasswordOpen(false)}
          />
        </Suspense>
      )}
      <ResponsiveCard
        styles={{
          actions: {},
        }}
        actions={[
          <Button
            icon={<TbLockPassword />}
            type="primary"
            key={"change-password"}
            onClick={handleChangePassword}
          >
            Change Password
          </Button>,
          <Button
            key={"edit"}
            type="primary"
            icon={<EditOutlined />}
            onClick={handleEdit}
            className="w-full"
          >
            Edit
          </Button>,
          <Button
            key={"delete"}
            type="primary"
            icon={<DeleteOutlined />}
            danger
            onClick={handleDelete}
            loading={isDeletePending}
            disabled={isDeletePending}
          >
            Delete My Account
          </Button>,
        ]}
        className="shadow-sm rounded-xl border border-slate-200"
        title={
          <div className="flex items-center gap-3 py-4">
            <Avatar size={48} icon={<UserOutlined />} />
            <div>
              <p className="text-base font-semibold text-slate-800">
                {full_name || "Unnamed User"}
              </p>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <Tag color={statusColor}>{status || "UNKNOWN"}</Tag>
                <Tag color={verifyColor}>
                  {is_verified ? "Verified" : "Not Verified"}
                </Tag>
                {role && (
                  <Tag color="blue">
                    {role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()}
                  </Tag>
                )}
              </div>
            </div>
          </div>
        }
      >
        <Descriptions
          size="small"
          column={1}
          colon={false}
          bordered
          styles={{
            label: {
              ontWeight: 500,
              color: "#64748b",
            },
            content: {
              color: "#0f172a",
            },
          }}
        >
          <Descriptions.Item label="Email">
            <div className="flex items-center gap-2">
              <MailOutlined />
              <span>{email || "-"}</span>
            </div>
          </Descriptions.Item>

          <Descriptions.Item label="Phone">
            <div className="flex items-center gap-2">
              <PhoneOutlined />
              <span>{phoneDisplay}</span>
            </div>
          </Descriptions.Item>
          <Descriptions.Item label="Address">
            <div className="flex items-center gap-2">
              <FaLocationDot />
              <span>{address || "-"}</span>
            </div>
          </Descriptions.Item>
          <Descriptions.Item label="State">
            <div className="flex items-center gap-2">
              <TbMap />
              <span>{state || "-"}</span>
            </div>
          </Descriptions.Item>
          <Descriptions.Item label="City">
            <div className="flex items-center gap-2">
              <FaCity />
              <span>{city || "-"}</span>
            </div>
          </Descriptions.Item>
          <Descriptions.Item label="Pincode">
            <div className="flex items-center gap-2">
              <TbMapPinCode />
              <span>{pincode || "-"}</span>
            </div>
          </Descriptions.Item>

          <Descriptions.Item label="Joined">
            <div className="flex items-center gap-2">
              <MdDateRange />
              <span>{joinedDate || "-"}</span>
            </div>
          </Descriptions.Item>
        </Descriptions>
      </ResponsiveCard>
    </div>
  );
};

export default UserProfileCard;
