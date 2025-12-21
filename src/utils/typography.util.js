/**
 * Truncates a given text to a maximum length, appending an ellipsis
 * if the text is longer than the maximum length.
 * @param {string} text - The text to be truncated.
 * @param {number} maxLength - The maximum length of the text.
 * @returns {string} The truncated text.
 */
export const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};

/**
 * Capitalizes the first letter of a given text.
 * @param {string} text - The text to be capitalized.
 * @returns {string} The capitalized text.
 */
export const capitalizeFirstLetter = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

// Remove hyphens from a given text
export const removeHyphens = (text) => {
  return text.replace(/-/g, " ");
};

// Remove underscores from a given text
export const removeUnderscores = (text) => {
  return text.replace(/_/g, " ");
};

export const getStatusColor = (status) => {
  switch (status) {
    case "PENDING":
      return "blue";
    case "IN_TRANSIT":
      return "orange";
    case "PAID":
      return "green";
    case "DELIVERED":
      return "green";
    case "CANCELLED":
      return "red";
    case "RETURNED":
      return "warning";
    case "CONFIRMED":
      return "green";
    case "COMPLETED":
      return "green";
    case "PENDING_PAYMENT":
      return "warning";
    default:
      return "blue";
  }
};

export const getS3KeyFromUrl = (url) => {
  return url?.split(
    "https://s3.ap-south-1.amazonaws.com/pp-s3.pocketparcel.in/"
  )?.[1];
};
