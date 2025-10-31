import { Row, Col, Table, Tooltip } from "antd";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import { InfoCircleOutlined } from "@ant-design/icons";

const OrderDelaysDashboard = () => {
  // Summary stats data
  const summaryStats = [
    { title: "Misrouted Shipments", value: 0 },
    { title: "ODA Shipments", value: 0 },
    { title: "Lost Shipments", value: 0 },
    { title: "Damaged Shipments", value: 0 },
    { title: "Destroyed Shipments", value: 0 },
  ];

  // NDR to Reattempt Delays data
  const ndrData = [
    { attempt: "First NDR Attempt", day1: 0, day2: 0, day3: 0, day3Plus: 0 },
    { attempt: "Second NDR Attempt", day1: 0, day2: 0, day3: 0, day3Plus: 0 },
    { attempt: "Third NDR Attempt", day1: 0, day2: 0, day3: 0, day3Plus: 0 },
  ];

  // Zone delay data
  const zoneData = [
    {
      zone: "Zone A",
      sla: "Air - 2 Days, Surface - 2 Days",
      day1: 0,
      day2: 0,
      day2Plus: 0,
    },
    {
      zone: "Zone B",
      sla: "Air - 3 Days, Surface - 3 Days",
      day1: 0,
      day2: 0,
      day2Plus: 0,
    },
    {
      zone: "Zone C",
      sla: "Air - 3 Days, Surface - 5 Days",
      day1: 0,
      day2: 0,
      day2Plus: 0,
    },
    {
      zone: "Zone D",
      sla: "Air - 5 Days, Surface - 7 Days",
      day1: 0,
      day2: 0,
      day2Plus: 0,
    },
    {
      zone: "Zone E",
      sla: "Air - 7 Days, Surface - 9 Days",
      day1: 0,
      day2: 0,
      day2Plus: 0,
    },
  ];

  // RTO delay data
  const rtoData = [
    {
      zone: "Zone A",
      sla: "Air - 3 Days, Surface - 3 Days",
      day1: 0,
      day2: 0,
      day2Plus: 0,
    },
    {
      zone: "Zone B",
      sla: "Air - 4 Days, Surface - 4 Days",
      day1: 0,
      day2: 0,
      day2Plus: 0,
    },
    {
      zone: "Zone C",
      sla: "Air - 5 Days, Surface - 7 Days",
      day1: 0,
      day2: 0,
      day2Plus: 0,
    },
    {
      zone: "Zone D",
      sla: "Air - 7 Days, Surface - 9 Days",
      day1: 0,
      day2: 0,
      day2Plus: 0,
    },
    {
      zone: "Zone E",
      sla: "Air - 9 Days, Surface - 11 Days",
      day1: 0,
      day2: 0,
      day2Plus: 0,
    },
  ];

  // NDR table columns
  const ndrColumns = [
    {
      title: "",
      dataIndex: "attempt",
      key: "attempt",
      width: "40%",
      className: "font-medium",
    },
    {
      title: (
        <div className="text-center">
          1 Day
          <br />
          Delayed
        </div>
      ),
      dataIndex: "day1",
      key: "day1",
      width: "15%",
      align: "center",
    },
    {
      title: (
        <div className="text-center">
          2 Day
          <br />
          Delayed
        </div>
      ),
      dataIndex: "day2",
      key: "day2",
      width: "15%",
      align: "center",
    },
    {
      title: (
        <div className="text-center">
          3 Day
          <br />
          Delayed
        </div>
      ),
      dataIndex: "day3",
      key: "day3",
      width: "15%",
      align: "center",
    },
    {
      title: (
        <div className="text-center">
          3+ Day
          <br />
          Delayed
        </div>
      ),
      dataIndex: "day3Plus",
      key: "day3Plus",
      width: "15%",
      align: "center",
    },
  ];

  // Zone delay table columns
  const zoneColumns = [
    {
      title: "",
      dataIndex: "zone",
      key: "zone",
      width: "40%",
      render: (text, record) => (
        <div className="flex items-center gap-2">
          <span className="font-medium">{text}</span>
          {record.sla && (
            <Tooltip
              title={
                <div>
                  <b>SLA for {text}</b>
                  <br />
                  {record.sla}
                </div>
              }
            >
              <span className="inline-flex items-center justify-center w-4 h-4 bg-gray-300 text-white text-xs rounded-full cursor-help">
                i
              </span>
            </Tooltip>
          )}
        </div>
      ),
    },
    {
      title: (
        <div className="text-center">
          1 Day
          <br />
          Delayed
        </div>
      ),
      dataIndex: "day1",
      key: "day1",
      width: "20%",
      align: "center",
    },
    {
      title: (
        <div className="text-center">
          2 Day
          <br />
          Delayed
        </div>
      ),
      dataIndex: "day2",
      key: "day2",
      width: "20%",
      align: "center",
    },
    {
      title: (
        <div className="text-center">
          2+ Day
          <br />
          Delayed
        </div>
      ),
      dataIndex: "day2Plus",
      key: "day2Plus",
      width: "20%",
      align: "center",
    },
  ];

  //   const datePresets = [
  //     { label: "Today", value: [dayjs(), dayjs()] },
  //     {
  //       label: "Yesterday",
  //       value: [dayjs().subtract(1, "day"), dayjs().subtract(1, "day")],
  //     },
  //     { label: "Last 7 days", value: [dayjs().subtract(7, "day"), dayjs()] },
  //     { label: "Last 30 days", value: [dayjs().subtract(30, "day"), dayjs()] },
  //     { label: "This Month", value: [dayjs().startOf("month"), dayjs()] },
  //     {
  //       label: "Last Month",
  //       value: [
  //         dayjs().subtract(1, "month").startOf("month"),
  //         dayjs().subtract(1, "month").endOf("month"),
  //       ],
  //     },
  //   ];

  return (
    <div className="flex flex-col gap-4">
      {/* Summary Stats */}
      <ResponsiveCard
        title={
          <div className="flex items-center justify-between">
            <span>Shipment Summary</span>
            <Tooltip title="Real-time data">
              <InfoCircleOutlined />
            </Tooltip>
          </div>
        }
        className="shadow-md bg-gradient-to-r from-blue-50 to-indigo-50"
      >
        <Row gutter={[16, 16]}>
          {summaryStats.map((stat, index) => (
            <Col key={index} xs={12} sm={8} md={8} lg={6}>
              <ResponsiveCard hoverable shadow className="text-center  h-full">
                <div className="flex flex-col justify-between">
                  <h6 className="text-sm font-medium text-gray-600 mb-2">
                    {stat.title}
                  </h6>
                  <p className="text-2xl font-bold text-indigo-600">
                    {stat.value}
                  </p>
                </div>
              </ResponsiveCard>
            </Col>
          ))}
        </Row>
      </ResponsiveCard>

      {/* Pickup Pendency and NDR Delays */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <ResponsiveCard
            title={
              <div className="flex items-center justify-between">
                <span className="text-base font-semibold">Pickup Pendency</span>
                <Tooltip title="Real-time data">
                  <InfoCircleOutlined />
                </Tooltip>
              </div>
            }
            className="shadow-md h-full"
          >
            <div className="flex flex-col items-center justify-center py-12">
              <img
                src="https://sr-cdn-1.shiprocket.in/img/noData.png"
                alt="No Data"
                className="w-24 h-24 mb-4"
              />
              <h3 className="text-lg font-semibold text-blue-600">No Delays</h3>
            </div>
          </ResponsiveCard>
        </Col>

        <Col xs={24} lg={12}>
          <ResponsiveCard
            title={
              <div className="flex items-center justify-between">
                <span className="text-base font-semibold">
                  NDR to Reattempt Delays
                </span>
                <Tooltip title="Real-time data">
                  <InfoCircleOutlined />
                </Tooltip>
              </div>
            }
            className="shadow-md h-full"
          >
            <Table
              columns={ndrColumns}
              dataSource={ndrData}
              pagination={false}
              size="small"
              bordered
              rowKey="attempt"
            />
          </ResponsiveCard>
        </Col>
      </Row>

      {/* Transit, RAD, and RTO Delays */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={8}>
          <ResponsiveCard
            title={
              <div className="flex items-center justify-between">
                <span className="text-base font-semibold">
                  In Transit Delay
                </span>
                <Tooltip title="Real-time data">
                  <InfoCircleOutlined />
                </Tooltip>
              </div>
            }
            className="shadow-md h-full"
          >
            <Table
              columns={zoneColumns}
              dataSource={zoneData}
              pagination={false}
              size="small"
              scroll={{ x: "max-content" }}
              bordered
              rowKey="zone"
            />
          </ResponsiveCard>
        </Col>

        <Col xs={24} lg={8}>
          <ResponsiveCard
            title={
              <div className="flex items-center justify-between">
                <span className="text-base font-semibold">
                  RAD to Delivery Delay
                </span>
                <Tooltip title="Real-time data">
                  <InfoCircleOutlined />
                </Tooltip>
              </div>
            }
            className="shadow-md h-full"
          >
            <Table
              columns={zoneColumns.filter((col) => !col.render)}
              dataSource={zoneData.map(({ sla, ...rest }) => rest)}
              pagination={false}
              size="small"
              bordered
              rowKey="zone"
              scroll={{ x: "max-content" }}
              className="custom-table"
            />
          </ResponsiveCard>
        </Col>

        <Col xs={24} lg={8}>
          <ResponsiveCard
            title={
              <div className="flex items-center justify-between">
                <span className="text-base font-semibold">RTO Delay</span>
                <Tooltip title="Real-time data">
                  <InfoCircleOutlined />
                </Tooltip>
              </div>
            }
            className="shadow-md h-full"
          >
            <Table
              columns={zoneColumns}
              dataSource={rtoData}
              pagination={false}
              size="small"
              bordered
              rowKey="zone"
              scroll={{ x: "max-content" }}
            />
          </ResponsiveCard>
        </Col>
      </Row>
    </div>
  );
};

export default OrderDelaysDashboard;
