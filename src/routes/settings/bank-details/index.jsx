import { createFileRoute } from "@tanstack/react-router";
import { RiBankFill } from "react-icons/ri";
import BankDetailsModal from "../../../components/pages/settings/bankDetails/modals/BankDetailsModal";
import PageLayout from "@/components/layout/PageLayout";

export const Route = createFileRoute("/settings/bank-details/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PageLayout>
      <h5>Bank Details</h5>
      <div className="w-full h-full text-center mt-[150px]">
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
    </PageLayout>
  );
}
