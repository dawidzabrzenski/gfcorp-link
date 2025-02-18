import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  DeleteRounded as TrashBin,
  CreateRounded as Edit,
} from "@mui/icons-material";

export default function Table({ usersData }) {
  const data = usersData;

  const handleEdit = (user) => {
    console.log("Edytowanie użytkownika:", user);
    // Tutaj można dodać logikę nawigacji lub otwierania modala z edycją.
  };

  const columns = [
    {
      accessorKey: "email",
      header: "E-mail",
    },
    {
      accessorKey: "firstName",
      header: "Imię",
    },
    {
      accessorKey: "lastName",
      header: "Nazwisko",
    },
    {
      accessorKey: "group",
      header: "Grupa ",
    },
    {
      header: "",
      id: "actions",
      enableSorting: false,
      cell: ({ row }) => (
        <div className="flex justify-center gap-2">
          <button
            onClick={() => handleEdit(row.original)}
            className="bg-dark-lighterbg rounded px-2 py-1 text-white transition-all"
          >
            <TrashBin fontSize="very-small" />
          </button>
          <button
            onClick={() => handleEdit(row.original)}
            className="bg-dark-lighterbg rounded px-2 py-1 text-white transition-all"
          >
            <Edit fontSize="very-small" />
          </button>
        </div>
      ),
    },
  ];

  const [filter, setFilter] = useState("");
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: filter,
    },
    onGlobalFilterChange: setFilter,
  });

  return (
    <div>
      <input
        type="text"
        placeholder="Wyszukaj"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="mb-2 cursor-pointer rounded border border-dark-mainborder bg-dark-mainbg p-2 transition-all duration-300 hover:border-dark-mainborderhover focus:outline-none"
      />
      <table className="w-full border-collapse">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="cursor-pointer border border-dark-mainborder bg-dark-mainbg p-2 font-bold transition-all duration-200 hover:bg-dark-lightbg"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                  {header.column.getCanSort() &&
                    (header.column.getIsSorted() === "asc" ? " ↑" : " ↓")}{" "}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="border border-dark-mainborder p-2 transition-all duration-200 hover:bg-dark-lightbg"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-2">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="cursor-pointer rounded-lg border border-dark-mainborder px-4 py-1 transition-all duration-300 hover:border-dark-mainborderhover"
        >
          ←
        </button>
        <span className="px-2">
          Strona {table.getState().pagination.pageIndex + 1}
        </span>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="cursor-pointer rounded-lg border border-dark-mainborder px-4 py-1 transition-all duration-300 hover:border-dark-mainborderhover"
        >
          →
        </button>
      </div>
    </div>
  );
}
