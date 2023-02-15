import React, { useState } from "react";

function SearchForm({
  searchCategory,
  searchTitle,
  setSearchTitle,
  setSearchCategory,
}) {
  const [selectedFilter, setSelectedFilter] = useState("Category");

  return (
    <form>
      <input
        style={{ margin: "10px" }}
        placeholder={`Search ${selectedFilter}`}
        name={selectedFilter === "Category" ? searchCategory : searchTitle}
        value={selectedFilter === "Category" ? searchCategory : searchTitle}
        onChange={(event) => {
          selectedFilter === "Category"
            ? setSearchCategory(event.target.value)
            : setSearchTitle(event.target.value);
        }}
      />
      <select
        style={{ margin: "10px" }}
        value={selectedFilter}
        onChange={(event) => {
          setSearchCategory("");
          setSearchTitle("");
          setSelectedFilter(event.target.value);
        }}
      >
        <option>Category</option>
        <option>Title</option>
      </select>
    </form>
  );
}

export default SearchForm;
