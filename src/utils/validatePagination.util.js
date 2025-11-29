/**
 * Validate pagination parameters.
 * @param {Object} search - Search parameters.
 * @param {Object} [defaults] - Default pagination parameters.
 * @returns {Object} - Validated pagination parameters.
 */

export const validatePagination = (
  search,
  defaults = { page: 1, limit: 20 }
) => {
  return {
    page: Number(search.page) || defaults.page,
    limit: Number(search.limit) || defaults.limit,
  };
};
