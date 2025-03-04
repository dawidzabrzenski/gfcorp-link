function DataPerPage({ dataPerPage, setDataPerPage }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xl font-semibold">Ilość wyników na stronę</p>
      <select
        value={dataPerPage}
        onChange={(e) => setDataPerPage(e.target.value)}
        className="outline-blue border-rounded cursor-pointer bg-dark-darkbg p-2 hover:border-dark-mainborderhover"
      >
        <option value={25}>25</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
        <option value={200}>200</option>
      </select>
    </div>
  );
}

export default DataPerPage;
