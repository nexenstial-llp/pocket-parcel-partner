import { useState } from "react";
import { Button, Divider, Drawer, Modal } from "antd";
import { TbShieldCheck } from "react-icons/tb";
import { ENTERPRISE_ROLES } from "@/constants/roles";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import { DeleteFilled, EyeFilled, PlusOutlined } from "@ant-design/icons";
import { Link } from "@tanstack/react-router";
const ManageRolesDrawer = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const handleDelete = (id) => {
    console.log(id);
    Modal.confirm({
      title: "Would you like to delete Test?",
      content:
        "The delete action will be permanent, and there will be no option to undo or reverse it.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => {
        console.log("deleted");
      },
    });
  };
  return (
    <>
      <Button onClick={showDrawer} icon={<TbShieldCheck />}>
        Manage Roles
      </Button>
      <Drawer
        title="Manage roles"
        closable={{ "aria-label": "Close Button" }}
        onClose={onClose}
        open={open}
        footer={
          <Link to="/access-control/roles/create">
            <Button className="w-full" type="primary" icon={<PlusOutlined />}>
              Create New Role
            </Button>
          </Link>
        }
      >
        <p>
          Role is defined as a set of section level accesses defined to allow
          the underlying users to access the dashboard in the expected manner
        </p>
        <Divider />
        <div className="flex flex-col gap-2">
          {ENTERPRISE_ROLES?.result?.data?.length > 0 &&
            ENTERPRISE_ROLES?.result?.data?.map((role, index) => (
              <ResponsiveCard size="small" key={index}>
                <div className="flex justify-between">
                  <div className="">
                    <p>{role.groupName}</p>
                    <p>{role.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="small"
                      danger
                      title="Delete"
                      icon={<DeleteFilled />}
                      onClick={() => handleDelete(role.id)}
                    />
                    <Button size="small" title="View" icon={<EyeFilled />} />
                  </div>
                </div>
              </ResponsiveCard>
            ))}
        </div>
      </Drawer>
    </>
  );
};
export default ManageRolesDrawer;
