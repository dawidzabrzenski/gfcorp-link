function TableRow({ children, type }) {
  if (type === "bold")
    return (
      <span className="flex items-center justify-center gap-4 p-2 text-xs font-bold">
        {children}
      </span>
    );

  return (
    <span className="flex items-center justify-center gap-4 p-2 text-xs">
      {children}
    </span>
  );
}

export default TableRow;
