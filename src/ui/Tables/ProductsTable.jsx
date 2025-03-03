import { useState, useEffect } from "react";
import { useProductsData } from "../../features/products/useProductsData";
import Table from "./Table";
import Spinner from "../Loaders/Spinner";

function ProductsTable() {
  const [page, setPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(50);
  const [prodName, setProdName] = useState("");
  const [prodCode, setProdCode] = useState("");
  const [debouncedProdName, setDebouncedProdName] = useState(prodName);
  const [debouncedProdCode, setDebouncedProdCode] = useState(prodCode);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedProdName(prodName);
    }, 700);
    return () => clearTimeout(timer);
  }, [prodName]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedProdCode(prodCode);
    }, 700);
    return () => clearTimeout(timer);
  }, [prodCode]);

  useEffect(() => {
    setPage(1);
  }, [debouncedProdName, debouncedProdCode]);

  const { productsData, isLoading } = useProductsData(
    page,
    debouncedProdName,
    debouncedProdCode,
    dataPerPage,
  );

  const columns = [
    { accessorKey: "twr_Ean", header: "EAN" },
    { accessorKey: "twr_Katalog", header: "Symbol IAI" },
    { accessorKey: "twr_Kod", header: "Kod" },
    { accessorKey: "twr_Nazwa", header: "Nazwa" },
    {
      accessorKey: "price",
      header: "Cena",
      cell: ({ getValue }) => <div>{getValue()}</div>,
    },
    {
      accessorKey: "quantity.twr_IloscSell",
      header: "Ilość do sprzedaży",
      cell: ({ getValue }) => <div>{getValue()}</div>,
    },
    {
      accessorKey: "quantity.twr_IloscMag",
      header: "Ilość magazynowa",
      cell: ({ getValue }) => <div>{getValue()}</div>,
    },
    {
      accessorKey: "quantity.twr_IloscRez",
      header: "Ilość rezerwacji",
      cell: ({ getValue }) => <div>{getValue()}</div>,
    },
    { accessorKey: "twr_kraj", header: "Kraj Pochodzenia" },
  ];

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center">
          <Spinner />
        </div>
      ) : (
        <Table
          data={productsData || []}
          dataPerPage={dataPerPage}
          handleDataPerPage={setDataPerPage}
          columnsSchema={columns}
          noWrap={true}
          page={page}
          setPage={setPage}
          prodCode={prodCode}
          prodName={prodName}
          handleProdCode={setProdCode}
          handleProdName={setProdName}
        />
      )}
    </div>
  );
}

export default ProductsTable;
