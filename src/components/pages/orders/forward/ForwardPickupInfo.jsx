import DynamicFormField from "@/components/ui/formFields/DynamicFormField";
import { forwardPickupInfoFormField } from "@/schemas/orders/orderFormFields";

const ForwardPickupInfo = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4">
      {forwardPickupInfoFormField.map((item, i) => (
        <DynamicFormField key={i} {...item} />
      ))}
    </div>
  );
};

export default ForwardPickupInfo;
