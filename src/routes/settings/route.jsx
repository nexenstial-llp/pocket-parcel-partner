import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import PageLayout from "../../components/PageLayout";
// Components
export const Route = createFileRoute("/settings")({
  component: RouteComponent,
});
const items = [
  {
    label: "Company Details",
    key: "company-details",
  },
  {
    label: "Pickup Locations",
    key: "pickup-locations",
  },
  {
    label: "Bank Details",
    key: "bank-details",
  },
  {
    label: "Invoice Templates",
    key: "invoice-templates",
  },
  // { label: "API Setups", key: "api-setups" },
  {
    label: "Tax Configuration",
    key: "tax-configuration",
  },
  { label: "Users", key: "Users" },
];

function RouteComponent() {
  return (
    <PageLayout>
      <div className="flex bg-white rounded-lg border h-full min-h-[600px]">
        <div className=" p-4 flex flex-col w-64 h-full border-r ">
          <h2 className="mb-4 text-xl font-semibold">Settings</h2>
          <nav className="space-y-2">
            {items.map((item) => (
              <Link
                key={item.key}
                to={`/settings/${item.key}`}
                className="block rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100"
                activeProps={{
                  className:
                    "bg-indigo-200 text-indigo-800 hover:bg-indigo-100",
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <Outlet />
        </div>
      </div>
    </PageLayout>
  );
}
