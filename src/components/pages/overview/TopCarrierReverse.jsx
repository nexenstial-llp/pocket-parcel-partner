import { Table } from "antd";
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
    title: "Average Delivery TAT %",
    dataIndex: "avg_tat",
    key: "avg_tat",
  },
];

const TopCarrierReverse = () => {
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
            </Table.Summary.Row>
          );
        }}
      />
    </div>
  );
};

export default TopCarrierReverse;
