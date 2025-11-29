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
