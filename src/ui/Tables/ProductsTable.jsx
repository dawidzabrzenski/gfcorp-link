import { useProductPrice } from "../../features/products/useProductPrice";
import { useProducts } from "../../features/products/useProducts";
import { getPrice } from "../../services/apiProducts";
import PriceCell from "./PriceCell";
import Table from "./Table";

function UserTable() {
  const { productsData } = useProducts();

  const columns = [
    { accessorKey: "twr_Ean", header: "EAN" },
    { accessorKey: "twr_Katalog", header: "Symbol IAI" },
    { accessorKey: "twr_Kod", header: "Kod" },
    { accessorKey: "twr_Nazwa", header: "Nazwa" },
    { accessorKey: "twr_kraj", header: "Kraj" },
    {
      accessorKey: "twr_GIDNumer",
      header: "Cena detaliczna",
      cell: ({ row }) => <PriceCell id={row.original.twr_GIDNumer} />,
    },
  ];

  return <Table data={productsData} columnsSchema={columns} noWrap={true} />;
}

export default UserTable;
