/* eslint-disable react/prop-types */
import { FaWallet } from "react-icons/fa";
import { IoReload } from "react-icons/io5";
import { IoIosNotifications } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { Avatar, Dropdown, message } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Space } from "antd";
const items = [
  {
    key: "1",
    label: "Profile",
  },
  {
    key: "2",
    label: "Logout",
  },
];

// const quickActionsData = [
//   {
//     icon: <FaBoxOpen size={40} />,
//     text: "Add an Order",
//     navigateTo: "/add-orders",
//   },
//   {
//     icon: <LiaShippingFastSolid size={40} />,
//     text: "Create a Quick Shipment",
//     navigateTo: "/add-orders",
//   },
//   {
//     icon: <FaCalculator size={40} />,
//     text: "Rate Calculator",
//     navigateTo: "/add-orders",
//   },
//   {
//     icon: <BsTicketFill size={40} />,
//     text: "Create a Ticket",
//     navigateTo: "/add-orders",
//   },
//   {
//     icon: <FaMapLocationDot size={40} />,
//     text: "Track Shipment",
//     navigateTo: "/add-orders",
//   },
// ];
const Navbar = ({ auth }) => {
  const onClick = ({ key }) => {
    if (key === "2") {
      message.success("Logout Successfully");
      auth.logout();
      return;
    }
    message.success(`Click on item ${key}`);
  };

  return (
    <nav className="bg-white text-indigo-600 p-4 shadow-md border-b border-[#cdd0d4]">
      <div className="container mx-auto flex justify-between items-center ">
        <div className="flex divide-x-2 items-center space-x-4 ml-auto">
          {/* <div className="px-3 relative group ">
            <button className="flex gap-1 items-center ">
              <BsFillLightningChargeFill />
              Quick Actions
            </button>
            <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-fit bg-white rounded-md shadow-lg p-5 z-20 hidden group-hover:block">
              <div className="flex gap-2">
                {quickActionsData?.map((item) => (
                  <div key={item.text}>
                    <QuickActions
                      icon={item?.icon}
                      text={item?.text}
                      navigateTo={item?.navigateTo}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div> */}
          <div className="px-3 text-gray-600  flex items-center gap-1">
            <FaWallet /> ₹100
            <IoReload />
          </div>
          <a href="#" className="px-3 bg-gray-100 py-1 rounded-md">
            Recharge Wallet
          </a>
          <button className="px-3 text-gray-600">
            <IoIosNotifications size={25} />
          </button>
          <button className=" px-3">All Products</button>

          <Dropdown menu={{ items, onClick }}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <Avatar icon={<FaUser />} />
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
