import React, { useState } from "react";
import {
  AiFillAppstore,
  AiTwotoneContainer,
  AiOutlineDesktop,
  AiOutlinePieChart,
} from "react-icons/ai";
import { FaAnglesRight } from "react-icons/fa6";
import { BsChevronDown, BsTools } from "react-icons/bs";
import { IoSettings } from "react-icons/io5";
import { Link } from "@tanstack/react-router";
import { PiKeyReturnFill } from "react-icons/pi";
import { TbTruckDelivery } from "react-icons/tb";
import { GoLaw } from "react-icons/go";
const items = [
  {
    key: "home",
    icon: <AiOutlinePieChart />,
    label: "Home",
    to: "/home",
  },
  {
    key: "dashboard",
    icon: <AiOutlineDesktop />,
    label: "Dashboard",
    to: "/dashboard",
  },
  {
    key: "orders",
    icon: <AiTwotoneContainer />,
    label: "Orders",
    to: "/orders",
  },
  {
    key: "returns",
    label: "Returns",
    icon: <PiKeyReturnFill />,
    children: [
      {
        key: "5",
        label: "Option 5",
      },
      {
        key: "6",
        label: "Option 6",
      },
      {
        key: "7",
        label: "Option 7",
      },
      {
        key: "8",
        label: "Option 8",
      },
    ],
  },
  {
    key: "quick-instant-delivery",
    label: "Quick Instant delivery",
    icon: <TbTruckDelivery />,
    children: [
      {
        key: "add-order",
        label: "Add Order",
        to: "/quick-instant-delivery/add-order",
      },
      {
        key: "all-order",
        label: "All Order",
        to: "/quick-instant-delivery/all-order",
      },
    ],
  },
  {
    key: "weight-management",
    label: "Weight Management",
    icon: <GoLaw />,
    children: [
      {
        key: "13",
        label: "Option 9",
      },
      {
        key: "14",
        label: "Option 10",
      },
    ],
  },
  {
    key: "tools",
    label: "Tools",
    icon: <BsTools />,
    children: [
      {
        key: "/tools/rate-calculator/domestic",
        to: "/tools/rate-calculator/domestic",
        label: "Rate Calculator",
      },
      {
        key: "/tools/rate-card/forward",
        to: "/tools/rate-card/forward",
        label: "Rate card",
      },
      {
        key: "/tools/rate-calculator/international",
        to: "/tools/rate-calculator/international",
        label: "International Rate Calculator",
      },
      {
        key: "/tools/reports/download-reports/instant-reports",
        to: "/tools/reports/download-reports/instant-reports",
        label: "Reports",
        search: {
          dateRange: "last30",
          module: "allModules",
          reportType: "allTypes",
        },
      },
      {
        key: "/tools/activity-logs",
        to: "/tools/activity-logs",
        label: "Activity Logs",
      },
    ],
  },
  {
    key: "settings",
    label: "Settings",
    icon: <IoSettings />,
    to: "/settings/company-details",
  },
];

const Index = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [subMenuOpen, setSubMenuOpen] = useState({});
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const toggleSubMenu = (key) => {
    setSubMenuOpen((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div
      className={`bg-gray-900 text-white h-screen p-5 pt-8 absolute ${collapsed ? "w-20 " : "w-80 "} z-50  overflow-y-auto-auto duration-300`}
      onMouseEnter={() => setCollapsed(false)}
      onMouseLeave={() => setCollapsed(true)}
    >
      <FaAnglesRight
        className={`bg-white text-black border border-blue-500 cursor-pointer text-2xl p-1 rounded-full absolute -right-3 top-9 duration-300 ${!collapsed && "rotate-180"}`}
        onClick={toggleCollapsed}
      />
      <div className="inline-flex">
        <p className={`mr-2 text-2xl cursor-pointer font-bold`}>PP</p>
        <h1
          className={` origin-left text-2xl duration-300 ${collapsed && "scale-0"}`}
        >
          Pocket Parcel
        </h1>
      </div>
      <ul className="pt-2">
        {items.map((item, index) => (
          <div key={index}>
            <Link
              to={item?.to || "#"}
              className={`text-white text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-gray-800 rounded-md my-2`}
              onClick={(e) => {
                if (item.children) {
                  toggleSubMenu(item.key);
                  e.preventDefault(); // Prevent navigation for items with children
                }
              }}
              activeProps={{ className: "bg-gray-800" }}
              search={item?.search}
            >
              <span className="text-2xl block float-left">{item?.icon}</span>
              <span
                className={` text-base font-medium flex-1 duration-200 ${collapsed && "hidden"}`}
              >
                {item?.label}
              </span>
              {item?.children && !collapsed && (
                <BsChevronDown
                  className={`duration-200 ${subMenuOpen[item.key] && "rotate-180"} `}
                  onClick={() => toggleSubMenu(item.key)}
                />
              )}
            </Link>
            {item?.children && !collapsed && subMenuOpen[item.key] && (
              <ul className="duration-300">
                {item?.children.map((subItem) => (
                  <Link
                    to={subItem?.to || "#"}
                    className="text-white text-sm flex items-center gap-x-4 cursor-pointer py-2 ml-10  hover:bg-gray-800 rounded-md"
                    key={subItem.key}
                    activeProps={{ className: "bg-gray-800" }}
                    search={subItem?.search}
                  >
                    {subItem.label}
                  </Link>
                ))}
              </ul>
            )}
          </div>
        ))}
      </ul>
    </div>
  );
};
export default Index;
