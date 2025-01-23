import { createFileRoute } from "@tanstack/react-router";
import { Tabs, Tooltip } from "antd";
import { BiChevronLeft } from "react-icons/bi";
import { MdQuestionMark } from "react-icons/md";

// Components
import DomesticOrder from "../../components/pages/addOrder/domesticOrder";
export const Route = createFileRoute("/add-orders/")({
  component: RouteComponent,
});

function RouteComponent() {
  const onChange = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: "domestic-order",
      label: (
        <div className="flex gap-4 items-center">
          Domestic Order{" "}
          <Tooltip title="Add & ship your order by adding buyer and package details">
            <div className="bg-gray-400 rounded-full p-1">
              <MdQuestionMark className="text-white" size={10} />
            </div>
          </Tooltip>
        </div>
      ),
      children: <DomesticOrder />,
    },
    {
      key: "international-order",
      label: (
        <div className="flex gap-4 items-center">
          International Order{" "}
          <Tooltip title="Add & ship your international order by adding buyer and package details">
            <div className="bg-gray-400 rounded-full p-1">
              <MdQuestionMark className="text-white" size={10} />
            </div>
          </Tooltip>
        </div>
      ),
      children: <DomesticOrder />,
    },
  ];
  return (
    <div className="m-4">
      <div className="flex gap-1 items-center text-2xl">
        <BiChevronLeft className="text-4xl" /> <h2>Add Order</h2>
      </div>
      <Tabs
        defaultActiveKey="domestic-order"
        items={items}
        className="w-full  "
        onChange={onChange}
      />
    </div>
  );
}
