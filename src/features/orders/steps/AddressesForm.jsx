import ResponsiveCard from "@/components/ui/ResponsiveCard";
import PickupInfoForm from "./PickupInfoForm";
import DropInfo from "./DropInfo";
import ReturnInfo from "./ReturnInfo";

const AddressesForm = () => {
  return (
    <ResponsiveCard size="small" title="Addresses">
      <div className="flex gap-4 flex-col">
        <PickupInfoForm />
        <DropInfo />
        <ReturnInfo />
      </div>
    </ResponsiveCard>
  );
};

export default AddressesForm;
