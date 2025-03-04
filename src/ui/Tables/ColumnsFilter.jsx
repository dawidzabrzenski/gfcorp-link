function ColumnsFilter({
  columns,
  columnsFilter,
  setColumnsFilter,
  columnVisibility,
  setColumnVisibility,
}) {
  return (
    <div
      onClick={() => setColumnsFilter((prev) => !prev)}
      className="outline-blue border-rounded relative h-fit cursor-pointer bg-dark-darkbg p-2 hover:border-dark-mainborderhover"
    >
      Filtry
      {columnsFilter && (
        <div className="border-rounded absolute left-0 top-0 flex translate-x-1/3 flex-col gap-[0.7rem] whitespace-nowrap bg-dark-lightbg p-4">
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
          <button
            onClick={() =>
              setColumnVisibility({
                twr_Ean: true,
                twr_Katalog: true,
                twr_Kod: true,
                twr_Nazwa: true,
                price: true,
                twr_IloscSell: true,
                twr_IloscMag: true,
                twr_IloscRez: true,
                twr_kraj: true,
              })
            }
            className="border-rounded mt-2 bg-dark-mainbg px-4 py-2"
          >
            Zresetuj
          </button>
        </div>
      )}
    </div>
  );
}

export default ColumnsFilter;
