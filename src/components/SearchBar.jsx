import React from "react";

export default function SearchBar({ search, setSearch, onSearch }) {
  return (
    <div className="flex gap-2 w-full max-w-md">
      <input
        type="text"
        placeholder="Search here"
        className="flex-1 border rounded-lg px-3 py-2 
                   bg-white dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        onClick={onSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Search
      </button>
    </div>
  );
}
