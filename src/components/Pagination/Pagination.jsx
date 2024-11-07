import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useMemo } from "react";
import "./Pagination.css";
const Pagination = ({ totalPages, currentPage, setPage }) => {
  const getPages = () => {
    const pages = [];
    const totalPaginationItem = 5;
    pages.push(1);
    if (totalPages > totalPaginationItem) {
      if (currentPage > 3) {
        pages.push("...");
      }
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(currentPage + 1, totalPages - 1);
        i++
      ) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) {
        pages.push("...");
      }
    } else {
      for (let i = 2; i < totalPages; i++) {
        pages.push(i);
      }
    }
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    return pages;
  };

  const pages = useMemo(getPages, [currentPage, totalPages]);

  const navigateToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="pagination">
      <button
        className={`pagination__button pagination__button--previous ${
          currentPage === 1 ? "pagination__button--disabled" : ""
        }`}
        onClick={() => navigateToPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <Icon icon="mingcute:left-line" />
      </button>
      <nav className="pagination__list" aria-label="Pagination">
        {pages?.map((page, index) => (
          <button
            key={index}
            className={`pagination__item ${
              page === currentPage ? "pagination__item--active" : ""
            } ${typeof page === "string" ? "pagination__item--ellipsis" : ""}`}
            onClick={() => typeof page === "number" && navigateToPage(page)}
            disabled={typeof page === "string"}
          >
            {page}
          </button>
        ))}
      </nav>
      <button
        className={`pagination__button pagination__button--next ${
          currentPage === totalPages ? "pagination__button--disabled" : ""
        }`}
        onClick={() => navigateToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <Icon icon="mingcute:right-line" />
      </button>
    </div>
  );
};

export default React.memo(Pagination);
