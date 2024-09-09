import { createContext, useContext } from "react";

const TableContext = createContext();

function Table({ columns, children }) {
  return (
    <TableContext.Provider value={{ columns }}>
      {children}
    </TableContext.Provider>
  );
}

function Header({ children }) {
  const { columns, color } = useContext(TableContext);

  return (
    <header style={{ gridTemplateColumns: columns }} className="grid">
      {children}
    </header>
  );
}

function Body({ data, render }) {}

Table.Header = Header;

export default Table;
