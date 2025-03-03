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

export default function Table({
  data,
  columnsSchema,
  noWrap,
  page,
  setPage,
  prodName = "",
  prodCode = "",
  handleProdName,
  handleProdCode,
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
    },
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
                      onClick={() =>
                        console.log(
                          flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          ),
                        )
                      }
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
