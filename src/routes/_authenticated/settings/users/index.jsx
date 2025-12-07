import { createFileRoute } from "@tanstack/react-router";
import { Button, Table } from "antd";
import { MdOutlineCreate } from "react-icons/md";
// Components
import { useState } from "react";
import UserModal from "@/components/pages/settings/users/modal/UserModal";
const columns = [
  {
    title: "Name",
    dataIndex: "full_name",
    key: "full_name",
  },
  {
    title: "Created On",
    dataIndex: "created_on",
    key: "created_on",
  },
  {
    title: "Role Type",
    dataIndex: "user_role",
    key: "user_role",
  },
  {
    title: "Status",
    render: (_, record) => {
      return (
        <div
          key={Date.now()}
          className="bg-green-500 text-center text-white w-24 font-bold p-1 rounded-full"
        >
          <p>{record?.status}</p>
        </div>
      );
    },
  },
  {
    render: () => (
      <Button type="default" key={Date.now()} icon={<MdOutlineCreate />}>
        Edit{" "}
      </Button>
    ),
  },
];
export const Route = createFileRoute("/_authenticated/settings/users/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [data, setData] = useState([]);
  return (
    <div>
      <div className="flex justify-between items-center pb-4 border-b border-gray-200 gap-2">
        <div className="">
          <h2>Users</h2>
          <p>Add users to your account</p>
        </div>
        <UserModal data={data} setData={setData} />
      </div>
      <Table dataSource={data} columns={columns} rowKey={"full_namex"} />
    </div>
  );
}
