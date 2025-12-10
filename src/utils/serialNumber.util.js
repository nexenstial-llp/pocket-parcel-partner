export const getSerialNumber = ({ page, limit, index }) => {
  return (page - 1) * limit + index + 1;
};
