import React from "react";
import { Search } from "lucide-react";

const SearchBar = ({ search, handleSearchChange }) => {
  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        placeholder="Search for friends..."
        className="w-full pl-10 p-3 rounded-md border border-gray-300 shadow-sm"
        defaultValue={search}
        onChange={(e) => handleSearchChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
