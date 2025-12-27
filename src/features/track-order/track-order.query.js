import { useQuery } from "@tanstack/react-query";
import { trackParcel } from "./track-order.service";

export const useTrackOrder = ({ order_number }) => {
  return useQuery({
    queryKey: ["track-order", order_number],
    queryFn: () => trackParcel({ order_number }),
    enabled: !!order_number,
    retry: false,
  });
};
