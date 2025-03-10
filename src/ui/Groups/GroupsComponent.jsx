import { useState } from "react";
import { useGroups } from "../../features/permissions/useGroups";

import Table from "../Tables/Table";
import SearchInput from "../Tables/SearchInput";
import SearchOptionsWrapper from "../Tables/SearchOptionsWrapper";

function GroupsComponent() {
  const { groupsData, pendingGroups } = useGroups();

  const [filter, setFilter] = useState("");

  const columns = [
    { accessorKey: "visibleName", header: "Nazwa roli" },
    { accessorKey: "name", header: "Nazwa ID" },
    {
      header: "Ilość uprawnień",
      accessorKey: "permissions",
      cell: ({ row }) => row.original.permissions.length,
    },
    {
      header: "",
      id: "actions",
      enableSorting: false,
      cell: ({ row }) => (
        <div className="flex justify-center gap-2">
          <button>1</button>
          <button>2</button>
        </div>
      ),
    },
  ];

  return (
    <>
      <SearchOptionsWrapper>
        <SearchInput
          label="Wyszukaj grupę uprawnień"
          placeholder="Filtr (Nazwa roli, ID)"
          value={filter}
          onChange={setFilter}
          onClear={() => setFilter("")}
        />
        {/* <AddUserTrigger /> */}
      </SearchOptionsWrapper>
      {!pendingGroups && (
        <Table
          data={groupsData}
          columnsSchema={columns}
          filter={filter}
          setFilter={setFilter}
        />
      )}
    </>
  );
}

export default GroupsComponent;
