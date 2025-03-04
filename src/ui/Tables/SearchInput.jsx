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
          className="outline-blue border-rounded w-fit cursor-pointer bg-dark-darkbg p-2 hover:border-dark-mainborderhover"
        />
        {value && (
          <button
            onClick={onClear}
            className="border-rounded h-fit cursor-pointer px-2 py-1 text-red-600 hover:border-dark-mainborderhover hover:text-red-500"
          >
            &#10005;
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchInput;
