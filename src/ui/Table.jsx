import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";

export default function Table({ usersData }) {
  const data = usersData;

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
        className="mb-2 rounded border border-dark-mainborder bg-dark-mainbg p-2"
      />
      <table className="w-full border-collapse">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="cursor-pointer border border-dark-mainborder bg-dark-mainbg p-2 font-bold"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                  {header.column.getIsSorted() === "asc" ? " ↑" : " ↓"}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border border-dark-mainborder p-2">
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
          className="border p-1"
        >
          ←
        </button>
        <span className="px-2">
          Strona {table.getState().pagination.pageIndex + 1}
        </span>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="border p-1"
        >
          →
        </button>
      </div>
    </div>
  );
}
