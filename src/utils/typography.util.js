/**
 * Truncates a given text to a maximum length, appending an ellipsis
 * if the text is longer than the maximum length.
 * @param {string} text - The text to be truncated.
 * @param {number} maxLength - The maximum length of the text.
 * @returns {string} The truncated text.
 */
export const truncateText = (text, maxLength) => {
  if (!text) return text;
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
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
};

// Remove hyphens from a given text
export const removeHyphens = (text) => {
  if (!text) return text;
  return text?.replace(/-/g, " ");
};

// Remove underscores from a given text
export const removeUnderscores = (text) => {
  if (!text) return text;
  return text?.replace(/_/g, " ");
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
    case "RECEIVED":
      return "green";
    default:
      return "blue";
  }
};
export const getStatusColorForTimeline = (status) => {
  switch (status) {
    case "DRAFT":
      return "#8c8c8c"; // grey - not active

    case "PENDING_PAYMENT":
      return "#faad14"; // warning - needs action

    case "PAYMENT_FAILED":
      return "#ff4d4f"; // error

    case "CONFIRMED":
      return "#52c41a"; // success - paid/confirmed

    case "PROCESSING":
    case "PICKUP_SCHEDULED":
    case "PICKUP_PENDING":
    case "PICKED_UP":
    case "IN_TRANSIT":
    case "OUT_FOR_DELIVERY":
      return "#1677ff"; // info/progress

    case "DELIVERED":
      return "#52c41a"; // success

    case "DELIVERY_FAILED":
      return "#faad14"; // warning (can be retried / support)

    case "RTO_INITIATED":
    case "RTO_IN_TRANSIT":
      return "#1677ff"; // progress (reverse flow)

    case "RTO_DELIVERED":
      return "#52c41a"; // success (returned)

    case "CANCELLED":
      return "#ff4d4f"; // error

    case "LOST":
    case "DAMAGED":
      return "#ff4d4f"; // critical error

    default:
      return "#1677ff"; // fallback info/progress
  }
};

export const getS3KeyFromUrl = (url) => {
  return url?.split(
    "https://s3.ap-south-1.amazonaws.com/pp-s3.pocketparcel.in/"
  )?.[1];
};

export const formatINR = (value) => {
  if (value === null || value === undefined || value === "") return "";
  const num = Number(value);
  if (Number.isNaN(num)) return String(value);
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(num);
};
