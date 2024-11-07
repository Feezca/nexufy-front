import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { Pagination } from "react-bootstrap";
import { ThemeContext } from "../../themes/ThemeContext";

const CustomTable = ({ columns, data }) => {
  const { darkMode } = useContext(ThemeContext);
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container">
      <div className={`d-flex ${darkMode ? "bg-dark text-light" : "bg-light text-dark"} mb-2 py-2`}>
        {columns.map((col) => (
          <div key={col.header} className="col text-center text-secondary fw-medium">
            {col.header}
          </div>
        ))}
      </div>
      {paginatedData.map((item) => (
        <div key={item.id} className="d-flex border  my-1  fw-semibold py-3 rowTable">
          {columns.map((col) => (
            <div key={col.accessor} className="col text-center">
              {col.render(item)}
            </div>
          ))}
        </div>
      ))}
      <Pagination className="d-flex justify-content-center mt-3">
        <Pagination.First
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        />
        <Pagination.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {Array.from({ length: totalPages }, (_, index) => (
          <Pagination.Item
            key={index}
            active={currentPage === index + 1}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
        <Pagination.Last
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
        />
      </Pagination>
    </div>
  );
};

CustomTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
};

export default CustomTable;
