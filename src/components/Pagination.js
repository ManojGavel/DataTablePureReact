import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 10; // Number of items to display per page
  const data = [...Array(100).keys()]; // Example array of data

  // Logic to get the current page's data
  const offset = currentPage * itemsPerPage;
  const currentPageData = data
    .filter((item) =>
      searchTerm ? item.toString().includes(searchTerm) : true
    )
    .slice(offset, offset + itemsPerPage);

  const renderData = currentPageData.map((item) => (
    <div key={item} className="data-row">
      {item}
    </div>
  ));

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const handleSearch = (event) => {
    setCurrentPage(0); // Reset current page to the first page
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="data-container">{renderData}</div>
      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={Math.ceil(
          data.filter((item) =>
            searchTerm ? item.toString().includes(searchTerm) : true
          ).length / itemsPerPage
        )}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        subContainerClassName={'pages pagination'}
        activeClassName={'active'}
      />
    </div>
  );
};

export default Pagination;
