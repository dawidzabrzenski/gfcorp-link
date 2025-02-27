import { useQuery } from "@tanstack/react-query";
import { getQuantity } from "../../services/apiProducts";

export function useProductQuantity(id) {
  const {
    data: productQuantity,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["productQuantity", id],
    queryFn: () => getQuantity(id),
  });

  return { productQuantity, error, isLoading };
}
