import { useQuery } from "@tanstack/react-query";
import { getAllOffers } from "./offers.service";

// Get all offers
export const useGetAllOffers = () => {
  return useQuery({
    queryKey: ["offers"],
    queryFn: getAllOffers,
  });
};
