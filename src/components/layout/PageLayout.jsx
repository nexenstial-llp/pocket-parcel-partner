/* eslint-disable react/prop-types */
import { cn } from "../../utils/classname.util";
import BreadcrumbComponent from "../ui/BreadcrumbComponent";

/**
 * A layout component that wraps a BreadcrumbComponent and children
 * with a margin of 5 and a flex column layout with a gap of 4.
 * @param {string} className - Additional CSS classes to apply to the component
 * @param {React.ReactNode} children - The children elements to render
 * @param {import("antd").BreadcrumbProps["items"]} items - The items to render in the breadcrumb
 * @returns {React.ReactElement} - The rendered component
 */
const PageLayout = ({ className, children, items = [] }) => {
  return (
    <div className={cn("m-5 flex flex-col gap-4", className)}>
      {items.length > 0 && <BreadcrumbComponent items={items} />}
      {children}
    </div>
  );
};

export default PageLayout;
