import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import TableRow from "./TableRow";
import StatusButton from "./StatusButton";

const TableContext = createContext();

function Table({ columns, children }) {
  return (
    <TableContext.Provider value={{ columns }}>
      {children}
    </TableContext.Provider>
  );
}

function Header({ children }) {
  const { columns } = useContext(TableContext);

  return (
    <header style={{ gridTemplateColumns: columns }} className="grid">
      {children}
    </header>
  );
}

function Body({ data, render }) {
  return <div className="flex flex-col gap-2">{data.map(render)}</div>;
}

function Row({ tickets }) {
  const { id, type, date, status, summary, reporter, asignee } = tickets;

  const { columns } = useContext(TableContext);
  const navigate = useNavigate();

  return (
    <div
      className="grid cursor-pointer rounded-md bg-stone-100 py-2 transition-colors duration-300 hover:bg-stone-200"
      style={{ gridTemplateColumns: columns }}
      onClick={() => navigate(`/tickets/${id}`)}
    >
      <TableRow type="bold">{id}</TableRow>
      <TableRow>{date.split("T")[0]}</TableRow>
      <TableRow type="bold">{type}</TableRow>
      <TableRow>
        <StatusButton status={status} />
      </TableRow>
      <TableRow>{summary}</TableRow>
      <TableRow>
        <div className="h-6 w-6 rounded-full bg-red-400"></div>
        {reporter}
      </TableRow>
      <TableRow>
        {asignee && <div className="h-6 w-6 rounded-full bg-blue-400"></div>}
        {asignee || <p className="text-gray-600">Nobody is assigned yet</p>}
      </TableRow>
    </div>
  );
}

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;

export default Table;
