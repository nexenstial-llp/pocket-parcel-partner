/* eslint-disable react/prop-types */
// src/components/Sidebar.jsx
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu, Layout } from "antd";

//icons
import {
  AiOutlinePieChart,
  AiOutlineTeam,
  AiTwotoneContainer,
} from "react-icons/ai";
import { HiHome } from "react-icons/hi";
import { BsTools } from "react-icons/bs";
import { PiKeyReturnFill } from "react-icons/pi";
import {
  TbBuildingWarehouse,
  TbTruckDelivery,
  TbTruckReturn,
} from "react-icons/tb";
import { GoLaw } from "react-icons/go";
// import { FaAnglesRight } from "react-icons/fa6";

const { Sider } = Layout;
const sidebarData = [
  {
    key: "home",
    icon: <HiHome />,
    label: <Link to="/home">Home</Link>,
  },
  {
    key: "dashboard",
    icon: <AiOutlinePieChart />,
    label: <Link to="/dashboard/domestic/overview">Dashboard</Link>,
  },
  {
    key: "orders",
    icon: <AiTwotoneContainer />,
    label: "Orders",
    children: [
      {
        key: "/orders",
        label: <Link to="/orders">Orders</Link>,
      },
      {
        key: "/orders/create",
        label: <Link to="/orders/create">Create Order</Link>,
      },
    ],
  },
  {
    key: "ndr",
    label: "NDR",
    icon: <TbTruckReturn />,
    children: [
      {
        key: "/ndr/cases",
        label: <Link to="/ndr/cases">Cases</Link>,
      },
      {
        key: "/ndr/reports",
        label: <Link to="/ndr/reports">Reports</Link>,
      },
    ],
  },
  {
    key: "warehouse",
    icon: <TbBuildingWarehouse />,
    label: "Warehouse",
    children: [
      {
        key: "/warehouse/list",
        label: <Link to="/warehouse/list">List</Link>,
      },
      {
        key: "/warehouse/create",
        label: <Link to="/warehouse/create">Create</Link>,
      },
    ],
  },
  {
    key: "returns",
    icon: <PiKeyReturnFill />,
    label: <Link to="/returns">Returns</Link>,
  },
  {
    key: "quick-instant-delivery",
    icon: <TbTruckDelivery />,
    label: "Quick Instant delivery",
    children: [
      {
        key: "/quick-instant-delivery/add-order",
        label: <Link to="/quick-instant-delivery/add-order">Add Order</Link>,
      },
      {
        key: "/quick-instant-delivery/all-order",
        label: <Link to="/quick-instant-delivery/all-order">All Order</Link>,
      },
    ],
  },
  {
    key: "weight-management",
    icon: <GoLaw />,
    label: <Link to={"/weight-management"}>Weight Management</Link>,
  },
  {
    key: "tools",
    icon: <BsTools />,
    label: "Tools",
    children: [
      {
        key: "/tools/rate-calculator/domestic",
        label: (
          <Link to="/tools/rate-calculator/domestic">Rate Calculator</Link>
        ),
      },
      {
        key: "/tools/rate-card/forward",
        label: <Link to="/tools/rate-card/forward">Rate card</Link>,
      },
      {
        key: "/tools/rate-calculator/international",
        label: (
          <Link to="/tools/rate-calculator/international">
            International Rate Calculator
          </Link>
        ),
      },
      {
        key: "/tools/reports/download-reports/instant-reports",
        label: (
          <Link to="/tools/reports/download-reports/instant-reports">
            Reports
          </Link>
        ),
      },
      {
        key: "/tools/activity-logs",
        label: <Link to="/tools/activity-logs">Activity Logs</Link>,
      },
    ],
  },
  {
    key: "settings",
    icon: <AiOutlineTeam />,
    label: <Link to="/settings">Settings</Link>,
  },
];

const Sidebar = ({ collapsed, setCollapsed }) => {
  const location = useLocation();

  const findActiveKey = (pathname) => {
    // Flatten all sidebar children with their parent key
    const allChildren = [];
    sidebarData.forEach((item) => {
      if (item.children) {
        item.children.forEach((child) => {
          allChildren.push({ child, parent: item });
        });
      }
    });

    // Sort children by key length descending for longest prefix match
    allChildren.sort((a, b) => b.child.key.length - a.child.key.length);

    // Find the child with the longest matching prefix
    for (const { child, parent } of allChildren) {
      if (pathname.startsWith(child.key)) {
        return { selectedKey: child.key, openKey: parent.key };
      }
    }

    // Fallback to parent menu direct match
    for (const item of sidebarData) {
      if (pathname.startsWith(`/${item.key}`)) {
        return { selectedKey: item.key, openKey: null };
      }
    }
    return { selectedKey: "", openKey: "" };
  };

  const { selectedKey, openKey: activeOpenKey } = findActiveKey(
    location.pathname
  );
  const [openKeys, setOpenKeys] = useState(
    activeOpenKey ? [activeOpenKey] : []
  );

  useEffect(() => {
    if (!collapsed && activeOpenKey) {
      setOpenKeys([activeOpenKey]);
    }
  }, [activeOpenKey, collapsed]);

  const onOpenChange = (keys) => {
    setOpenKeys(keys);
  };
  return (
    <div className="z-[100]">
      <Sider
        style={{
          // overflowY: "auto",
          // overflowX: "hidden",
          // position: "fixed",
          // maxHeight: "100vh",
          // minHeight: "100vh",
          // top: 0,
          // bottom: 0,
          // scrollbarWidth: "thin",
          background: "#001529",
        }}
        collapsed={collapsed}
        onCollapse={setCollapsed}
        width={240}
        className="custom-scrollbar transition-all ease-in-out duration-300 "
        onMouseEnter={() => setCollapsed(false)}
        onMouseLeave={() => setCollapsed(true)}
      >
        {/* 🔹 Fixed Header */}
        <div className="h-16 sticky top-0 z-10 mb-2 flex items-center justify-center bg-[#001529] text-white font-bold text-xl border-b border-gray-700">
          <Link to="/home" className="w-full text-center relative ">
            <span
              className={`text-white absolute inset-0 flex justify-center items-center transition-all duration-300 ease-in-out ${
                collapsed ? "opacity-0 scale-0" : "opacity-100 scale-100"
              }`}
            >
              Pocket Parcel
            </span>
            <span
              className={`text-white absolute inset-0 flex justify-center items-center transition-all duration-300 ease-in-out ${
                collapsed ? "opacity-100 scale-100" : "opacity-0 scale-0"
              }`}
            >
              PP
            </span>
          </Link>
        </div>
        <div
          style={{
            overflowY: "auto",
            // overflowX: "hidden",
            // position: "fixed",
            maxHeight: "calc(100vh - 73px)",
            minHeight: "calc(100vh - 73px)",
            top: 0,
            bottom: 0,
            // scrollbarWidth: "thin",
          }}
          className="flex justify-center custom-scrollbar"
        >
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[selectedKey]}
            openKeys={collapsed ? undefined : openKeys} // <-- Use 'undefined' when collapsed
            onOpenChange={onOpenChange}
            items={sidebarData}
          />
        </div>
      </Sider>
      {/* Toggle button outside sidebar */}

      {/* <FaAnglesRight
        style={{
          position: "fixed",
          top: 22,
          left: collapsed ? 80 : 240,
          transitionDelay: "130ms",
          animationDelay: "130ms",
        }}
        className={`bg-white text-[#001529] border border-[#001529] cursor-pointer text-xl 2xl:text-2xl p-1 rounded-full duration-300 ${
          collapsed ? "-right-10" : "rotate-180 -right-10"
        }`}
        onClick={() => setCollapsed(!collapsed)}
      /> */}
    </div>
  );
};

export default React.memo(Sidebar);
