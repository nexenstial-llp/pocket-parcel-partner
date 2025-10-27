import { createFileRoute } from "@tanstack/react-router";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import CompanyProfileForm from "@/components/pages/settings/company-details/CompanyProfileForm";
export const Route = createFileRoute(
  "/_authenticated/settings/company-details/"
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ResponsiveCard
      title={
        <div className="flex flex-col pt-2">
          <span className="leading-4">Company Details</span>
          <small className="font-normal">
            View the company contact details
          </small>
        </div>
      }
    >
      <CompanyProfileForm />
    </ResponsiveCard>
  );
}
