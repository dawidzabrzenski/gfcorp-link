import React, { useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import Skeleton from "react-loading-skeleton";

import TablePaginationButton from "./TablePaginationButton";

export default function Table({
  data,
  dataPerPage,
  filter,
  setFilter,
  columnsSchema,
  noWrap,
  page,
  setPage,
  columnVisibility,
  setColumnVisibility,
}) {
  const columns = useMemo(() => columnsSchema, [columnsSchema]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: filter,
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
    autoResetPageIndex: true,
    manualPagination: true,
    onGlobalFilterChange: setFilter,
  });

  return (
    <div>
      <div>
        <table className="border-collapse text-sm">
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
                {row.getVisibleCells().map((cell) => {
                  const cellValue = cell.getValue();
                  return (
                    <td
                      key={cell.id}
                      className={`${noWrap ? "whitespace-nowrap" : ""} border border-dark-mainborder p-2 transition-all duration-200 hover:bg-dark-lightbg`}
                    >
                      {cellValue === "loading" ? (
                        <Skeleton count={1} width="80%" height={17} />
                      ) : cellValue === null || cellValue === "" ? (
                        <p className="text-dark-notactive">brak</p>
                      ) : (
                        flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex gap-6">
        <div className="mt-2">
          <TablePaginationButton
            handleClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            handleDisabled={page === 1}
          >
            ←
          </TablePaginationButton>
          <span className="px-2">Strona {page}</span>
          <TablePaginationButton
            handleClick={() => setPage((prev) => prev + 1)}
            handleDisabled={data.length < dataPerPage}
          >
            →
          </TablePaginationButton>
          {page > 1 && (
            <span className="px-2">
              <TablePaginationButton handleClick={() => setPage(1)}>
                Powrót do pierwszej strony
              </TablePaginationButton>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
