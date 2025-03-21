import { useState, useEffect } from "react";

import { useProductsData } from "../features/products/useProductsData";

import ProductsTable from "./Tables/ProductsTable";
import SearchInput from "./Tables/SearchInput";
import DataPerPage from "./Tables/DataPerPage";
import ColumnsFilter from "./Tables/ColumnsFilter";
import SearchOptionsWrapper from "./Tables/SearchOptionsWrapper";
import Spinner from "./Loaders/Spinner";

function ProductsComponent() {
  const [page, setPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(50);
  const [filter, setFilter] = useState("");
  const [prodName, setProdName] = useState("");
  const [prodCode, setProdCode] = useState("");
  const [debouncedProdName, setDebouncedProdName] = useState(prodName);
  const [debouncedProdCode, setDebouncedProdCode] = useState(prodCode);
  const [columnsFilter, setColumnsFilter] = useState(false);

  const [columnVisibility, setColumnVisibility] = useState(() => ({
    twr_Ean: true,
    twr_Katalog: true,
    twr_Kod: true,
    twr_Nazwa: true,
    price: true,
    twr_IloscSell: true,
    twr_IloscMag: true,
    twr_IloscRez: true,
    twr_kraj: true,
  }));

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
    columnVisibility,
  );

  const columns = [
    { accessorKey: "twr_Ean", header: "EAN" },
    { accessorKey: "twr_Katalog", header: "Symbol IAI" },
    { accessorKey: "twr_Kod", header: "Kod" },
    { accessorKey: "twr_Nazwa", header: "Nazwa" },
    {
      accessorKey: "price",
      header: "Cena",
      cell: ({ getValue }) => <div>{getValue() || "brak"}</div>,
    },
    {
      accessorKey: "twr_IloscSell",
      header: "Ilość do sprzedaży",
      accessorFn: (row) => row?.quantity?.twr_IloscSell ?? 0,
      cell: ({ getValue }) => <div>{getValue()}</div>,
    },
    {
      accessorKey: "twr_IloscMag",
      header: "Ilość magazynowa",
      accessorFn: (row) => row?.quantity?.twr_IloscMag ?? 0,
      cell: ({ getValue }) => <div>{getValue()}</div>,
    },
    {
      accessorKey: "twr_IloscRez",
      header: "Ilość rezerwacji",
      accessorFn: (row) => row?.quantity?.twr_IloscRez ?? 0,
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
        <>
          <SearchOptionsWrapper>
            <SearchInput
              label="Szukaj po nazwie"
              placeholder="Część nazwy np. AK74..."
              value={prodName}
              onChange={setProdName}
              onClear={() => setProdName("")}
            />
            <SearchInput
              label="Szukaj po kodzie"
              placeholder="Część kodu np. JGW-03..."
              value={prodCode}
              onChange={setProdCode}
              onClear={() => setProdCode("")}
            />
            <SearchInput
              label="Filtruj wyniki poniżej"
              placeholder="Filtr (EAN, cena, kod)"
              value={filter}
              onChange={setFilter}
              onClear={() => setFilter("")}
            />
            <DataPerPage
              dataPerPage={dataPerPage}
              setDataPerPage={setDataPerPage}
            />
            <ColumnsFilter
              columns={columns}
              columnsFilter={columnsFilter}
              setColumnsFilter={setColumnsFilter}
              columnVisibility={columnVisibility}
              setColumnVisibility={setColumnVisibility}
            />
          </SearchOptionsWrapper>
          <ProductsTable
            data={productsData || []}
            dataPerPage={dataPerPage}
            columnsSchema={columns}
            filter={filter}
            setFilter={setFilter}
            noWrap={true}
            page={page}
            setPage={setPage}
            columnVisibility={columnVisibility}
            setColumnVisibility={setColumnVisibility}
          />
        </>
      )}
    </div>
  );
}

export default ProductsComponent;
