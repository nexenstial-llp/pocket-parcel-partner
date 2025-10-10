import PageLayout from "@/components/layout/PageLayout";
import BreadcrumbComponent from "@/components/ui/BreadcrumbComponent";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import { createFileRoute } from "@tanstack/react-router";
import { Table } from "antd";

export const Route = createFileRoute("/_authenticated/ndr/reports/")({
  component: RouteComponent,
});

const columns = [
  {
    title: "ClickPost Report ID",
    dataIndex: "cp_id",
    key: "cp_id",
  },
  {
    title: "Carrier Partner",
    dataIndex: "carrier_partner",
    key: "carrier_partner",
  },
  {
    title: "To Recipients",
    dataIndex: "to_recipients",
    key: "to_recipients",
  },
  {
    title: "CC Recipients",
    dataIndex: "cc_recipients",
    key: "cc_recipients",
  },
  {
    title: "Scheduled Runtime",
    dataIndex: "scheduled_runtime",
    key: "scheduled_runtime",
  },
  {
    title: "Last Runtime",
    dataIndex: "last_runtime",
    key: "last_runtime",
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
  },
];

function RouteComponent() {
  return (
    <PageLayout>
      <BreadcrumbComponent
        items={[{ title: "Home", href: "/home" }, { title: "NDR Reports" }]}
      />
      <ResponsiveCard size="small" title="NDR Reports">
        <Table columns={columns} dataSource={[]} />
      </ResponsiveCard>
    </PageLayout>
  );
}
