import React, { useState } from 'react';

const Table = ({ data, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <table>
        {/* Render table header */}
        <thead>
          <tr>
          <th>Name</th>
            <th>email</th>
            <th>Pn.No</th>
            <th>DOB</th>
            {/* Add more table columns as needed */}
          </tr>
        </thead>
        {/* Render table rows */}
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index}>
              <td>{item.firstName}</td>
              <td>{item.email}</td>
              <td>{item.contactNumber}</td>
              <td>{item.dob}</td>
              {/* Add more table columns as needed */}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Render pagination */}
      <div>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Table;