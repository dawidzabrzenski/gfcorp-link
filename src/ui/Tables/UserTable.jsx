import {
  DeleteRounded as TrashBin,
  CreateRounded as Edit,
} from "@mui/icons-material";

import { useUsers } from "../../features/authentication/useUsers";

import Table from "./Table";

function UserTable() {
  const { usersData } = useUsers();

  const columns = [
    { accessorKey: "email", header: "E-mail" },
    { accessorKey: "firstName", header: "Imię" },
    { accessorKey: "lastName", header: "Nazwisko" },
    { accessorKey: "group", header: "Grupa" },
    {
      header: "",
      id: "actions",
      enableSorting: false,
      cell: ({ row }) => (
        <div className="flex justify-center gap-2">
          <button
            onClick={() => console.log(row.original)}
            className="rounded bg-dark-lighterbg px-2 py-1 text-white transition-all"
          >
            <TrashBin fontSize="very-small" />
          </button>
          <button
            onClick={() => console.log(row.original)}
            className="rounded bg-dark-lighterbg px-2 py-1 text-white transition-all"
          >
            <Edit fontSize="very-small" />
          </button>
        </div>
      ),
    },
  ];

  return <Table data={usersData} columnsSchema={columns} />;
}

export default UserTable;
