import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import DropInfo from "./DropInfo";
import ReturnInfo from "./ReturnInfo";
import PickupInfo from "./PickupInfo";

const AddressesForm = () => {
  return (
    <ResponsiveCard size="small" title="Addresses">
      <div className="flex gap-4 flex-col">
        <PickupInfo />
        <DropInfo />
        <ReturnInfo />
      </div>
    </ResponsiveCard>
  );
};

export default AddressesForm;
