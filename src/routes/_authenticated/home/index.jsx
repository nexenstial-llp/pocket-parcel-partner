import { createFileRoute } from "@tanstack/react-router";
import { CgFolderAdd } from "react-icons/cg";
import { FaWallet } from "react-icons/fa";
import { ImMobile } from "react-icons/im";
import { FaStore } from "react-icons/fa";
import { BsBank2 } from "react-icons/bs";
import { TiSocialInstagram } from "react-icons/ti";

// Components
import GettingStartedCard from "@/components/Cards/GettingStartedCard";
import BusinessProfileCard from "@/components/Cards/BusinessProfileCard";
// Assets
import AttentionImage from "@/assets/attentionToday.svg";
import NoPickups from "@/assets/noPickups.svg";
import PageLayout from "@/components/layout/PageLayout";

const gettingStarted = [
  {
    icon: <CgFolderAdd size={40} />,
    title: "Add your 1st order",
    subTitle: " Add your first order to start your shipping journey",
    btnText: "  Add Oder",
  },
  {
    icon: <FaWallet size={40} />,
    title: "Recharge your Wallet",
    subTitle: "Add wallet balance to start shipping orders",
    btnText: "Recharge",
  },
  {
    icon: <ImMobile size={40} />,
    title: "Complete your KYC",
    subTitle: "Complete your KYC verification to start shipping orders",
    btnText: "Verify KYC",
  },
];
const setUpBusinessProfile = [
  {
    icon: <FaStore size={40} />,
    title: "Add Store Details",
    subTitle: "Add store name, email & logo",
    isCompleted: true,
  },
  {
    icon: <BsBank2 size={40} />,
    title: "Add Bank Details",
    subTitle: "To receive COD remittance add bank details",
    isCompleted: false,
    navigateTO: "/bank-details",
  },
  {
    icon: <TiSocialInstagram size={40} />,
    title: "Add Store’s Social Media Handle",
    subTitle: "Share your social media links.",
    isCompleted: false,
  },
];
export const Route = createFileRoute("/_authenticated/home/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PageLayout className={"gap-4"}>
      <div className="flex flex-col gap-3">
        <h2 className="text-xl">Getting Started</h2>
        <div className="grid grid-cols-1 sm;grid-cols-2 md:grid-cols-3 gap-4 items-stretch">
          {gettingStarted &&
            gettingStarted.map((item) => (
              <div key={item.title} className="h-full">
                <GettingStartedCard
                  icon={item.icon}
                  title={item.title}
                  subTitle={item.subTitle}
                  btnText={item.btnText}
                />
              </div>
            ))}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <h2 className="text-xl">Setup Business Profile</h2>
        <div className="grid grid-cols-1 sm;grid-cols-2 md:grid-cols-3 gap-4 items-stretch">
          {setUpBusinessProfile &&
            setUpBusinessProfile.map((item) => (
              <div key={item.title} className="h-full">
                <BusinessProfileCard
                  icon={item.icon}
                  title={item.title}
                  subTitle={item.subTitle}
                  isCompleted={item.isCompleted}
                />
              </div>
            ))}
        </div>
      </div>
      <div className="flex flex-col gap-3 bg-white p-4 rounded-md">
        <h3>Actions Needing Your Attention Today</h3>
        <div className="w-full flex justify-center items-center mt-4 min-h-[300px]">
          <div className="max-w-sm flex justify-center items-center">
            <figure className="w-1/2">
              <img src={AttentionImage} alt="" width={"100%"} />
              <figcaption className="mt-2">
                <span>No Pending Actions Today</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3 bg-white p-4 rounded-md">
        <h3>Your Upcoming Pickups</h3>
        <div className="w-full flex justify-center items-center mt-4 min-h-[300px]">
          <div className="max-w-sm flex justify-center items-center">
            <figure className="w-1/2">
              <img src={NoPickups} alt="" width={"100%"} />
              <figcaption className="mt-2">
                <span>No Pickups Scheduled</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
