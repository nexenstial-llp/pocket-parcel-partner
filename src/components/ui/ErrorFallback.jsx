/* eslint-disable react/prop-types */
import { Result, Button } from "antd";
import { Link } from "@tanstack/react-router";
import { ReloadOutlined } from "@ant-design/icons";
import { IoChevronBackCircleSharp } from "react-icons/io5";

/**
 * Reusable error message component for displaying errors
 * @param {Object} props
 * @param {Error} props.error - Error object
 * @param {Function} props.onRetry - Optional retry callback
 * @param {string} props.title - Custom error title
 * @param {string} props.backLink - Optional back link URL
 * @param {string} props.backText - Text for back button
 */
function ErrorFallback({
  error,
  onRetry,
  title = "Something went wrong",
  backLink = "/home",
  backText = "Back to Home",
}) {
  // Determine error status based on error type
  const getErrorStatus = () => {
    if (error?.response?.status === 404) return "404";
    if (error?.response?.status === 403) return "403";
    if (error?.response?.status === 500) return "500";
    return "error";
  };

  // Get user-friendly error message
  const getErrorMessage = () => {
    if (error?.message) return error.message;
    if (error?.response?.data?.message) return error.response.data.message;
    return "An unexpected error occurred. Please try again.";
  };

  const status = getErrorStatus();
  const message = getErrorMessage();

  return (
    <div className="flex items-center justify-center min-h-[400px] w-full">
      <Result
        status={status}
        title={title}
        subTitle={message}
        extra={
          <div className="flex gap-2 justify-center">
            <Link to={backLink}>
              <Button icon={<IoChevronBackCircleSharp />}>{backText}</Button>
            </Link>
            {onRetry && (
              <Button
                icon={<ReloadOutlined />}
                type="primary"
                onClick={onRetry}
              >
                Retry
              </Button>
            )}
          </div>
        }
      />
    </div>
  );
}

export default ErrorFallback;
