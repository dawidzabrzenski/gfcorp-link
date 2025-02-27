import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../services/apiProducts";

export function useProducts() {
  const {
    data: productsData,
    error,
    isPending,
  } = useQuery({
    queryKey: ["productsData"],
    queryFn: getProducts,
  });

  return { productsData, error, isPending };
}
