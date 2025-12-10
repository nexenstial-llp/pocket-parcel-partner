/* eslint-disable react/prop-types */
import { useNavigate } from "@tanstack/react-router";
import ResponsiveButton from "./ResponsiveButton";

/**
 * A reusable button component for navigating back to a specific page
 * @param {string} type - Type of button (primary, secondary, etc)
 * @param {string} navigateTo - URL to navigate to
 * @param {string} text - Text to display on the button
 * @param {Object} props - Additional props to pass to the Button component
 */
const BackButton = ({ type, navigateTo, children, ...props }) => {
  const navigate = useNavigate();
  const handleOnClick = () => {
    navigate({ to: navigateTo });
  };
  return (
    <ResponsiveButton type={type} onClick={handleOnClick} {...props}>
      {children}
    </ResponsiveButton>
  );
};

export default BackButton;
