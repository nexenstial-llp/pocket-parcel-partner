/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu, Layout } from "antd";
import POCKET_PARCEL_DESKTOP from "../../assets/Pocket_parcel_Desktop.svg";
import POCKET_PARCEL_MOBILE from "../../assets/Pocket_parcel_Mobile.png";

//icons
import { AiOutlinePieChart, AiTwotoneContainer } from "react-icons/ai";
import { HiHome } from "react-icons/hi";
import { TbBuildingWarehouse, TbTruckReturn } from "react-icons/tb";
import { DollarCircleOutlined } from "@ant-design/icons";
import { IoSettingsOutline } from "react-icons/io5";

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
    key: "revenue-dashboard",
    icon: <DollarCircleOutlined />,
    label: "Revenue Dashboard",
    children: [
      {
        key: "/revenue-dashboard/my-earnings",
        label: "My Earnings",
        children: [
          {
            key: "/revenue-dashboard/my-earnings/revenue-summary",
            label: (
              <Link to="/revenue-dashboard/my-earnings/revenue-summary">
                Revenue Summary
              </Link>
            ),
          },
          {
            key: "/revenue-dashboard/my-earnings/settlements-and-payouts",
            label: (
              <Link to="/revenue-dashboard/my-earnings/settlements-and-payouts">
                Settlements & Payouts
              </Link>
            ),
          },
        ],
      },
      {
        key: "/revenue-dashboard/reports",
        label: "Reports",
        children: [
          {
            key: "/revenue-dashboard/reports/shipment-revenue",
            label: (
              <Link to="/revenue-dashboard/reports/shipment-revenue">
                Shipment Revenue
              </Link>
            ),
          },
          {
            key: "/revenue-dashboard/reports/commission-breakdown",
            label: (
              <Link to="/revenue-dashboard/reports/commission-breakdown">
                Commission Breakdown
              </Link>
            ),
          },
        ],
      },
      {
        key: "/revenue-dashboard/invoice-and-tax",
        label: (
          <Link to="/revenue-dashboard/invoice-and-tax">Invoices & Tax</Link>
        ),
      },
      {
        key: "/revenue-dashboard/support",
        label: <Link to="/revenue-dashboard/support">Support</Link>,
      },
      {
        key: "/revenue-dashboard/settings",
        label: <Link to="/revenue-dashboard/settings">Settings</Link>,
      },
    ],
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
      {
        key: "/orders/returns",
        label: <Link to="/orders/returns">Returns</Link>,
      },
      {
        key: "/orders/track-order",
        label: <Link to="/orders/track-order">Track Order</Link>,
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
  // {
  //   key: "returns",
  //   icon: <PiKeyReturnFill />,
  //   label: <Link to="/returns">Returns</Link>,
  // },
  // {
  //   key: "quick-instant-delivery",
  //   icon: <TbTruckDelivery />,
  //   label: "Quick Instant delivery",
  //   children: [
  //     {
  //       key: "/quick-instant-delivery/add-order",
  //       label: <Link to="/quick-instant-delivery/add-order">Add Order</Link>,
  //     },
  //     {
  //       key: "/quick-instant-delivery/all-order",
  //       label: <Link to="/quick-instant-delivery/all-order">All Order</Link>,
  //     },
  //   ],
  // },
  // {
  //   key: "weight-management",
  //   icon: <GoLaw />,
  //   label: <Link to={"/weight-management"}>Weight Management</Link>,
  // },
  // {
  //   key: "tools",
  //   icon: <BsTools />,
  //   label: "Tools",
  //   children: [
  //     {
  //       key: "/tools/rate-calculator/domestic",
  //       label: (
  //         <Link to="/tools/rate-calculator/domestic">Rate Calculator</Link>
  //       ),
  //     },
  //     {
  //       key: "/tools/rate-card/forward",
  //       label: <Link to="/tools/rate-card/forward">Rate card</Link>,
  //     },
  //     {
  //       key: "/tools/rate-calculator/international",
  //       label: (
  //         <Link to="/tools/rate-calculator/international">
  //           International Rate Calculator
  //         </Link>
  //       ),
  //     },
  //     {
  //       key: "/tools/reports/download-reports/instant-reports",
  //       label: (
  //         <Link to="/tools/reports/download-reports/instant-reports">
  //           Reports
  //         </Link>
  //       ),
  //     },
  //     {
  //       key: "/tools/activity-logs",
  //       label: <Link to="/tools/activity-logs">Activity Logs</Link>,
  //     },
  //   ],
  // },
  {
    key: "settings",
    icon: <IoSettingsOutline />,
    label: <Link to="/settings/company-details">Settings</Link>,
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
          if (child.children) {
            child.children.forEach((grandChild) => {
              allChildren.push({
                child: grandChild,
                parent: child,
                grandParent: item,
              });
            });
          }
          allChildren.push({ child, parent: item, grandParent: null });
        });
      }
    });

    // Sort children by key length descending for longest prefix match
    allChildren.sort((a, b) => b.child.key.length - a.child.key.length);

    // Find the child with the longest matching prefix
    for (const { child, parent, grandParent } of allChildren) {
      if (pathname.startsWith(child.key)) {
        let openKeys = [parent?.key, grandParent?.key].filter(Boolean);
        return { selectedKey: child.key, openKey: parent?.key, openKeys };
      }
    }

    // Fallback to parent menu direct match
    for (const item of sidebarData) {
      if (pathname.startsWith(`/${item.key}`)) {
        return { selectedKey: item.key, openKey: null, openKeys: [] };
      }
    }
    return { selectedKey: "", openKey: "", openKeys: [] };
  };
  const { selectedKey, openKeys: activeOpenKeys } = findActiveKey(
    location.pathname
  );
  const [openKeys, setOpenKeys] = useState(activeOpenKeys);
  const [storedOpenKeys, setStoredOpenKeys] = useState(activeOpenKeys);

  const onOpenChange = (keys) => {
    setOpenKeys(keys); // ✅ correct way
    setStoredOpenKeys(keys); // store open keys so they can be restored later
  };

  // ✅ Sync open keys when sidebar expands/collapses
  useEffect(() => {
    if (collapsed) {
      // close all menus when collapsed
      setOpenKeys([]);
    } else {
      // restore previously opened keys when uncollapsed
      setOpenKeys(storedOpenKeys.length ? storedOpenKeys : activeOpenKeys);
    }
  }, [collapsed]); // only track collapse state
  // ✅ Also track route changes
  useEffect(() => {
    setOpenKeys(activeOpenKeys);
    setStoredOpenKeys(activeOpenKeys);
  }, [location.pathname]);

  return (
    <div className="z-[100]  shadow-[2px_0px_10px_0px_#a0aec0]">
      <Sider
        collapsed={collapsed}
        onCollapse={setCollapsed}
        collapsible
        width={240}
        className="custom-scrollbar sidebar-container transition-all ease-in-out duration-300"
        // theme="light"
      >
        {/* 🔹 Fixed Header */}
        {/* <div className="h-16 sticky top-0 z-10 mb-2 flex items-center justify-center bg-[#001529] text-white font-bold text-xl border-b border-gray-700">
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
        </div> */}
        <div className="h-16 sticky top-0 z-10 mb-2 flex items-center justify-center bg-white ">
          <Link to="/home" className="flex items-center justify-center w-full">
            {!collapsed ? (
              <img
                src={POCKET_PARCEL_DESKTOP}
                alt="Pocket Parcel Desktop Logo"
                className="max-w-[80px] h-auto object-contain"
              />
            ) : (
              <img
                src={POCKET_PARCEL_MOBILE}
                alt="Pocket Parcel Mobile Logo"
                className="max-w-[40px] h-auto object-contain"
              />
            )}
          </Link>
        </div>

        <div
          style={{
            overflowY: "auto",
            // overflowX: "hidden",
            // position: "fixed",
            maxHeight: "calc(100vh - 153px)",
            minHeight: "calc(100vh - 153px)",
            top: 0,
            bottom: 0,
            // scrollbarWidth: "thin",
          }}
          className="custom-scrollbar flex flex-col"
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
