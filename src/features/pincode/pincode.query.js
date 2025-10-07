import { useQuery } from "@tanstack/react-query";
import { getCitySateFromPincode } from "./pincode.service";

export const useGetCitySateFromPincode = (pincode) => {
  return useQuery({
    queryKey: ["pincode", pincode],
    queryFn: () => getCitySateFromPincode(pincode),
    staleTime: 5 * 60 * 1000,
    enabled: pincode?.length === 6,
    keepPreviousData: true,
  });
};
