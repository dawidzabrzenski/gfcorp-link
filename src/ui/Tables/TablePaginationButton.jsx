function TablePaginationButton({ children, handleClick, handleDisabled }) {
  return (
    <button
      onClick={handleClick}
      disabled={handleDisabled}
      className="cursor-pointer rounded-lg border border-dark-mainborder px-4 py-1 transition-all duration-300 hover:border-dark-mainborderhover"
    >
      {children}
    </button>
  );
}

export default TablePaginationButton;
