import { createFileRoute } from "@tanstack/react-router";
// Components
import InvoiceTemplateModal from "@/components/pages/settings/InvoiceTemplate/modals/InvoiceTemplateModal";
import InvoiceSequenceModal from "@/components/pages/settings/InvoiceTemplate/modals/InvoiceSequenceModal";
export const Route = createFileRoute(
  "/_authenticated/settings/invoice-templates/"
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <div className="flex justify-between items-center gap-2 border-b pb-4 border-gray-200 mb-10">
        <div>
          <div className="flex">
            <h5 className="text-xl mr-2">Invoice Templates</h5>
          </div>
          <span className="text-sm text-gray-600">
            Create pre-defined templates for your invoices
          </span>
        </div>
        <InvoiceTemplateModal />
      </div>
      <div className="flex justify-between items-center gap-2 border-b pb-4  border-gray-200">
        <div>
          <div className="flex">
            <h5 className="text-xl mr-2">Invoice Sequence</h5>
          </div>
          <span className="text-sm text-gray-600">
            Set invoice sequence for your channels
          </span>
        </div>
        <InvoiceSequenceModal />
      </div>
    </div>
  );
}
