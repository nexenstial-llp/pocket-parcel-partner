import PageLayout from "@/components/layout/PageLayout";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import {
  createFileRoute,
  Link,
  Outlet,
  useLocation,
} from "@tanstack/react-router";
import { Menu } from "antd";
// Components
export const Route = createFileRoute("/_authenticated/settings")({
  component: RouteComponent,
});
const items = [
  // {
  //   label: <Link to={"/settings/company-details"}>Company Details</Link>,
  //   key: "/settings/company-details",
  // },
  // {
  //   label: <Link to={"/settings/pickup-locations"}>Pickup Locations</Link>,
  //   key: "/settings/pickup-locations",
  // },
  // {
  //   label: <Link to={"/settings/bank-details"}>Bank Details</Link>,
  //   key: "/settings/bank-details",
  // },
  {
    label: <Link to={"/settings/address-management"}>Address Management</Link>,
    key: "/settings/address-management",
  },
  // {
  //   label: <Link to={"/settings/invoice-templates"}>Invoice Templates</Link>,
  //   key: "/settings/invoice-templates",
  // },
  // {
  //   label: <Link to={"/settings/tax-configuration"}>Tax Configuration</Link>,
  //   key: "/settings/tax-configuration",
  // },
];

function RouteComponent() {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <PageLayout
      items={[{ title: "Home", href: "/home" }, { title: "Settings" }]}
    >
      <div className="flex gap-4  h-full">
        <ResponsiveCard title="Settings">
          <Menu
            mode="inline"
            items={items}
            className="!border-none"
            selectedKeys={[pathname]}
            key={"key"}
          />
        </ResponsiveCard>

        {/* Main Content */}
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </PageLayout>
  );
}
