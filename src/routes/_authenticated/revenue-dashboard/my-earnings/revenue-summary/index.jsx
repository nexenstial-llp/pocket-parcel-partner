import PageLayout from "@/components/layout/PageLayout";
import FinancialKpisPage from "@/components/pages/revenue-dashboard/FinancialKpisPage";
import OperationalKpisPage from "@/components/pages/revenue-dashboard/OperationalKpisPage";
import PerformanceQualityKpisPage from "@/components/pages/revenue-dashboard/performanceQualityKpis";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";

import { createFileRoute } from "@tanstack/react-router";
import { Divider } from "antd";

export const Route = createFileRoute(
  "/_authenticated/revenue-dashboard/my-earnings/revenue-summary/"
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PageLayout
      items={[{ title: "Home", href: "/home" }, { title: "Revenue Summary" }]}
    >
      <ResponsiveCard title="Revenue Summary">
        <FinancialKpisPage />
        <Divider />
        <OperationalKpisPage />
        <Divider />
        <PerformanceQualityKpisPage />
      </ResponsiveCard>
    </PageLayout>
  );
}
