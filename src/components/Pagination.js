import React, { useEffect, useState } from "react";

const Pagination = ({
  totalProducts,
  activePage,
  productsPerPage,
  handlePagination,
}) => {
  const [pages, setPages] = useState([]);
  useEffect(() => {
    setPages(new Array(totalProducts / productsPerPage).fill(0));
  }, [totalProducts, productsPerPage]);

  return (
    <div className="container__Pagination">
      <p
        onClick={() =>
          activePage !== 1 ? handlePagination(activePage - 1) : {}
        }
        className={activePage === 1 ? "disabled" : ""}
      >
        {" "}
        &lt;
      </p>
      {pages.map((e, index) => {
        return (
          <p
            key={index}
            className={index + 1 === activePage ? "active" : ""}
            onClick={() => handlePagination(index + 1)}
          >
            {index + 1}
          </p>
        );
      })}
      <p
        onClick={() =>
          activePage !== pages.length ? handlePagination(activePage + 1) : {}
        }
        className={activePage === pages.length ? "disabled" : ""}
      >
        &gt;
      </p>
    </div>
  );
};

export default Pagination;
