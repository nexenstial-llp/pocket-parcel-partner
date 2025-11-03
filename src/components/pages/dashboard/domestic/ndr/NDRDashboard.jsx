import { Table, Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import DefaultExtraContent from "../overview/DefaultExtraContent";

const ndrSummaryStats = [
  { label: "NDR Raised", value: 0 },
  { label: "NDR Raised %", value: "0%" },
  { label: "Action Required", value: 0 },
  { label: "Delivered", value: 0 },
  { label: "Post NDR", value: 0 },
];

// const ndrResponseStats = [
//   { label: "NDR Shipments", value: 0 },
//   { label: "1st NDR Attempt", value: 0 },
//   { label: "1st NDR Delivered", value: 0 },
//   { label: "2nd NDR Attempt", value: 0 },
//   { label: "2nd NDR Delivered", value: 0 },
//   { label: "3rd NDR Attempt", value: 0 },
//   { label: "3rd NDR Delivered", value: 0 },
//   { label: "Total Delivered", value: 0 },
//   { label: "Total RTO", value: 0 },
//   { label: "Lost Damaged", value: 0 },
// ];

const funnelHeaders = [
  "NDR",
  "Zone A",
  "Zone B",
  "Zone C",
  "Zone D",
  "Zone E",
  "Total",
];

const funnelRows = [
  {
    label: "NDR Raised",
    data: Array(funnelHeaders.length - 1).fill(0),
  },
  {
    label: "Pending",
    data: Array(funnelHeaders.length - 1).fill(0),
  },
  {
    label: "Delivered",
    data: Array(funnelHeaders.length - 1).fill(0),
  },
  {
    label: "RTO",
    data: Array(funnelHeaders.length - 1).fill(0),
  },
  {
    label: "Lost/Damaged",
    data: Array(funnelHeaders.length - 1).fill(0),
  },
];

// Table columns for response matrix
const ndrResponseColumns = [
  {
    title: " ",
    dataIndex: "label",
    key: "label",
    align: "left",
    width: 150,
  },
  ...[
    "NDR Shipments",
    "1st NDR Attempt",
    "1st NDR Delivered",
    "2nd NDR Attempt",
    "2nd NDR Delivered",
    "3rd NDR Attempt",
    "3rd NDR Delivered",
    "Total Delivered",
    "Total RTO",
    "Lost Damaged",
  ].map((col) => ({
    title: (
      <span>
        {col}{" "}
        <Tooltip title={col}>
          <InfoCircleOutlined style={{ color: "#888" }} />
        </Tooltip>
      </span>
    ),
    dataIndex: col,
    key: col,
    align: "center",
    width: 100,
  })),
];

const ndrResponseRows = [
  {
    label: "Total NDR Raised",
    ...Object.fromEntries(
      ndrResponseColumns.slice(1).map((col) => [col.dataIndex, 0])
    ),
  },
  {
    label: "Seller Response",
    ...Object.fromEntries(
      ndrResponseColumns.slice(1).map((col) => [col.dataIndex, 0])
    ),
  },
  {
    label: "Seller Positive Response",
    ...Object.fromEntries(
      ndrResponseColumns.slice(1).map((col) => [col.dataIndex, 0])
    ),
  },
  {
    label: "Buyer Response",
    ...Object.fromEntries(
      ndrResponseColumns.slice(1).map((col) => [col.dataIndex, 0])
    ),
  },
  {
    label: "Buyer Positive Response",
    ...Object.fromEntries(
      ndrResponseColumns.slice(1).map((col) => [col.dataIndex, 0])
    ),
  },
];

export default function NDRDashboard() {
  return (
    <div className="flex flex-col gap-4">
      {/* NDR Summary Section */}
      <ResponsiveCard
        title="NDR Summary"
        extra={<DefaultExtraContent />}
        className="dashboard-shadow"
      >
        <div className="flex flex-wrap mt-4 gap-6">
          {ndrSummaryStats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center bg-gray-100 p-2 sm:p-3  rounded-xl"
            >
              <span className="font-bold text-lg">{stat.value}</span>
              <span className="text-sm text-gray-600">{stat.label}</span>
            </div>
          ))}
        </div>
      </ResponsiveCard>
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Another summary card, e.g., Response Summary */}
        <ResponsiveCard
          title="NDR Response Summary"
          extra={<DefaultExtraContent />}
          className="dashboard-shadow"
        >
          <div className="flex flex-wrap mt-4 gap-6 ">
            {ndrSummaryStats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center bg-gray-100 p-2 sm:p-3  rounded-xl"
              >
                <span className="font-bold text-lg">{stat.value}</span>
                <span className="text-sm text-gray-600">{stat.label}</span>
              </div>
            ))}
          </div>
        </ResponsiveCard>
        <ResponsiveCard title="NDR Funnel" className=" flex flex-col">
          <div className="flex flex-wrap mt-4 gap-6">
            {ndrSummaryStats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center bg-gray-100 p-2 sm:p-3  rounded-xl"
              >
                <span className="font-bold text-lg">{stat.value}</span>
                <span className="text-sm text-gray-600">{stat.label}</span>
              </div>
            ))}
          </div>
        </ResponsiveCard>
      </div>
      {/* Charts section (placeholders) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
        <ResponsiveCard title="NDR Reason Split" className="flex flex-col">
          <div className="bg-gray-100 rounded-lg w-full h-72 flex items-center justify-center text-gray-400">
            Chart Placeholder
          </div>
        </ResponsiveCard>
        <ResponsiveCard title="NDR Status Split" className="flex flex-col">
          <div className="bg-gray-100 rounded-lg w-full h-72 flex items-center justify-center text-gray-400">
            Chart Placeholder
          </div>
        </ResponsiveCard>
      </div>
      {/* Funnel Table */}
      <ResponsiveCard title="NDR Funnel Breakdown" className="">
        <div className="overflow-auto">
          <table className="min-w-full text-center border border-gray-200 bg-white">
            <thead>
              <tr>
                {funnelHeaders.map((h) => (
                  <th
                    key={h}
                    className="py-2 px-3 bg-gray-50 border-b border-gray-200 text-xs font-bold"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {funnelRows.map((row) => (
                <tr key={row.label}>
                  <td className="py-2 px-3 border-b border-gray-100 text-left font-semibold">
                    {row.label}
                  </td>
                  {row.data.map((d, i) => (
                    <td key={i} className="py-2 px-3 border-b border-gray-100">
                      {d}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ResponsiveCard>
      {/* NDR Response Matrix Table */}
      <ResponsiveCard title="NDR Response by Attempt" className="">
        <Table
          dataSource={ndrResponseRows}
          columns={ndrResponseColumns}
          pagination={false}
          size="small"
          scroll={{ x: true }}
          rowKey="label"
        />
      </ResponsiveCard>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ResponsiveCard
          title="NDR to Delivery Attempt"
          extra={<DefaultExtraContent />}
        >
          <div className="h-64 flex items-center justify-center text-gray-400 bg-gray-100 rounded-lg">
            Chart Placeholder
          </div>
        </ResponsiveCard>
        <ResponsiveCard title="Seller Response" extra={<DefaultExtraContent />}>
          <div className="h-64 flex items-center justify-center text-gray-400 bg-gray-100 rounded-lg">
            Chart Placeholder
          </div>
        </ResponsiveCard>
        <ResponsiveCard title="Buyer Response" extra={<DefaultExtraContent />}>
          <div className="h-64 flex items-center justify-center text-gray-400 bg-gray-100 rounded-lg">
            Chart Placeholder
          </div>
        </ResponsiveCard>
      </div>

      {/* Success by Courier chart */}
      <ResponsiveCard
        title="Success by Courier"
        extra={<DefaultExtraContent />}
        className=""
      >
        <Table
          size="small"
          bordered
          pagination={false}
          scroll={{ x: "max-content" }}
          columns={[
            { title: "", key: "title", dataIndex: "title" },
            { title: "Total", key: "total", dataIndex: "total" },
            { title: "Zone A", key: "zone_a", dataIndex: "zone_a" },
            { title: "Zone B", key: "zone_b", dataIndex: "zone_b" },
            { title: "Zone C", key: "zone_c", dataIndex: "zone_c" },
            { title: "Zone D", key: "zone_d", dataIndex: "zone_d" },
            { title: "Zone E", key: "zone_e", dataIndex: "zone_e" },
          ]}
          dataSource={[
            {
              title: "NDR Raised",
              total: "",
              zone_a: 0,
              zone_b: 0,
              zone_c: 0,
              zone_d: 0,
              zone_e: 0,
            },
            {
              title: "NDR Delivered",
              total: "",
              zone_a: 0,
              zone_b: 0,
              zone_c: 0,
              zone_d: 0,
              zone_e: 0,
            },
          ]}
        />
      </ResponsiveCard>

      <ResponsiveCard title="NDR Reason" extra={<DefaultExtraContent />}>
        <div className="h-64 flex items-center justify-center text-gray-400 bg-gray-100 rounded-lg">
          Chart Placeholder
        </div>
      </ResponsiveCard>
    </div>
  );
}
