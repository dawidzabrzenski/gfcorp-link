import Spinner from "../ui/Loaders/Spinner";
import ProductsTable from "../ui/Tables/ProductsTable";
import { useProductsData } from "../features/products/useProductsData";

function Products() {
  const { isLoading, error } = useProductsData();

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-3xl font-bold">Produkty</h2>
      <ProductsTable />
    </div>
  );
}

export default Products;
