import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import DefaultExtraContent from "../overview/DefaultExtraContent";
export default function RTODashboard() {
  return (
    <div className="flex flex-col gap-4">
      {/* RTO Overview Card */}
      <ResponsiveCard
        title="RTO Overview"
        extra={<DefaultExtraContent />}
        className="mb-6 dashboard-shadow"
      >
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
      </ResponsiveCard>

      {/* Charts and Tables: RTO Count, Status, Reasons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ResponsiveCard
          title="RTO Count"
          className=" flex flex-col  justify-center"
        >
          <div className=" flex flex-col items-center">
            <img
              src="https://sr-cdn-1.shiprocket.in/img/noData.png"
              className="w-24 mb-2"
              alt="No Data"
            />
            <h3 className="text-blue-600">No RTO for selected filters.</h3>
          </div>
        </ResponsiveCard>
        <ResponsiveCard
          title="RTO Status"
          className=" flex flex-col  justify-center"
        >
          <div className="mt-4 flex flex-col items-center">
            <img
              src="https://sr-cdn-1.shiprocket.in/img/noData.png"
              className="w-24 mb-2"
              alt="No Data"
            />
            <h3 className="text-blue-600">No RTO for selected filters.</h3>
          </div>
        </ResponsiveCard>
        <ResponsiveCard
          title="RTO Reasons"
          className=" flex flex-col  justify-center md:col-span-2"
        >
          <div className="mt-4 flex flex-col items-center">
            <img
              src="https://sr-cdn-1.shiprocket.in/img/noData.png"
              className="w-24 mb-2"
              alt="No Data"
            />
            <h3 className="text-blue-600">No RTO for selected filters.</h3>
          </div>
        </ResponsiveCard>
      </div>

      {/* Top RTO Tables By City, Pincode, Customer, Carrier */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ResponsiveCard
          title="Top RTO - Customer"
          extra="Last 30 days"
          className="min-h-80 flex flex-col"
        >
          <div className="flex flex-1 flex-col justify-center items-center">
            <img
              src="https://sr-cdn-1.shiprocket.in/img/noData.png"
              className="w-24 mb-2"
              alt="No Data"
            />
            <h3 className="text-blue-600">No RTO for selected filters.</h3>
          </div>
        </ResponsiveCard>
        <ResponsiveCard
          title="Top RTO - City"
          extra="Last 30 days"
          className="min-h-80 flex flex-col"
        >
          <div className="flex flex-1 flex-col justify-center items-center">
            <img
              src="https://sr-cdn-1.shiprocket.in/img/noData.png"
              className="w-24 mb-2"
              alt="No Data"
            />
            <h3 className="text-blue-600">No RTO for selected filters.</h3>
          </div>
        </ResponsiveCard>
        <ResponsiveCard
          title="Top RTO - Pincode"
          extra="Last 30 days"
          className="min-h-80 flex flex-col"
        >
          <div className="flex flex-1 flex-col justify-center items-center">
            <img
              src="https://sr-cdn-1.shiprocket.in/img/noData.png"
              className="w-24 mb-2"
              alt="No Data"
            />
            <h3 className="text-blue-600">No RTO for selected filters.</h3>
          </div>
        </ResponsiveCard>
        <ResponsiveCard
          title="Top RTO - Carrier"
          extra="Last 30 days"
          className="min-h-80 flex flex-col"
        >
          <div className="flex flex-1 flex-col justify-center items-center">
            <img
              src="https://sr-cdn-1.shiprocket.in/img/noData.png"
              className="w-24 mb-2"
              alt="No Data"
            />
            <h3 className="text-blue-600">No RTO for selected filters.</h3>
          </div>
        </ResponsiveCard>
      </div>
    </div>
  );
}
