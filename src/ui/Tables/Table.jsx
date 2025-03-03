import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import Skeleton from "react-loading-skeleton";
import { CloseRounded } from "@mui/icons-material";

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
        <div className="flex flex-col gap-2">
          <p className="text-xl font-semibold">Szukaj po nazwie</p>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Część nazwy np. AK74..."
              className="mb-2 w-fit cursor-pointer rounded border border-dark-mainborder bg-dark-darkbg p-2 transition-all duration-300 hover:border-dark-mainborderhover focus:outline-none"
              value={prodName}
              onChange={(e) => handleProdName(e.target.value)}
            />
            {prodName && (
              <button
                onClick={() => handleProdName("")}
                className="h-fit cursor-pointer rounded-lg border border-dark-mainborder px-2 py-1 text-red-600 transition-all duration-300 hover:border-dark-mainborderhover hover:text-red-500"
              >
                &#10005;
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xl font-semibold">Szukaj po kodzie</p>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Część kodu np. JGW-03..."
              className="mb-2 w-fit cursor-pointer rounded border border-dark-mainborder bg-dark-darkbg p-2 transition-all duration-300 hover:border-dark-mainborderhover focus:outline-none"
              value={prodCode}
              onChange={(e) => handleProdCode(e.target.value)}
            />
            {prodCode && (
              <button
                onClick={() => handleProdCode("")}
                className="h-fit cursor-pointer rounded-lg border border-dark-mainborder px-2 py-1 text-red-600 transition-all duration-300 hover:border-dark-mainborderhover hover:text-red-500"
              >
                &#10005;
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xl font-semibold">Filtruj wyniki poniżej</p>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Filtr (EAN, cena, kod)"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="mb-2 w-fit cursor-pointer rounded border border-dark-mainborder bg-dark-darkbg p-2 transition-all duration-300 hover:border-dark-mainborderhover focus:outline-none"
            />
            {filter && (
              <button
                onClick={() => setFilter("")}
                className="h-fit cursor-pointer rounded-lg border border-dark-mainborder px-2 py-1 text-red-600 transition-all duration-300 hover:border-dark-mainborderhover hover:text-red-500"
              >
                &#10005;
              </button>
            )}
          </div>
        </div>
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
