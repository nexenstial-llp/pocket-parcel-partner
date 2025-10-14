import PageLayout from "@/components/layout/PageLayout";
import ClosedReturn from "@/components/pages/orders/returns/ClosedReturn";
import CreateReturn from "@/components/pages/orders/returns/CreateReturn";
import NewReturns from "@/components/pages/orders/returns/NewReturns";
import PickedUp from "@/components/pages/orders/returns/PickedUp";
import PickupCreated from "@/components/pages/orders/returns/PickupCreated";
import BreadcrumbComponent from "@/components/ui/BreadcrumbComponent";
import SearchPanelCard from "@/components/ui/cards/SearchPanelCard";
import {
  createFileRoute,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";
import { Button, Tabs, theme } from "antd";
import StickyBox from "react-sticky-box";

const items = [
  { label: "Create", key: "create", children: <CreateReturn /> },
  { label: "New Returns", key: "new_case", children: <NewReturns /> },
  { label: "Pickup Created", key: "generated", children: <PickupCreated /> },
  { label: "Picked Up", children: <PickedUp />, key: "picked_up" },
  { label: "Closed", key: "closed", children: <ClosedReturn /> },
];

export const Route = createFileRoute("/_authenticated/orders/returns")({
  component: RouteComponent,
});

function RouteComponent() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  const search = useSearch({ strict: false });
  const renderTabBar = (props, DefaultTabBar) => (
    <StickyBox offsetTop={0} offsetBottom={20} style={{ zIndex: 1 }}>
      <DefaultTabBar
        {...props}
        style={{ background: colorBgContainer, padding: "10px" }}
      />
    </StickyBox>
  );
  const handleChange = (key) => {
    console.log(key);
    navigate({
      search: {
        state: key,
      },
    });
  };
  return (
    <PageLayout>
      <BreadcrumbComponent
        items={[{ title: "Home", href: "/home" }, { title: "Returns" }]}
      />
      <SearchPanelCard
        searchTypeOptions={[
          { label: "Forward Order ID", value: "order_id" },
          { label: "AWB", value: "AWB" },
        ]}
        extraButtons={[
          <Button size="small" key={"report-status"}>
            Report Status
          </Button>,
          <Button size="small" key={"generate-status"} type="primary">
            Generate Status
          </Button>,
        ]}
      />
      <Tabs
        className="bg-white"
        defaultActiveKey="1"
        renderTabBar={renderTabBar}
        items={items}
        onChange={handleChange}
        activeKey={search.state || "create"}
      />
    </PageLayout>
  );
}
