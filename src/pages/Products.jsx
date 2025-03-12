import Spinner from "../ui/Loaders/Spinner";
import ProductsComponent from "../ui/ProductsComponent";
import { useProductsData } from "../features/products/useProductsData";
import ServerErrorImg from "../assets/503.svg";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";

function Products() {
  const { isLoading, error } = useProductsData();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex w-full">
        <div className="flex flex-grow flex-col items-center justify-center gap-4 text-white">
          <img className="w-1/3" src={ServerErrorImg} alt="Not found" />
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-6xl text-dark-placeholder">503</h2>
            <p className="text-2xl font-semibold">Błąd serwera API</p>
            <p className="text-xl font-semibold">
              Skontaktuj się z administratorem
            </p>
            <p className="text-gray-600">Error: {error.message}</p>
          </div>

          <div onClick={() => navigate("/dashboard", { replace: true })}>
            <Button type="button" buttonStyle="light">
              Wróć do Dashboarda
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-3xl font-bold">Produkty</h2>
      <ProductsComponent />
    </div>
  );
}

export default Products;
