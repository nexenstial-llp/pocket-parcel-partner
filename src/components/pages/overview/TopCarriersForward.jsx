import { Table, Tooltip } from "antd";
import { FaInfoCircle } from "react-icons/fa";
const columns = [
  {
    title: "Carrier",
    dataIndex: "carrier",
    key: "carrier",
  },
  {
    title: "Delivered Shipments",
    dataIndex: "delivered_shipments",
    key: "delivered_shipments",
  },
  {
    title: (
      <div className="flex gap-1 items-baseline">
        RTO %{" "}
        <Tooltip
          title={
            "Percentage of RTOs initiated against total shipments dispatched"
          }
        >
          <FaInfoCircle size={10} />
        </Tooltip>
      </div>
    ),
    dataIndex: "rto",
    key: "rto",
  },
  {
    title: (
      <div className="flex gap-1 items-baseline">
        Average Delivery TAT %{" "}
        <Tooltip title={"Average time between order pickup and delivery"}>
          <FaInfoCircle size={10} />
        </Tooltip>
      </div>
    ),
    dataIndex: "avg_tat",
    key: "avg_tat",
  },
  {
    title: (
      <div className="flex gap-1 items-baseline">
        Avg pickup to OFD{" "}
        <Tooltip
          title={
            "Average time between order pickup and first out for delivery attempt"
          }
        >
          <FaInfoCircle size={10} />
        </Tooltip>
      </div>
    ),
    dataIndex: "avg_tat",
    key: "avg_tat",
  },
];

const TopCarriersForward = () => {
  return (
    <div>
      <Table
        size="small"
        bordered
        dataSource={[]}
        columns={columns}
        summary={() => {
          return (
            <Table.Summary.Row>
              <Table.Summary.Cell index={0}>Total</Table.Summary.Cell>
              <Table.Summary.Cell index={1}>0</Table.Summary.Cell>
              <Table.Summary.Cell index={2}>0 hr</Table.Summary.Cell>
              <Table.Summary.Cell index={3}>0 hr</Table.Summary.Cell>
              <Table.Summary.Cell index={4}>0 hr</Table.Summary.Cell>
            </Table.Summary.Row>
          );
        }}
      />
    </div>
  );
};

export default TopCarriersForward;
