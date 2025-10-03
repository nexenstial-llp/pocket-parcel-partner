/* eslint-disable react/prop-types */
import { cn } from "../utils/classname.util";

const PageLayout = ({ className, children }) => {
  return <div className={cn("m-5", className)}>{children}</div>;
};

export default PageLayout;
