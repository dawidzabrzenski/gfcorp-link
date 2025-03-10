import { useProductQuantity } from "../../features/products/useProductQuantity";

function QuantityCell({ id, quantityType }) {
  const { productQuantity, isLoading, error } = useProductQuantity(id);

  if (isLoading) return <div>Ładowanie...</div>;
  if (error) return <div>Błąd: {error.message}</div>;

  const quantity =
    productQuantity.length !== 0 ? productQuantity[quantityType] : "brak";

  return <div>{quantity}</div>;
}

export default QuantityCell;
