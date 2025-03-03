import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import Skeleton from "react-loading-skeleton";

import SearchInput from "./SearchInput";
import TablePaginationButton from "./TablePaginationButton";
import Button from "../Button";

export default function Table({
  data,
  dataPerPage,
  handleDataPerPage,
  columnsSchema,
  noWrap,
  page,
  setPage,
  prodName = "",
  prodCode = "",
  handleProdName,
  handleProdCode,
  columnVisibility,
  setColumnVisibility,
}) {
  const [filter, setFilter] = useState("");

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
      <div className="mb-2 flex gap-2 rounded-lg border border-dark-mainborder bg-dark-mainbg p-4">
        <SearchInput
          label="Szukaj po nazwie"
          placeholder="Część nazwy np. AK74..."
          value={prodName}
          onChange={handleProdName}
          onClear={() => handleProdName("")}
        />
        <SearchInput
          label="Szukaj po kodzie"
          placeholder="Część kodu np. JGW-03..."
          value={prodCode}
          onChange={handleProdCode}
          onClear={() => handleProdCode("")}
        />
        <SearchInput
          label="Filtruj wyniki poniżej"
          placeholder="Filtr (EAN, cena, kod)"
          value={filter}
          onChange={setFilter}
          onClear={() => setFilter("")}
        />
        <div className="flex flex-col gap-2">
          <p className="text-xl font-semibold">Ilość wyników na stronę</p>
          <select
            value={dataPerPage}
            onChange={(e) => handleDataPerPage(e.target.value)}
            className="outline-blue mb-2 cursor-pointer rounded border border-dark-mainborder bg-dark-darkbg p-2 transition-all duration-300 hover:border-dark-mainborderhover"
          >
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={200}>200</option>
          </select>
        </div>
        <button className="outline-blue h-fit cursor-pointer rounded border border-dark-mainborder bg-dark-darkbg p-2 transition-all duration-300 hover:border-dark-mainborderhover">
          Filtr
        </button>
        {/* <div>
          {columns.map((col) => (
            <div key={col.accessorKey} className="flex items-center gap-2">
              <input
                className={`${col.accessorKey === "twr_Ean" ? "hidden" : ""}`}
                type="checkbox"
                checked={columnVisibility[col.accessorKey] || false}
                disabled={col.accessorKey === "twr_Ean"}
                onChange={() =>
                  setColumnVisibility((prev) => ({
                    ...prev,
                    [col.accessorKey]: !prev[col.accessorKey],
                  }))
                }
              />
              <label
                className={`${col.accessorKey === "twr_Ean" ? "hidden" : ""}`}
              >
                {col.header}
              </label>
            </div>
          ))}
        </div> */}
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
            handleDisabled={data.length < 50}
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
