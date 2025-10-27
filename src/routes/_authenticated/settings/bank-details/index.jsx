import { createFileRoute } from "@tanstack/react-router";
import { RiBankFill } from "react-icons/ri";
import BankDetailsModal from "../../../../components/pages/settings/bankDetails/modals/BankDetailsModal";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";

export const Route = createFileRoute("/_authenticated/settings/bank-details/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ResponsiveCard title="Bank Details">
      <div className="w-full h-full text-center my-[50px]">
        <div className="w-17.5 h-17.5 mb-2 inline-block text-7xl">
          <RiBankFill />
        </div>
        <h3 className="text-2xl">Seems like no Bank Account is added yet</h3>
        <p>
          Add a bank account to facilitate COD remittances. This is a necessary
          action for you to ship COD orders.
        </p>
        <BankDetailsModal />
      </div>
    </ResponsiveCard>
  );
}
