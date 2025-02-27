import Spinner from "../ui/Loaders/Spinner";
import ProductsTable from "../ui/Tables/ProductsTable";

import { useProducts } from "../features/products/useProducts";

function Users() {
  const { isPending } = useProducts();

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-3xl font-bold">Produkty</h2>
      {isPending ? (
        <div className="flex justify-center">
          <Spinner />
        </div>
      ) : (
        <ProductsTable />
      )}
    </div>
  );
}

export default Users;
