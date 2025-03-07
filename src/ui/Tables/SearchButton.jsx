function SearchButton({ children, handleClick }) {
  return (
    <button
      onClick={() => handleClick()}
      className="border-rounded mt-2 bg-dark-mainbg px-4 py-2 hover:border-dark-mainborderhover"
    >
      {children}
    </button>
  );
}

export default SearchButton;
