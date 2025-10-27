import { Card, Typography } from "antd";
const { Title } = Typography;
export default function RTODashboard() {
  return (
    <div className="flex flex-col gap-4">
      {/* RTO Overview Card */}
      <Card className="mb-6 dashboard-shadow">
        <div className="flex flex-wrap justify-between items-center">
          <Title level={5}>RTO Overview</Title>
          <img
            src="https://app.shiprocket.in/sellers/assets/images/Real-time-data.svg"
            alt="Real-time"
            className="w-7 h-7"
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center mt-4">
          <div>
            <h6 className="font-medium">Total RT</h6>
            <p className="font-bold text-lg">0</p>
          </div>
          <div>
            <h6 className="font-medium">RTO %</h6>
            <p className="font-bold text-lg">0%</p>
          </div>
          <div>
            <h6 className="font-medium">RTO Initiated</h6>
            <p className="font-bold text-lg">0</p>
          </div>
          <div>
            <h6 className="font-medium">RTO Undelivered</h6>
            <p className="font-bold text-lg">0</p>
          </div>
          <div>
            <h6 className="font-medium">RTO Delivered</h6>
            <p className="font-bold text-lg">0</p>
          </div>
        </div>
      </Card>

      {/* Charts and Tables: RTO Count, Status, Reasons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="h-72 flex flex-col items-center justify-center">
          <Title level={5}>RTO Count</Title>
          <div className="mt-4 flex flex-col items-center">
            <img
              src="https://sr-cdn-1.shiprocket.in/img/noData.png"
              className="w-24 mb-2"
              alt="No Data"
            />
            <h3 className="text-blue-600">No RTO for selected filters.</h3>
          </div>
        </Card>
        <Card className="h-72 flex flex-col items-center justify-center">
          <Title level={5}>RTO Status</Title>
          <div className="mt-4 flex flex-col items-center">
            <img
              src="https://sr-cdn-1.shiprocket.in/img/noData.png"
              className="w-24 mb-2"
              alt="No Data"
            />
            <h3 className="text-blue-600">No RTO for selected filters.</h3>
          </div>
        </Card>
        <Card className="h-72 flex flex-col items-center justify-center md:col-span-2">
          <Title level={5}>RTO Reasons</Title>
          <div className="mt-4 flex flex-col items-center">
            <img
              src="https://sr-cdn-1.shiprocket.in/img/noData.png"
              className="w-24 mb-2"
              alt="No Data"
            />
            <h3 className="text-blue-600">No RTO for selected filters.</h3>
          </div>
        </Card>
      </div>

      {/* Top RTO Tables By City, Pincode, Customer, Courier */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="min-h-80 flex flex-col">
          <div className="flex justify-between items-center gap-2">
            <Title level={5}>Top RTO - Pincode</Title>
            <span className="text-xs text-gray-500">Last 30 Days</span>
          </div>
          <div className="flex flex-1 flex-col justify-center items-center">
            <img
              src="https://sr-cdn-1.shiprocket.in/img/noData.png"
              className="w-24 mb-2"
              alt="No Data"
            />
            <h3 className="text-blue-600">No RTO for selected filters.</h3>
          </div>
        </Card>
        <Card className="min-h-80 flex flex-col">
          <div className="flex justify-between items-center gap-2">
            <Title level={5}>Top RTO - City</Title>
            <span className="text-xs text-gray-500">Last 30 Days</span>
          </div>
          <div className="flex flex-1 flex-col justify-center items-center">
            <img
              src="https://sr-cdn-1.shiprocket.in/img/noData.png"
              className="w-24 mb-2"
              alt="No Data"
            />
            <h3 className="text-blue-600">No RTO for selected filters.</h3>
          </div>
        </Card>
        <Card className="min-h-80 flex flex-col">
          <div className="flex justify-between items-center gap-2">
            <Title level={5}>Top RTO - Customer</Title>
            <span className="text-xs text-gray-500">Last 30 Days</span>
          </div>

          <div className="flex flex-1 flex-col justify-center items-center">
            <img
              src="https://sr-cdn-1.shiprocket.in/img/noData.png"
              className="w-24 mb-2"
              alt="No Data"
            />
            <h3 className="text-blue-600">No RTO for selected filters.</h3>
          </div>
        </Card>
        <Card className="min-h-80 flex flex-col">
          <div className="flex justify-between items-center gap-2">
            <Title level={5}>Top RTO - Courier</Title>
            <span className="text-xs text-gray-500">Last 30 Days</span>
          </div>
          <div className="flex flex-1 flex-col justify-center items-center">
            <img
              src="https://sr-cdn-1.shiprocket.in/img/noData.png"
              className="w-24 mb-2"
              alt="No Data"
            />
            <h3 className="text-blue-600">No RTO for selected filters.</h3>
          </div>
        </Card>
      </div>
    </div>
  );
}
