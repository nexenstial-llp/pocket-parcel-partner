import { useState } from "react";
import { Table, Button, Tag, Drawer } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import RackForm from "./RackForm.jsx";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard.jsx";
import { MdModeEditOutline } from "react-icons/md";

export default function RackList() {
  const [racks, setRacks] = useState([]);
  const [open, setOpen] = useState(false);

  const handleAdd = (values) => {
    setRacks((prev) => [...prev, { id: Date.now(), ...values }]);
    setOpen(false);
  };

  const columns = [
    {
      title: "S. No.",
      width: 80,
      render: (_, __, index) => index + 1,
    },
    { title: "Name", dataIndex: "name" },
    { title: "Type", dataIndex: "type" },
    { title: "Warehouse", dataIndex: "warehouse" },
    {
      title: "Area (sqft)",
      dataIndex: "area",
      render: (a) => `${a} sqft`,
    },
    {
      title: "Status",
      dataIndex: "active",
      render: (status) => (
        <Tag color={status ? "green" : "red"}>
          {status ? "Active" : "Inactive"}
        </Tag>
      ),
    },
    { title: "Notes", dataIndex: "notes" },
    {
      title: "Actions",
      render: (_, record) => (
        <div className="flex gap-2">
          <Button
            size="small"
            onClick={() => console.log(record?.key)}
            icon={<MdModeEditOutline />}
            type="primary"
          />
          <Button
            size="small"
            onClick={() => console.log(record?.key)}
            icon={<DeleteOutlined />}
            danger
          />
        </div>
      ),
    },
  ];

  return (
    <ResponsiveCard
      title="Rack List"
      extra={
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setOpen(true)}
        >
          Add Rack
        </Button>
      }
    >
      <Table
        size="small"
        columns={columns}
        dataSource={racks}
        rowKey="id"
        bordered
      />

      <Drawer
        title="Add New Rack"
        open={open}
        onClose={() => setOpen(false)}
        width={"50%"}
      >
        <RackForm onFinish={handleAdd} />
      </Drawer>
    </ResponsiveCard>
  );
}
