import { createContext, useContext } from "react";
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
  console.log(data);

  return <div className="flex flex-col gap-2">{data.map(render)}</div>;
}

function Row({ tickets }) {
  const { id, type, date, status, summary, reporter, asignee } = tickets;

  const { columns } = useContext(TableContext);

  return (
    <div
      className="grid rounded-md bg-stone-100 py-2"
      style={{ gridTemplateColumns: columns }}
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
        <div className="h-6 w-6 rounded-full bg-blue-400"></div>
        {asignee}
      </TableRow>
    </div>
  );
}

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;

export default Table;
