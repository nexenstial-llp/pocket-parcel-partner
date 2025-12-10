/* eslint-disable react/prop-types */
import { cn } from "@/utils/classname.util";
import { Button, Grid } from "antd";

const { useBreakpoint } = Grid;

/**
 * @typedef {Object} CustomButtonProps
 * @property {React.ReactNode} [children] - Button content
 * @property {string} [className] - Additional CSS classes
 * @property {'large' | 'middle' | 'small'} [responsiveSize] - Custom responsive size (overrides default responsive behavior)
 * @property {'large' | 'middle' | 'small'} [mobileSize='small'] - Size to use on mobile devices
 */

/**
 * @typedef {import('antd').ButtonProps & CustomButtonProps} ResponsiveButtonProps
 */

/**
 * ResponsiveButton - A scalable and responsive button component that automatically
 * adjusts size based on screen breakpoint.
 * Automatically uses 'small' size on mobile and 'middle' size on desktop.
 * Inherits all props from Ant Design Button component.
 *
 * @param {ResponsiveButtonProps} props
 * @returns {JSX.Element}
 */
const ResponsiveButton = ({
  children,
  className,
  responsiveSize,
  mobileSize = "small",
  ...props
}) => {
  const screens = useBreakpoint();

  // Determine the button size based on screen breakpoint
  const getResponsiveSize = () => {
    if (props.size) return props.size; // Allow manual override
    if (responsiveSize) return responsiveSize; // Use custom responsive size if provided
    return screens.sm ? "middle" : mobileSize; // Default: middle for desktop, small for mobile
  };

  return (
    <Button size={getResponsiveSize()} className={cn(className)} {...props}>
      {children}
    </Button>
  );
};

export default ResponsiveButton;
