/* eslint-disable react/prop-types */
import { cn } from "@/utils/classname.util";
import { Card, Grid } from "antd";

const { useBreakpoint } = Grid;
/**
 * @typedef {import('antd').CardProps & {
 *   title: React.ReactNode;
 *   description?: React.ReactNode;
 *   extra?: React.ReactNode;
 *   shadow?: boolean
 * }} ResponsiveCardProps
 */

/**
 * ResponsiveCard - a scalable and responsive card component.
 *
 * @param {ResponsiveCardProps} props
 */
const ResponsiveCard = ({
  title,
  description,
  extra,
  children,
  style,
  className,
  shadow = false,
  ...props
}) => {
  const screens = useBreakpoint();
  const responsiveSize = screens.sm ? "large" : "small";
  return (
    <Card
      title={title}
      extra={extra}
      size={props.size || responsiveSize}
      style={style}
      className={cn(
        shadow &&
          "shadow-sm hover:shadow-md transition-all duration-300 ease-in-out h-full",
        className
      )}
      {...props}
    >
      {description && (
        <div style={{ marginBottom: 12, color: "rgba(0,0,0,0.65)" }}>
          {description}
        </div>
      )}
      {children}
    </Card>
  );
};

export default ResponsiveCard;
