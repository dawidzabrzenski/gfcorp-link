import { useQuery } from "@tanstack/react-query";
import { getPrice } from "../../services/apiProducts";

export function useProductPrice(id) {
  const {
    data: productsPrice,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["productPrice", id],
    queryFn: () => getPrice(id),
  });

  return { productsPrice, error, isLoading };
}
