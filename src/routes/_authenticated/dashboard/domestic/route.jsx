import {
  createFileRoute,
  Outlet,
  useLocation,
  useNavigate,
} from "@tanstack/react-router";
import { Menu } from "antd";

export const Route = createFileRoute("/_authenticated/dashboard/domestic")({
  component: RouteComponent,
});

const items = [
  { key: "/dashboard/domestic/overview", label: "Overview" },
  { key: "/dashboard/domestic/orders", label: "Orders" },
  { key: "/dashboard/domestic/shipments", label: "Shipments" },
  { key: "/dashboard/domestic/ndr", label: "NDR" },
  { key: "/dashboard/domestic/rto", label: "RTO" },
  { key: "/dashboard/domestic/courier", label: "Courier" },
  { key: "/dashboard/domestic/delays", label: "Delays" },
];

function RouteComponent() {
  const navigate = useNavigate();
  const location = useLocation();
  const activeKey = location.pathname;
  const onClick = (e) => {
    navigate({ to: `${e.key}` });
  };
  return (
    <>
      <Menu
        className="button-menu"
        onClick={onClick}
        selectedKeys={[activeKey]}
        mode="horizontal"
        items={items}
        activeKey={activeKey}
      />

      <Outlet />
    </>
  );
}
