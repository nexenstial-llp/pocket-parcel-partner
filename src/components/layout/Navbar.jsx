/* eslint-disable react/prop-types */
import { FaWallet } from "react-icons/fa";
import { IoReload } from "react-icons/io5";
import { IoIosNotifications } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { Avatar, Button, Dropdown } from "antd";
import { DownOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Space } from "antd";
import { Link } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth/useAuth";
import POCKET_PARCEL_MOBILE from "../../assets/Pocket_Parcel_Mobile.png";
const items = [
  {
    key: "/access-control/users",
    label: <Link to="/access-control/users">Manage Users</Link>,
  },
  {
    key: "/profile",
    label: <Link to="/profile">My Profile</Link>,
  },
  {
    key: "logout",
    label: "Logout",
  },
];

const Navbar = ({ setDrawerVisible, isMobile }) => {
  const auth = useAuth();
  const user = auth.user;
  const onClick = ({ key }) => {
    if (key === "logout") {
      auth.logout();
      return;
    }
  };

  return (
    <nav className="bg-white text-indigo-600 p-2 md:p-4 shadow-md border-b border-[#cdd0d4]">
      <div className=" mx-auto flex justify-between items-center ">
        <div className=" ">
          <Link to="/home">
            {isMobile && (
              <img
                src={POCKET_PARCEL_MOBILE}
                alt="Logo"
                className="max-w-12 h-auto object-contain"
              />
            )}
          </Link>
        </div>

        <div className=" flex gap-2 items-center ml-auto">
          <div className="px-3 text-gray-600 flex items-center gap-1">
            <FaWallet /> ₹100 <IoReload />
          </div>
          <div className={`pr-2 ${isMobile && "hidden"}`}>
            <Button type="primary">Recharge Wallet</Button>
          </div>
          <div className={`pr-2`}>
            <Button icon={<IoIosNotifications size={25} />} type="text" />
          </div>
          <div className={`${isMobile && "hidden"} cursor-pointer`}>
            <Dropdown trigger={"click"} menu={{ items, onClick }}>
              <Space className="">
                <Avatar icon={<FaUser />} />{" "}
                <p className="truncate capitalize max-w-[100px]">
                  {user?.full_name || ""}
                </p>
                <DownOutlined />
              </Space>
            </Dropdown>
          </div>
          {/* Hamburger only on mobile */}
          {isMobile && (
            <Button
              type="text"
              aria-label="Open navigation"
              onClick={() => setDrawerVisible(true)}
              icon={<MenuFoldOutlined style={{ fontSize: 18 }} />}
            />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
