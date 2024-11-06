function SearchBar() {
  return (
    <input
      className="rounded-lg border border-stone-200 px-4 py-1.5 text-stone-800 outline-none transition-all duration-75 ease-in-out placeholder:text-stone-300 focus:border-2 focus:border-maincolor"
      type="search"
      placeholder="Search for a ticket"
    ></input>
  );
}

export default SearchBar;
