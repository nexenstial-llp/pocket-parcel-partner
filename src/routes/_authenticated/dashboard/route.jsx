import PageLayout from "@/components/layout/PageLayout";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import TitleText from "@/components/ui/TitleText";
import { useLocation } from "@tanstack/react-router";
import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { Radio } from "antd";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const location = useLocation();
  const isDomestic = location.pathname.includes("domestic");
  const handleChange = (value) => {
    if (value === "domestic") navigate({ to: "/dashboard/domestic/overview" });
    else navigate({ to: "/dashboard/international/overview" });
  };
  return (
    <PageLayout
      items={[{ title: "Home", href: "/home" }, { title: "Dashboard" }]}
    >
      <ResponsiveCard
        title={
          <div className="flex items-center gap-4">
            <TitleText title="Dashboard" />
            <Radio.Group
              size="small"
              value={isDomestic ? "domestic" : "international"}
              defaultValue="domestic"
              buttonStyle="solid"
              onChange={(e) => handleChange(e.target.value)}
            >
              <Radio.Button value="domestic">Domestic</Radio.Button>
              <Radio.Button value="international">International</Radio.Button>
            </Radio.Group>
          </div>
        }
      >
        <div className="flex flex-col gap-4">
          <Outlet />
        </div>
      </ResponsiveCard>
    </PageLayout>
  );
}
