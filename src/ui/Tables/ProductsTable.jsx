import { useProductQuantity } from "../../features/products/useProductQuantity";
import { useProducts } from "../../features/products/useProducts";
import { getQuantity } from "../../services/apiProducts";
import PriceCell from "./PriceCell";
import QuantityCell from "./QuantityCell";
import Table from "./Table";

function UserTable() {
  const { productsData } = useProducts();

  const columns = [
    { accessorKey: "twr_Ean", header: "EAN" },
    { accessorKey: "twr_Katalog", header: "Symbol IAI" },
    { accessorKey: "twr_Kod", header: "Kod" },
    { accessorKey: "twr_Nazwa", header: "Nazwa" },
    // {
    //   accessorKey: "twr_GIDNumer",
    //   header: "Cena",
    //   cell: ({ row }) => <PriceCell id={row.original.twr_GIDNumer} />,
    // },
    {
      accessorKey: "twr_GIDNumer",
      header: "Ilość do sprzedaży",
      cell: ({ row }) => (
        <QuantityCell
          id={row.original.twr_GIDNumer}
          quantityType="twr_IloscSell"
        />
      ),
    },
    {
      accessorKey: "twr_GIDNumer",
      header: "Ilość magazynowa",
      cell: ({ row }) => (
        <QuantityCell
          id={row.original.twr_GIDNumer}
          quantityType="twr_IloscMag"
        />
      ),
    },
    {
      accessorKey: "twr_GIDNumer",
      header: "Ilość rezerwacji",
      cell: ({ row }) => (
        <QuantityCell
          id={row.original.twr_GIDNumer}
          quantityType="twr_IloscRez"
        />
      ),
    },
    { accessorKey: "twr_kraj", header: "Kraj Pochodzenia" },
  ];

  return <Table data={productsData} columnsSchema={columns} noWrap={true} />;
}

export default UserTable;
