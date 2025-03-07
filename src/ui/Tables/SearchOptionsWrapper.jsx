function SearchOptionsWrapper({ children }) {
  return (
    <div className="mb-2 flex items-end gap-2 rounded-lg border border-dark-mainborder bg-dark-mainbg p-4">
      {children}
    </div>
  );
}

export default SearchOptionsWrapper;
