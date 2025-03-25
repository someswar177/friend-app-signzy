import React from "react";

const SearchBar = ({ search, handleSearchChange }) => {
  return (
    <div className="w-full flex justify-center mb-6">
      <input
        type="text"
        placeholder="Search for friends..."
        className="w-full max-w-md p-3 rounded-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none"
        defaultValue={search}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default SearchBar;
