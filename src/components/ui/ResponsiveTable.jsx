import { Table } from "antd";
import PropTypes from "prop-types";
import { cn } from "@/utils/classname.util";
import { Grid } from "antd";
import { useMemo } from "react";
const { useBreakpoint } = Grid;

/**
 * @typedef {Object} CustomTableProps
 * @property {Array} columns - Table columns configuration
 * @property {Array} [dataSource] - Data to be displayed
 * @property {boolean} [loading] - Loading state
 * @property {string|function} [rowKey='id'] - Row key for React list rendering
 * @property {Object} [scroll={x: 'max-content'}] - Scroll configuration
 * @property {string} [size='small'] - Table size (will be responsive if not overridden)
 * @property {boolean} [bordered=true] - Show borders
 * @property {boolean|Object} [pagination=false] - Pagination configuration
 * @property {string} [className] - Additional CSS classes
 */

/**
 * @typedef {import('antd').TableProps & CustomTableProps} ResponsiveTableProps
 */

/**
 * ResponsiveTable - A responsive table component that adjusts size based on screen breakpoint.
 * Automatically uses 'small' size on mobile and 'middle' size on tablet/desktop.
 * Inherits all props from Ant Design Table component.
 *
 * @param {ResponsiveTableProps} props
 * @returns {JSX.Element}
 */

const ResponsiveTable = ({
  columns,
  dataSource,
  loading,
  rowKey = "id",
  scroll = { x: "max-content" },
  size,
  bordered = true,
  pagination = false,
  className,
  sticky = true,
  ...props
}) => {
  const screens = useBreakpoint();

  // Responsive final size
  const tableSize = useMemo(() => {
    // If user passed size manually → honor it
    if (size) return size;

    // Responsive mode
    return screens.md ? "middle" : "small";
  }, [size, screens.md]);

  return (
    <Table
      sticky={sticky}
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      rowKey={rowKey}
      scroll={scroll}
      size={tableSize}
      bordered={bordered}
      pagination={pagination}
      className={cn("w-full", className)}
      {...props}
    />
  );
};

ResponsiveTable.propTypes = {
  columns: PropTypes.array.isRequired,
  dataSource: PropTypes.array,
  loading: PropTypes.bool,
  rowKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  scroll: PropTypes.object,
  size: PropTypes.string, // manually override
  bordered: PropTypes.bool,
  pagination: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  className: PropTypes.string,
  sticky: PropTypes.bool,
};

export default ResponsiveTable;
