import { useState } from "react";
import { useGroups } from "../../features/permissions/useGroups";

import AddGroupTrigger from "./AddGroupTrigger";
import Table from "../Tables/Table";
import SearchInput from "../Tables/SearchInput";
import SearchOptionsWrapper from "../Tables/SearchOptionsWrapper";
import EditGroupTrigger from "./EditGroupTrigger";
import DeleteGroupTrigger from "./DeleteGroupTrigger";

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
          <EditGroupTrigger data={row.original} />
          <DeleteGroupTrigger data={row.original} />
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
        <AddGroupTrigger />
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
