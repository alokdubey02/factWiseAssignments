import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="🔍 Search user"
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
}
