import { createFileRoute } from "@tanstack/react-router";
import { MdStorefront } from "react-icons/md";
import { FaRegEnvelope, FaRegUser } from "react-icons/fa6";
import { CiPhone } from "react-icons/ci";
import PageLayout from "@/components/layout/PageLayout";
export const Route = createFileRoute("/settings/company-details/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PageLayout>
      <div>
        <h2>Company Details</h2>
        <p>View the company contact details</p>
      </div>
      <div className="border bg-white p-3 rounded-md my-3">
        <div className="flex gap-3 items-center mb-2">
          <div className="bg-gray-100 p-2 rounded-md">
            <MdStorefront className="text-3xl" />
          </div>
          <h5>Company Address</h5>
        </div>
        <div className="flex mt-4">
          <div className="w-20 object-cover">
            <img src="abcd" width={"100%"} height={"100%"} />
          </div>
          <div>
            <p className="text-sm mb-1 font-medium text-gray-600">
              STORELINK LLP
            </p>
            <p className="text-sm text-gray-600">
              UCB NAGAR 2ND CROSS SAPTAPUR LAST CROSS Building no 66 DHARWAD
              NEAR LINGAYTA BHAVAN
            </p>
            <small className="text-gray-400">
              <i>*We'll use this logo on your packaging slip</i>{" "}
            </small>
          </div>
        </div>
      </div>
      <div className="border bg-white p-3 rounded-md my-3 w-fit">
        <div className="flex gap-3 items-center mb-2">
          <div className="bg-gray-100 p-2 rounded-md">
            <FaRegUser className="text-3xl" />
          </div>
          <h5>Primary Contact</h5>
        </div>
        <div className="flex items-center mb-2">
          <div className="text-sm font-medium text-gray-600 mr-1">ABCD</div>
          <div className="rounded-[10px] text-xs px-2 py-0.5 bg-gray-200 text-gray-600 inline-flex items-center">
            <FaRegUser className="text-xs mr-1" />{" "}
            <span className="font-medium">Admin</span>
          </div>
        </div>

        <div className="flex items-center text-sm text-gray-600">
          <div className="inline-flex items-center mr-6">
            <CiPhone className="mr-1" />

            <span>9986474446</span>
          </div>
          <div className="inline-flex items-center">
            <FaRegEnvelope className="mr-1" />

            <span>srinivasrajput@gmail.com</span>
          </div>
        </div>
      </div>
      <hr />
      <div className="rounded-lg w-full border border-gray-200 p-6 bg-white mt-6">
        <div className="flex relative items-center justify-between mb-2">
          <div className=" inline-flex items-center">
            <div className="text-gray-600 text-base font-medium ml-2">
              Business Details
            </div>
          </div>
        </div>
        <div className="text-sm font-medium text-gray-600 mb-2">
          Packages Shipped per month
        </div>
        <div className="text-sm text-gray-600">10</div>
      </div>
    </PageLayout>
  );
}
