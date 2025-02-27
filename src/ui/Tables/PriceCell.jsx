import { useProductPrice } from "../../features/products/useProductPrice";

function PriceCell({ id }) {
  const { productsPrice, error, isLoading } = useProductPrice(id);

  if (isLoading) return <div>Ładowanie...</div>;
  if (error) return <div>Błąd: {error.message}</div>;

  return <div>{productsPrice} PLN</div>;
}

export default PriceCell;
