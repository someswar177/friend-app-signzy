import React from "react";

const SearchBar = ({ search, handleSearchChange }) => {
  return (
    <input
      type="text"
      placeholder="Search for friends..."
      className="w-full p-3 rounded-md border border-gray-300 shadow-sm"
      defaultValue={search}
      onChange={(e) => handleSearchChange(e.target.value)}
    />
  );
};

export default SearchBar;