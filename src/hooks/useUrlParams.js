// src/hooks/useUrlParams.js
import { useRouter, useSearch } from "@tanstack/react-router";

export const useUrlParams = () => {
  const router = useRouter();
  const search = useSearch({ strict: false });

  const setParam = (key, value) => {
    router.navigate({
      search: (prev) => ({
        ...prev,
        [key]: value,
      }),
      replace: true,
    });
  };

  const setParams = (params) => {
    router.navigate({
      search: (prev) => ({
        ...prev,
        ...params,
      }),
      replace: true,
    });
  };

  const clearParam = (key) => {
    router.navigate({
      search: (prev) => {
        // eslint-disable-next-line no-unused-vars
        const { [key]: _, ...rest } = prev;
        return rest;
      },
      replace: true,
    });
  };

  return {
    params: search,
    setParam,
    setParams,
    clearParam,
  };
};
