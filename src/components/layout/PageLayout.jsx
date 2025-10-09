/* eslint-disable react/prop-types */
import { cn } from "../../utils/classname.util";

const PageLayout = ({ className, children }) => {
  return (
    <div className={cn("m-5 flex flex-col gap-4", className)}>{children}</div>
  );
};

export default PageLayout;
