/* eslint-disable react/prop-types */
import { Typography } from "antd";
/**
 * @typedef {import('antd').Typography.TypographyProps} TitleTextProps
 */

/**
 * A component that renders a title with a given level and other props.
 *
 * @param {string} title - The text to be rendered as the title.
 * @param {number} [level=3] - The level of the title (1-5).
 * @param {TitleTextProps} rest - Other props to be passed to the Typography.Title component.
 * @returns {React.ReactElement} A React element representing the title.
 */
const TitleText = ({ title, level = 3, className, ...rest }) => {
  return (
    <Typography.Title
      className={className}
      style={{ marginBottom: 0 }}
      level={level}
      {...rest}
    >
      {title}
    </Typography.Title>
  );
};

export default TitleText;
