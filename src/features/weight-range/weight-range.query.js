import { useMutation } from "@tanstack/react-query";
import { checkWeightRangeServiceability } from "./weight-range.service";

// Check weight range serviceability
export const useCheckWeightRangeServiceability = ({
  onSuccess,
  onError,
  ...rest
}) => {
  return useMutation({
    mutationFn: checkWeightRangeServiceability,
    onSuccess,
    onError,
    ...rest,
  });
};
