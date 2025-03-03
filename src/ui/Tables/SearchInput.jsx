import React from "react";

const SearchInput = ({ label, placeholder, value, onChange, onClear }) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xl font-semibold">{label}</p>
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="outline-blue mb-2 w-fit cursor-pointer rounded border border-dark-mainborder bg-dark-darkbg p-2 transition-all duration-300 hover:border-dark-mainborderhover"
        />
        {value && (
          <button
            onClick={onClear}
            className="h-fit cursor-pointer rounded-lg border border-dark-mainborder px-2 py-1 text-red-600 transition-all duration-300 hover:border-dark-mainborderhover hover:text-red-500"
          >
            &#10005;
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchInput;
