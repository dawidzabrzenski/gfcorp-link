import { useState } from "react";
import { useUsers } from "../features/authentication/useUsers";

import Table from "./Tables/Table";
import SearchInput from "./Tables/SearchInput";
import SearchOptionsWrapper from "./Tables/SearchOptionsWrapper";

import AddUserTrigger from "./Users/AddUserTrigger";
import EditUserTrigger from "./Users/EditUserTrigger";
import DeleteUserTrigger from "./Users/DeleteUserTrigger";

function UsersComponent() {
  const { usersData } = useUsers();

  const [filter, setFilter] = useState("");

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
          <EditUserTrigger data={row.original} />
          <DeleteUserTrigger data={row.original} />
        </div>
      ),
    },
  ];

  return (
    <>
      <SearchOptionsWrapper>
        <SearchInput
          label="Wyszukaj użytkownika"
          placeholder="Filtr (e-mail, imię, nazwisko)"
          value={filter}
          onChange={setFilter}
          onClear={() => setFilter("")}
        />
        <AddUserTrigger />
      </SearchOptionsWrapper>
      <Table
        data={usersData}
        columnsSchema={columns}
        filter={filter}
        setFilter={setFilter}
      />
    </>
  );
}

export default UsersComponent;
