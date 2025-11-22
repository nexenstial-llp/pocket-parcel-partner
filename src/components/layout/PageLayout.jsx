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
    <div className={cn("m-3 sm:md-4 md:m-5", className)}>
      {items.length > 0 && (
        <BreadcrumbComponent className="mb-1" items={items} />
      )}
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
};

export default PageLayout;
