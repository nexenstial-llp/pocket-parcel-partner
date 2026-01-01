import { useQuery } from "@tanstack/react-query";
import { getAllOffers } from "./offers.service";

// Get all offers
export const useGetAllOffers = ({ params }) => {
  return useQuery({
    queryKey: ["offers", params],
    queryFn: () => getAllOffers(params),
  });
};
