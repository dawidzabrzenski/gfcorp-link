import { useQuery } from "@tanstack/react-query";
import {
  getProducts,
  getProductsPrices,
  getProductsQuantities,
} from "../../services/apiProducts";
import { useMemo } from "react";

export function useProductsData() {
  const {
    data: productsData,
    error: productsError,
    isPending: productsLoading,
  } = useQuery({
    queryKey: ["productsData"],
    queryFn: getProducts,
  });

  const productIds = useMemo(() => {
    return productsData
      ? productsData.map((product) => product.twr_GIDNumer)
      : [];
  }, [productsData]);

  const {
    data: pricesData,
    error: pricesError,
    isPending: pricesLoading,
  } = useQuery({
    queryKey: ["productsPrices", productIds],
    queryFn: () => getProductsPrices(productIds),
    enabled: productIds.length > 0,
  });

  const {
    data: quantitiesData,
    error: quantitiesError,
    isPending: quantitiesLoading,
  } = useQuery({
    queryKey: ["productsQuantities", productIds],
    queryFn: () => getProductsQuantities(productIds),
    enabled: productIds.length > 0,
  });

  const combinedData = useMemo(() => {
    if (!productsData || !pricesData || !quantitiesData) return null;
    return productsData.map((product) => ({
      ...product,
      price: pricesData[product.twr_GIDNumer] || "N/A",
      quantity: quantitiesData[product.twr_GIDNumer] || {
        twr_IloscSell: 0,
        twr_IloscMag: 0,
        twr_IloscRez: 0,
      },
    }));
  }, [productsData, pricesData, quantitiesData]);

  console.log("Products:", productsData);
  console.log("Prices:", pricesData);
  console.log("Quantities:", quantitiesData);
  console.log("Combined:", combinedData);

  return {
    productsData: combinedData,
    isLoading: productsLoading || pricesLoading || quantitiesLoading,
    error: productsError || pricesError || quantitiesError,
  };
}
