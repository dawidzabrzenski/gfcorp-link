import { useProducts } from "../../features/products/useProducts";
import Table from "./Table";

function UserTable() {
  const { productsData } = useProducts();

  const columns = [
    { accessorKey: "twr_Nazwa", header: "Nazwa" },
    { accessorKey: "twr_GIDNumer", header: "GID Numer" },
    { accessorKey: "twr_Kod", header: "Kod" },
    { accessorKey: "twr_Typ", header: "Typ" },
    { accessorKey: "twr_Nazwa1", header: "Nazwa 1" },
    { accessorKey: "twr_Katalog", header: "Katalog" },
    { accessorKey: "twr_Ean", header: "EAN" },
    { accessorKey: "twr_Kategoria", header: "Kategoria" },
    { accessorKey: "twr_KategoriaId", header: "Kategoria ID" },
    { accessorKey: "twr_kraj", header: "Kraj" },
    { accessorKey: "twr_Sww", header: "SWW" },
    { accessorKey: "twr_Jm", header: "Jednostka miary" },
    { accessorKey: "twr_PCN", header: "PCN" },
    { accessorKey: "twr_grupaPod", header: "Grupa Pod" },
    { accessorKey: "twr_stawkaPod", header: "Stawka Pod" },
    { accessorKey: "twr_GrupaPodSpr", header: "Grupa Pod Spr" },
    { accessorKey: "twr_StawkaPodSpr", header: "Stawka Pod Spr" },
    { accessorKey: "twr_Waga", header: "Waga" },
    { accessorKey: "twr_WJm", header: "Jednostka wagi" },
    { accessorKey: "twr_WagaBrutto", header: "Waga brutto" },
    { accessorKey: "twr_WJmBrutto", header: "Jednostka wagi brutto" },
    { accessorKey: "twr_ObjetoscL", header: "Objętość" },
    { accessorKey: "twr_Wcenniku", header: "W cenniku" },
    { accessorKey: "tap_Status", header: "Status" },
    { accessorKey: "tap_ZapowiedzDataOd", header: "Zapowiedź Data Od" },
    { accessorKey: "dataModyfikacji", header: "Data modyfikacji" },
    { accessorKey: "producent", header: "Producent" },
    { accessorKey: "marka", header: "Marka" },
  ];

  // return <button onClick={() => console.log(productsData)}>Test</button>;

  return <Table data={productsData} columnsSchema={columns} />;
}

export default UserTable;
