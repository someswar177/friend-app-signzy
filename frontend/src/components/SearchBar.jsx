import React from "react";

const SearchBar = ({ search, handleSearchChange }) => {
  return (
    <input
      type="text"
      placeholder="Search Users..."
      className="w-full p-2 border rounded-lg mb-4"
      defaultValue={search}
      onChange={handleSearchChange}
    />
  );
};

export default SearchBar;