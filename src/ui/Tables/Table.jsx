import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import TablePaginationButton from "./TablePaginationButton";

export default function Table({ data, columnsSchema, noWrap }) {
  const [filter, setFilter] = useState("");

  // const data = useMemo(() => usersData, [usersData]);

  const columns = useMemo(() => columnsSchema, []);

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
    initialState: {
      pagination: {
        pageSize: 25,
      },
    },
    onGlobalFilterChange: setFilter,
  });

  return (
    <div>
      <div>
        <p>Wyszukiwarka</p>
        <input
          type="text"
          placeholder="Wyszukaj"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="mb-2 cursor-pointer rounded border border-dark-mainborder bg-dark-mainbg p-2 transition-all duration-300 hover:border-dark-mainborderhover focus:outline-none"
        />
      </div>
      <div>
        <table className="border-collapse">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={`${noWrap ? "whitespace-nowrap" : ""} cursor-pointer border border-dark-mainborder bg-dark-mainbg p-2 font-bold transition-all duration-200 hover:bg-dark-lightbg`}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                    {header.column.getCanSort() &&
                      (header.column.getIsSorted() === "asc"
                        ? " ↑"
                        : " ↓")}{" "}
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
                    className={`${noWrap ? "whitespace-nowrap" : ""} border border-dark-mainborder p-2 transition-all duration-200 hover:bg-dark-lightbg`}
                  >
                    {!cell.getValue() ? (
                      <p className="text-dark-notactive">brak</p>
                    ) : (
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-2">
        <TablePaginationButton
          handleClick={() => table.previousPage()}
          handleDisabled={!table.getCanPreviousPage()}
        >
          ←
        </TablePaginationButton>
        <span className="px-2">
          Strona {table.getState().pagination.pageIndex + 1}
        </span>

        <TablePaginationButton
          handleClick={() => table.nextPage()}
          handleDisabled={!table.getCanNextPage()}
        >
          →
        </TablePaginationButton>
      </div>
    </div>
  );
}
