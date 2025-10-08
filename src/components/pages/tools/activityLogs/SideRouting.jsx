import { Link, useSearch } from "@tanstack/react-router";
import React from "react";
import { Route } from "@/routes/_authenticated/tools/activity-logs";
const menuItems = [
  {
    title: "ORDERS",
    items: [
      "Bulk Order Import",
      "Bulk Courier Assign",
      "Bulk Courier Reassign",
      "Bulk Pickup Schedule",
      "Bulk Invoice Download",
      "Bulk Label Download",
      "Bulk LM Label Download (International)",
      "Bulk Manifest Download",
      "Bulk NDR Escalation",
      "Bulk Weight Discrepancy",
      "Bulk Order Data Download",
      "Bulk Return",
      "Bulk Exchange",
      "Channel Synced Orders",
      "Weight Insights Update",
    ],
  },
  {
    title: "CATALOG",
    items: [
      "Channel Catalog Import",
      "Master Catalog Import",
      "ONDC Catalog Import",
      "ONDC Catalog Download",
    ],
  },
];
const menuItems1 = [
  {
    title: "ORDERS",
    items: [
      { key: "bulk-order-import", label: "Bulk Order Import" },
      { key: "bulk-courier-assign", label: "Bulk Courier Assign" },
      { key: "bulk-courier-reassign", label: "Bulk Courier Reassign" },
      { key: "bulk-pickup-schedule", label: "Bulk Pickup Schedule" },
      { key: "bulk-invoice-download", label: "Bulk Invoice Download" },
      { key: "bulk-label-download", label: "Bulk Label Download" },
      {
        key: "bulk-lm-label-download-international",
        label: "Bulk LM Label Download (International)",
      },
      { key: "bulk-manifest-download", label: "Bulk Manifest Download" },
      { key: "bulk-ndr-escalation", label: "Bulk NDR Escalation" },
      { key: "bulk-weight-discrepancy", label: "Bulk Weight Discrepancy" },
      { key: "bulk-order-data-download", label: "Bulk Order Data Download" },
      { key: "bulk-return", label: "Bulk Return" },
      { key: "bulk-exchange", label: "Bulk Exchange" },
      { key: "channel-synced-orders", label: "Channel Synced Orders" },
      { key: "weight-insights-update", label: "Weight Insights Update" },
    ],
  },
  {
    title: "CATALOG",
    items: [
      { key: "channel-catalog-import", label: "Channel Catalog Import" },
      { key: "master-catalog-import", label: "Master Catalog Import" },
      { key: "ondc-catalog-import", label: "ONDC Catalog Import" },
      { key: "ondc-catalog-download", label: "ONDC Catalog Download" },
    ],
  },
];

const SideRouting = () => {
  const search = useSearch({ from: Route.fullPath });
  console.log("search", search);
  return (
    <div
      style={{ scrollbarWidth: "thin" }}
      className="w-64 h-screen bg-white border-r border-gray-200 overflow-y-auto"
    >
      <div className="p-4">
        {menuItems1.map((section, index) => (
          <div key={index} className="mb-6">
            <h2 className="text-sm font-semibold text-gray-500 mb-2">
              {section.title}
            </h2>
            <ul>
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <Link
                    search={{ type: item.key }}
                    className={`block px-4 py-2 text-sm rounded-lg transition-colors ${search.type === item.key ? "text-purple-600 bg-purple-50" : "text-gray-700"}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideRouting;
