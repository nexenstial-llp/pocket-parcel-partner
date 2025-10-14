export const setSearchParams = (key, value, navigate) => {
  return navigate({
    search: {
      [key]: value,
    },
  });
};
