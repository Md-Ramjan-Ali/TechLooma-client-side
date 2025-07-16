import React from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

const Pagination = ({ page, setPage, totalPages }) => {
  if (totalPages <= 1) return null;

  const visiblePages = 4;
  let start = Math.max(1, page - 1);
  let end = Math.min(totalPages, start + visiblePages - 1);

  if (end - start < visiblePages - 1) {
    start = Math.max(1, end - visiblePages + 1);
  }

  const pages = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center items-center gap-2 mt-8 text-secondary-content">
      {/* Previous */}
      <button
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        type="button"
        disabled={page === 1}
        className={`btn flex ${
          page === 1
            ? "btn-disabled"
            : "btn-outline pl-0 hover:bg-primary hover:text-secondary-content"
        }`}
      >
        <GrFormPrevious size={24} />
        <span>Previous</span>
      </button>

      {/* Page Numbers */}
      {pages.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => setPage(p)}
          className={`btn btn-sm ${
            page === p ? "btn-primary text-secondary-content" : "bg-transparent outline-0 text-secondary-content"
          }`}
        >
          {p}
        </button>
      ))}

      {/* Next */}
      <button
        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        type="button"
        disabled={page === totalPages}
        className={`btn flex ${
          page === totalPages
            ? "btn-disabled"
            : "btn-outline pr-0 hover:bg-primary hover:text-secondary-content"
        }`}
      >
        <span>Next</span>
        <GrFormNext size={24} />
      </button>
    </div>
  );
};

export default Pagination;
