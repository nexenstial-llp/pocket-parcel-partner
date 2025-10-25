/* eslint-disable react/prop-types */
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import { cn } from "@/utils/classname.util";
import { LiaClipboardListSolid } from "react-icons/lia";
import DefaultExtraContent from "./DefaultExtraContent";

/**
 * DashboardStatCard - A reusable, scalable dashboard stat card.
 *
 * @param {object} props
 * @param {string} props.title - The title of the stat (e.g., "Today's Orders")
 * @param {string|number} props.value - The main value to display
 * @param {string} [props.previousLabel] - Label for comparison (e.g., "Yesterday")
 * @param {string|number} [props.previousValue] - Value for comparison
 * @param {JSX.Element} props.icon - Icon to display in the circle
 * @param {string} [props.tooltip] - Tooltip text
 * @param {string} [props.bgColor="#f5f5f5"] - Background color for the card
 */
const DashboardStatCard = ({
  title,
  value,
  previousLabel,
  previousValue,
  icon,
  extra,
  bgColor,
  className,
}) => {
  return (
    <ResponsiveCard
      shadow
      styles={{
        header: { border: "none" },
      }}
      className={cn("col-span-12 md:col-span-4 ", className)}
      style={{ background: bgColor }}
      size="small"
    >
      <div className="flex justify-end mb-2">
        {extra ? extra : <DefaultExtraContent />}
      </div>
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-4 flex justify-center items-center">
          <div className="rounded-full bg-white size-20 flex justify-center items-center">
            {icon ? icon : <LiaClipboardListSolid size={60} />}
          </div>
        </div>
        <div className="col-span-8">
          <p className="font-semibold">{title}</p>
          <p className="text-xl">{value}</p>
          {previousLabel && (
            <p className="font-semibold">
              {previousLabel}
              <br /> {previousValue}
            </p>
          )}
        </div>
      </div>
    </ResponsiveCard>
  );
};

export default DashboardStatCard;
