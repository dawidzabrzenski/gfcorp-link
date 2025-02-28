import { useProductsData } from "../../features/products/useProductsData";
import Table from "./Table";

function ProductsTable() {
  const { productsData } = useProductsData();

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
    <Table data={productsData || []} columnsSchema={columns} noWrap={true} />
  );
}

export default ProductsTable;
