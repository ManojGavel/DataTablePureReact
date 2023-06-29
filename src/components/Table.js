import React, { useState } from "react";
import styles from "./table.module.css";

const Table = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Default items per page
  const [filterName, setFilterName] = useState("");
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc"); // Default sort order

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset current page when changing items per page
  };

  const handleNameFilterChange = (event) => {
    setFilterName(event.target.value);
    setCurrentPage(1); // Reset current page when changing name filter
  };

  const handleSort = (field) => {
    if (sortField === field) {
      // If the same field is clicked, toggle the sort order
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // If a new field is clicked, set it as the sort field and reset the sort order to ascending
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(filterName.toLowerCase())
  );

  // Sort the filtered data based on the selected sort field and sort order
  const sortedData = filteredData.sort((a, b) => {
    const fieldA = a[sortField];
    const fieldB = b[sortField];

    if (fieldA && fieldB) {
      if (sortOrder === "asc") {
        return fieldA.localeCompare(fieldB);
      } else {
        return fieldB.localeCompare(fieldA);
      }
    }

    return 0;
  });

  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const maxVisiblePages = 5; // Maximum number of visible pages in the pagination

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const visiblePages = [];
    const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    for (let i = startPage; i <= endPage; i++) {
      visiblePages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={i === currentPage ? styles.active : ""}
        >
          {i}
        </button>
      );
    }

    return (
      <div className={styles.pagination}>
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
        {visiblePages}
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        {/* Items per page dropdown */}
        <div>
          <label htmlFor="itemsPerPage">Items per Page:</label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </div>

        {/* Name filter input */}
        <div>
          <label htmlFor="nameFilter">Filter by Name:</label>
          <input
            type="text"
            id="nameFilter"
            value={filterName}
            onChange={handleNameFilterChange}
          />
        </div>
      </div>

      {/* Table */}
      <table>
        {/* Render table header */}
        <thead>
          <tr>
            {/* Country Name column */}
            <th onClick={() => handleSort("name")}>
              Country Name
              {sortField === "name" && (
                <span className={styles.arrow}>
                  {/* Display arrow symbol based on sort order */}
                  {sortOrder === "asc" ? "▲" : "▼"}
                </span>
              )}
            </th>

            {/* Country Native Name column */}
            <th onClick={() => handleSort("nativeName")}>
              Country Native Name
              {sortField === "nativeName" && (
                <span className={styles.arrow}>
                  {/* Display arrow symbol based on sort order */}
                  {sortOrder === "asc" ? "▲" : "▼"}
                </span>
              )}
            </th>

            {/* Country Capital column */}
            <th onClick={() => handleSort("capital")}>
              Country Capital
              {sortField === "capital" && (
                <span className={styles.arrow}>
                  {/* Display arrow symbol based on sort order */}
                  {sortOrder === "asc" ? "▲" : "▼"}
                </span>
              )}
            </th>

            {/* Country Flag column */}
            <th>Country Flag</th>

            {/* Add more table columns as needed */}
          </tr>
        </thead>

        {/* Render table rows */}
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.nativeName}</td>
              <td>{item.capital}</td>
              <td>
                <img width={50} height={50} src={item.flag} alt="Flag" />
              </td>
              {/* Add more table columns as needed */}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className={styles.footer}>
        {/* Number of results and range */}
        <div className={styles.resultsInfo}>
          Showing {indexOfFirstItem + 1} -{" "}
          {Math.min(indexOfLastItem, filteredData.length)} of{" "}
          {filteredData.length} results
        </div>

        {/* Render pagination */}
        {renderPagination()}
      </div>
    </div>
  );
};

export default Table;
