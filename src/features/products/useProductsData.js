import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import {
  getProducts,
  getProductsPrices,
  getProductsQuantities,
} from "../../services/apiProducts";

export function useProductsData(page = 1) {
  const {
    data: productsData,
    error: productsError,
    isPending: productsLoading,
  } = useQuery({
    queryKey: ["productsData", page],
    queryFn: () => getProducts(page),
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
    if (!productsData) return [];
    return productsData.map((product) => ({
      ...product,
      price: pricesData ? pricesData[product.twr_GIDNumer] || "N/A" : "loading",
      quantity: quantitiesData
        ? quantitiesData[product.twr_GIDNumer] || {
            twr_IloscSell: 0,
            twr_IloscMag: 0,
            twr_IloscRez: 0,
          }
        : {
            twr_IloscSell: "loading",
            twr_IloscMag: "loading",
            twr_IloscRez: "loading",
          },
    }));
  }, [productsData, pricesData, quantitiesData]);

  return {
    productsData: combinedData,
    isLoading: productsLoading,
    pricesLoading,
    quantitiesLoading,
    error: productsError || pricesError || quantitiesError,
  };
}
