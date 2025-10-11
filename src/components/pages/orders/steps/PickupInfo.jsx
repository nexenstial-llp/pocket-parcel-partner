import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import DynamicFormField from "@/components/ui/formFields/DynamicFormField";
import { forwardPickupInfoFormField } from "@/schemas/orders/orderFormFields";

const PickupInfo = () => {
  return (
    <ResponsiveCard title="Pickup Info" size="small">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4">
        {forwardPickupInfoFormField.map((item, i) => (
          <DynamicFormField key={i} {...item} />
        ))}
      </div>
    </ResponsiveCard>
  );
};

export default PickupInfo;
